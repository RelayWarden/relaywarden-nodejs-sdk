/**
 * Messages resource for sending and managing email messages.
 */

import { ApiResponse, SendMessageRequest } from '../types';
import { Resource } from './resource';

export class Messages extends Resource {
  /**
   * Send an email message.
   */
  async send(data: SendMessageRequest, idempotencyKey?: string): Promise<ApiResponse> {
    const headers: Record<string, string> = {};
    if (idempotencyKey) {
      headers['Idempotency-Key'] = idempotencyKey;
    }
    return (await this.client.post('/messages', data, headers)) as ApiResponse;
  }

  /**
   * List all messages for the current project.
   */
  async list(filters?: Record<string, any>): Promise<ApiResponse> {
    return (await this.client.get('/messages', filters)) as ApiResponse;
  }

  /**
   * Get a specific message by ID.
   */
  async get(id: string): Promise<ApiResponse> {
    return (await this.client.get(`/messages/${id}`)) as ApiResponse;
  }

  /**
   * Get the complete timeline of events for a message.
   */
  async getTimeline(id: string): Promise<ApiResponse> {
    return (await this.client.get(`/messages/${id}/timeline`)) as ApiResponse;
  }

  /**
   * Cancel a message that hasn't been sent yet.
   */
  async cancel(id: string): Promise<ApiResponse> {
    return (await this.client.post(`/messages/${id}/cancel`)) as ApiResponse;
  }

  /**
   * Resend a previously sent message.
   */
  async resend(id: string): Promise<ApiResponse> {
    return (await this.client.post(`/messages/${id}/resend`)) as ApiResponse;
  }
}
