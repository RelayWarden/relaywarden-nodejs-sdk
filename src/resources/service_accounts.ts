/**
 * Service Accounts resource for managing service accounts and tokens.
 */

import { ApiResponse } from '../types';
import { Resource } from './resource';

export class ServiceAccounts extends Resource {
  /**
   * List all service accounts for the current team.
   */
  async list(filters?: Record<string, any>): Promise<ApiResponse> {
    return (await this.client.get('/service-accounts', filters)) as ApiResponse;
  }

  /**
   * Create a new service account.
   */
  async create(data: {
    name: string;
    description?: string;
    default_project_id?: string;
    abilities?: string[];
  }): Promise<ApiResponse> {
    return (await this.client.post('/service-accounts', data)) as ApiResponse;
  }

  /**
   * Delete a service account.
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(`/service-accounts/${id}`);
  }

  /**
   * Create a new API token for a service account.
   */
  async createToken(
    serviceAccountId: string,
    data: { name: string; abilities?: string[]; expires_at?: string }
  ): Promise<ApiResponse> {
    return (await this.client.post(
      `/service-accounts/${serviceAccountId}/tokens`,
      data
    )) as ApiResponse;
  }

  /**
   * Delete an API token.
   */
  async deleteToken(tokenId: string): Promise<void> {
    await this.client.delete(`/tokens/${tokenId}`);
  }
}
