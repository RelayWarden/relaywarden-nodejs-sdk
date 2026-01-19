/**
 * Webhooks resource for managing webhook endpoints.
 */

import { ApiResponse, CreateWebhookEndpointRequest } from '../types';
import { Resource } from './resource';

export class Webhooks extends Resource {
  /**
   * List all webhook endpoints for the current project.
   */
  async listEndpoints(filters?: Record<string, any>): Promise<ApiResponse> {
    return (await this.client.get('/webhooks/endpoints', filters)) as ApiResponse;
  }

  /**
   * Create a new webhook endpoint.
   */
  async createEndpoint(data: CreateWebhookEndpointRequest): Promise<ApiResponse> {
    return (await this.client.post('/webhooks/endpoints', data)) as ApiResponse;
  }

  /**
   * Update a webhook endpoint.
   */
  async updateEndpoint(
    id: string,
    data: Partial<CreateWebhookEndpointRequest>
  ): Promise<ApiResponse> {
    return (await this.client.patch(`/webhooks/endpoints/${id}`, data)) as ApiResponse;
  }

  /**
   * Delete a webhook endpoint.
   */
  async deleteEndpoint(id: string): Promise<void> {
    await this.client.delete(`/webhooks/endpoints/${id}`);
  }

  /**
   * List all delivery attempts for a webhook endpoint.
   */
  async listDeliveries(endpointId: string, filters?: Record<string, any>): Promise<ApiResponse> {
    return (await this.client.get(
      `/webhooks/endpoints/${endpointId}/deliveries`,
      filters
    )) as ApiResponse;
  }

  /**
   * Send a test webhook to verify the endpoint is working.
   */
  async testEndpoint(id: string): Promise<ApiResponse> {
    return (await this.client.post(`/webhooks/endpoints/${id}/test`)) as ApiResponse;
  }

  /**
   * Replay a failed webhook delivery.
   */
  async replayDelivery(deliveryId: string): Promise<ApiResponse> {
    return (await this.client.post(`/webhooks/deliveries/${deliveryId}/replay`)) as ApiResponse;
  }
}
