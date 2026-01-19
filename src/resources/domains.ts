/**
 * Domains resource for managing sending domains.
 */

import { ApiResponse, CreateDomainRequest } from '../types';
import { Resource } from './resource';

export class Domains extends Resource {
  /**
   * List all sending domains for the current project.
   */
  async list(filters?: Record<string, any>): Promise<ApiResponse> {
    return (await this.client.get('/domains', filters)) as ApiResponse;
  }

  /**
   * Get a specific domain by ID.
   */
  async get(id: string): Promise<ApiResponse> {
    return (await this.client.get(`/domains/${id}`)) as ApiResponse;
  }

  /**
   * Create a new sending domain.
   */
  async create(data: CreateDomainRequest): Promise<ApiResponse> {
    return (await this.client.post('/domains', data)) as ApiResponse;
  }

  /**
   * Update a domain.
   */
  async update(id: string, data: Partial<CreateDomainRequest>): Promise<ApiResponse> {
    return (await this.client.patch(`/domains/${id}`, data)) as ApiResponse;
  }

  /**
   * Delete a domain.
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(`/domains/${id}`);
  }

  /**
   * Get DNS records required for domain verification.
   */
  async getDnsRecords(id: string): Promise<ApiResponse> {
    return (await this.client.get(`/domains/${id}/dns-records`)) as ApiResponse;
  }

  /**
   * Get current status of domain verification checks.
   */
  async getChecks(id: string): Promise<ApiResponse> {
    return (await this.client.get(`/domains/${id}/checks`)) as ApiResponse;
  }

  /**
   * Initiate domain verification.
   */
  async verify(id: string): Promise<ApiResponse> {
    return (await this.client.post(`/domains/${id}/verify`)) as ApiResponse;
  }

  /**
   * Rotate DKIM signing keys for a domain.
   */
  async rotateDkim(id: string): Promise<ApiResponse> {
    return (await this.client.post(`/domains/${id}/dkim/rotate`)) as ApiResponse;
  }

  /**
   * Enable a domain for production use.
   */
  async enableProduction(id: string): Promise<ApiResponse> {
    return (await this.client.post(`/domains/${id}/enable-production`)) as ApiResponse;
  }
}
