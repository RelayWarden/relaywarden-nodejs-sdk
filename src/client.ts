/**
 * Main client for interacting with the RelayWarden API.
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIError, AuthenticationError, RateLimitError, ValidationError } from './errors';
import { ApiResponse, ClientOptions, ErrorResponse } from './types';
import { AuditLogs } from './resources/audit_logs';
import { Compliance } from './resources/compliance';
import { Domains } from './resources/domains';
import { Events } from './resources/events';
import { Identity } from './resources/identity';
import { Messages } from './resources/messages';
import { Projects } from './resources/projects';
import { Senders } from './resources/senders';
import { ServiceAccounts } from './resources/service_accounts';
import { Suppressions } from './resources/suppressions';
import { Templates } from './resources/templates';
import { Usage } from './resources/usage';
import { Webhooks } from './resources/webhooks';

export class Client {
  private baseUrl: string;
  private token: string;
  private httpClient: AxiosInstance;
  private projectId?: string;
  private teamId?: string;
  private maxRetries: number;
  private timeout: number;

  // Resources
  public readonly identity: Identity;
  public readonly projects: Projects;
  public readonly serviceAccounts: ServiceAccounts;
  public readonly domains: Domains;
  public readonly senders: Senders;
  public readonly templates: Templates;
  public readonly messages: Messages;
  public readonly events: Events;
  public readonly webhooks: Webhooks;
  public readonly suppressions: Suppressions;
  public readonly usage: Usage;
  public readonly auditLogs: AuditLogs;
  public readonly compliance: Compliance;

  constructor(baseUrl: string, token: string, options: ClientOptions = {}) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.token = token;
    this.maxRetries = options.maxRetries ?? 3;
    this.timeout = options.timeout ?? 30000;

    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Initialize resources
    this.identity = new Identity(this);
    this.projects = new Projects(this);
    this.serviceAccounts = new ServiceAccounts(this);
    this.domains = new Domains(this);
    this.senders = new Senders(this);
    this.templates = new Templates(this);
    this.messages = new Messages(this);
    this.events = new Events(this);
    this.webhooks = new Webhooks(this);
    this.suppressions = new Suppressions(this);
    this.usage = new Usage(this);
    this.auditLogs = new AuditLogs(this);
    this.compliance = new Compliance(this);
  }

  public setProjectId(projectId?: string): void {
    this.projectId = projectId;
  }

  public getProjectId(): string | undefined {
    return this.projectId;
  }

  public setTeamId(teamId?: string): void {
    this.teamId = teamId;
  }

  public getTeamId(): string | undefined {
    return this.teamId;
  }

  private getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    if (this.projectId) {
      headers['X-Project-Id'] = this.projectId;
    }
    if (this.teamId) {
      headers['X-Team-Id'] = this.teamId;
    }
    return headers;
  }

  public async request<T = any>(
    method: string,
    path: string,
    data?: any,
    headers?: Record<string, string>,
    params?: Record<string, any>
  ): Promise<T | null> {
    const config: AxiosRequestConfig = {
      method,
      url: path,
      headers: { ...this.getDefaultHeaders(), ...headers },
      params,
    };

    if (data && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
      config.data = data;
    }

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const response: AxiosResponse<T> = await this.httpClient.request(config);

        if (response.status === 204) {
          return null;
        }

        if (response.status >= 200 && response.status < 300) {
          return response.data;
        }

        // Handle errors
        const errorData = response.data as unknown as ErrorResponse;
        const apiError = this.handleErrorResponse(response, errorData);

        // Retry on rate limit
        if (apiError instanceof RateLimitError && attempt < this.maxRetries) {
          await this.sleep(apiError.retryAfter * 1000);
          lastError = apiError;
          continue;
        }

        throw apiError;
      } catch (error: any) {
        // Check if error has a response (axios error or mock with response)
        if (error?.response) {
          const errorData = error.response.data as ErrorResponse;
          const apiError = this.handleErrorResponse(error.response, errorData);
          if (apiError instanceof RateLimitError && attempt < this.maxRetries) {
            await this.sleep(apiError.retryAfter * 1000);
            lastError = apiError;
            continue;
          }
          throw apiError;
        }

        if (this.isRetryableError(error) && attempt < this.maxRetries) {
          await this.sleep(100 * (attempt + 1)); // Exponential backoff
          lastError = error;
          continue;
        }

        throw new APIError(`Request failed: ${error?.message || 'Unknown error'}`, 0);
      }
    }

    if (lastError) {
      throw lastError;
    }

    throw new APIError(`Request failed after ${this.maxRetries} retries`);
  }

  private handleErrorResponse(response: AxiosResponse, errorData?: ErrorResponse): APIError {
    const statusCode = response.status;
    const requestId = errorData?.meta?.request_id || '';
    const errorCode = errorData?.error?.code || '';
    const message = errorData?.error?.message || 'An error occurred';
    const details = errorData?.error?.details || [];

    if (statusCode === 401) {
      return new AuthenticationError(message, statusCode, requestId);
    } else if (statusCode === 422) {
      return new ValidationError(message, details, requestId, statusCode);
    } else if (statusCode === 429) {
      const retryAfter = parseInt(response.headers['retry-after'] || '60', 10);
      return new RateLimitError(message, statusCode, requestId, retryAfter);
    } else {
      return new APIError(message, statusCode, errorCode, requestId, details);
    }
  }

  private isRetryableError(error: any): boolean {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
        return true;
      }
      if (error.response && error.response.status >= 500) {
        return true;
      }
    }
    return false;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async get<T = any>(path: string, params?: Record<string, any>): Promise<T | null> {
    return this.request<T>('GET', path, undefined, undefined, params);
  }

  public async post<T = any>(
    path: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T | null> {
    return this.request<T>('POST', path, data, headers);
  }

  public async patch<T = any>(path: string, data?: any): Promise<T | null> {
    return this.request<T>('PATCH', path, data);
  }

  public async delete(path: string): Promise<void> {
    await this.request('DELETE', path);
  }
}
