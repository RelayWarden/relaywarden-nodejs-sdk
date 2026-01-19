/**
 * Templates resource for managing email templates.
 */

import { ApiResponse, CreateTemplateRequest } from '../types';
import { Resource } from './resource';

export class Templates extends Resource {
  /**
   * List all templates for the current project.
   */
  async list(filters?: Record<string, any>): Promise<ApiResponse> {
    return (await this.client.get('/templates', filters)) as ApiResponse;
  }

  /**
   * Get a specific template by ID.
   */
  async get(id: string): Promise<ApiResponse> {
    return (await this.client.get(`/templates/${id}`)) as ApiResponse;
  }

  /**
   * Create a new template.
   */
  async create(data: CreateTemplateRequest): Promise<ApiResponse> {
    return (await this.client.post('/templates', data)) as ApiResponse;
  }

  /**
   * Update a template.
   */
  async update(id: string, data: Partial<CreateTemplateRequest>): Promise<ApiResponse> {
    return (await this.client.patch(`/templates/${id}`, data)) as ApiResponse;
  }

  /**
   * Delete a template.
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(`/templates/${id}`);
  }

  /**
   * List all versions of a template.
   */
  async listVersions(id: string, filters?: Record<string, any>): Promise<ApiResponse> {
    return (await this.client.get(`/templates/${id}/versions`, filters)) as ApiResponse;
  }

  /**
   * Create a new version of a template.
   */
  async createVersion(id: string, data: Partial<CreateTemplateRequest>): Promise<ApiResponse> {
    return (await this.client.post(`/templates/${id}/versions`, data)) as ApiResponse;
  }

  /**
   * Render a template with provided data.
   */
  async render(id: string, data: { data: Record<string, any> }): Promise<ApiResponse> {
    return (await this.client.post(`/templates/${id}/render`, data)) as ApiResponse;
  }

  /**
   * Send a test email using the template.
   */
  async testSend(
    id: string,
    data: { to: string; data?: Record<string, any> }
  ): Promise<ApiResponse> {
    return (await this.client.post(`/templates/${id}/test-send`, data)) as ApiResponse;
  }
}
