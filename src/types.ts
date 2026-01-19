/**
 * Type definitions for the RelayWarden SDK.
 */

export interface ClientOptions {
  maxRetries?: number;
  timeout?: number;
}

export interface ApiResponse<T = any> {
  data: T;
  meta: {
    request_id: string;
    timestamp: string;
    current_page?: number;
    per_page?: number;
    total?: number;
    last_page?: number;
  };
  links?: {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
  };
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
  meta: {
    request_id: string;
    timestamp: string;
  };
}

export interface SendMessageRequest {
  from: {
    email: string;
    name?: string;
  };
  to: Array<{
    email: string;
    name?: string;
  }>;
  template?: {
    id: string;
  };
  subject?: string;
  html?: string;
  text?: string;
  data?: Record<string, any>;
}

export interface CreateProjectRequest {
  name: string;
  environment?: 'staging' | 'production';
}

export interface CreateTemplateRequest {
  name: string;
  subject: string;
  html_body?: string;
  text_body?: string;
}

export interface CreateDomainRequest {
  domain: string;
}

export interface CreateSenderRequest {
  email: string;
  name?: string;
  sending_domain_id?: string;
}

export interface CreateWebhookEndpointRequest {
  url: string;
  events: string[];
  secret?: string;
}

export interface CreateSuppressionRequest {
  email: string;
  reason: 'manual' | 'complaint' | 'hard_bounce';
}
