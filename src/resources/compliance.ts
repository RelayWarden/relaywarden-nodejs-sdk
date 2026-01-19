/**
 * Compliance resource for managing data retention and compliance settings.
 */

import { ApiResponse } from '../types';
import { Resource } from './resource';

export class Compliance extends Resource {
  /**
   * Get data retention settings for the current team.
   */
  async getRetention(): Promise<ApiResponse> {
    return (await this.client.get('/compliance/retention')) as ApiResponse;
  }

  /**
   * Update data retention settings.
   */
  async updateRetention(data: {
    events_retention_days?: number;
    messages_retention_days?: number;
    webhook_deliveries_retention_days?: number;
  }): Promise<ApiResponse> {
    return (await this.client.patch('/compliance/retention', data)) as ApiResponse;
  }

  /**
   * Get available export formats and configuration.
   */
  async getExportConfig(): Promise<ApiResponse> {
    return (await this.client.get('/compliance/exports/config')) as ApiResponse;
  }
}
