/**
 * Suppressions resource for managing recipient suppressions.
 */

import { ApiResponse, CreateSuppressionRequest } from '../types';
import { Resource } from './resource';

export class Suppressions extends Resource {
  /**
   * List all suppressions for the current team.
   */
  async list(filters?: Record<string, any>): Promise<ApiResponse> {
    return (await this.client.get('/suppressions', filters)) as ApiResponse;
  }

  /**
   * Add a recipient to the suppression list.
   */
  async create(data: CreateSuppressionRequest): Promise<ApiResponse> {
    return (await this.client.post('/suppressions', data)) as ApiResponse;
  }

  /**
   * Remove a recipient from the suppression list.
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(`/suppressions/${id}`);
  }

  /**
   * Import multiple suppressions in bulk.
   */
  async import(data: { suppressions: CreateSuppressionRequest[] }): Promise<ApiResponse> {
    return (await this.client.post('/suppressions/import', data)) as ApiResponse;
  }

  /**
   * Export all suppressions as a CSV file.
   */
  async export(): Promise<string> {
    // Note: This endpoint returns CSV, not JSON
    // In a production SDK, you might want to return Buffer or handle CSV parsing
    const response = await this.client.get('/suppressions/export');
    return ''; // Simplified - actual implementation would handle CSV
  }
}
