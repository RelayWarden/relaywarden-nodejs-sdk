/**
 * Usage resource for viewing usage statistics and limits.
 */

import { ApiResponse } from '../types';
import { Resource } from './resource';

export class Usage extends Resource {
  /**
   * Get daily usage statistics for the current team.
   */
  async getDaily(filters?: Record<string, any>): Promise<ApiResponse> {
    return (await this.client.get('/usage/daily', filters)) as ApiResponse;
  }

  /**
   * Get current usage limits and remaining quota.
   */
  async getLimits(): Promise<ApiResponse> {
    return (await this.client.get('/limits')) as ApiResponse;
  }

  /**
   * Get system health and diagnostic information.
   */
  async getDiagnostics(): Promise<ApiResponse> {
    return (await this.client.get('/diagnostics')) as ApiResponse;
  }
}
