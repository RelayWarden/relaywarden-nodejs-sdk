/**
 * Senders resource for managing sender addresses.
 */

import { ApiResponse, CreateSenderRequest } from '../types';
import { Resource } from './resource';

export class Senders extends Resource {
  /**
   * List all sender addresses for the current project.
   */
  async list(filters?: Record<string, any>): Promise<ApiResponse> {
    return (await this.client.get('/senders', filters)) as ApiResponse;
  }

  /**
   * Get a specific sender by ID.
   */
  async get(id: string): Promise<ApiResponse> {
    return (await this.client.get(`/senders/${id}`)) as ApiResponse;
  }

  /**
   * Create a new sender address.
   */
  async create(data: CreateSenderRequest): Promise<ApiResponse> {
    return (await this.client.post('/senders', data)) as ApiResponse;
  }

  /**
   * Delete a sender address.
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(`/senders/${id}`);
  }

  /**
   * Initiate sender verification.
   */
  async verify(id: string): Promise<ApiResponse> {
    return (await this.client.post(`/senders/${id}/verify`)) as ApiResponse;
  }
}
