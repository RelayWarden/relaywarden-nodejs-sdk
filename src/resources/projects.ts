/**
 * Projects resource for managing projects.
 */

import { ApiResponse, CreateProjectRequest } from '../types';
import { Resource } from './resource';

export class Projects extends Resource {
  /**
   * List all projects for the current team.
   */
  async list(filters?: Record<string, any>): Promise<ApiResponse> {
    return (await this.client.get('/projects', filters)) as ApiResponse;
  }

  /**
   * Get a specific project by ID.
   */
  async get(id: string): Promise<ApiResponse> {
    return (await this.client.get(`/projects/${id}`)) as ApiResponse;
  }

  /**
   * Create a new project.
   */
  async create(data: CreateProjectRequest): Promise<ApiResponse> {
    return (await this.client.post('/projects', data)) as ApiResponse;
  }

  /**
   * Update a project.
   */
  async update(id: string, data: Partial<CreateProjectRequest>): Promise<ApiResponse> {
    return (await this.client.patch(`/projects/${id}`, data)) as ApiResponse;
  }

  /**
   * Delete a project.
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(`/projects/${id}`);
  }
}
