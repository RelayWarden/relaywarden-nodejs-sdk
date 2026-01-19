/**
 * RelayWarden Node.js/TypeScript SDK
 *
 * Official SDK for the RelayWarden API v1.
 */

export { Client } from './client';
export { ClientOptions } from './types';
export { APIError, AuthenticationError, RateLimitError, ValidationError } from './errors';
export type {
  ApiResponse,
  ErrorResponse,
  SendMessageRequest,
  CreateProjectRequest,
  CreateTemplateRequest,
  CreateDomainRequest,
  CreateSenderRequest,
  CreateWebhookEndpointRequest,
  CreateSuppressionRequest,
} from './types';
