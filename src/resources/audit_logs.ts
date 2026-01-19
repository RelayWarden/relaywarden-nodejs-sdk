/**
 * Audit Logs resource for viewing audit history.
 */

import { ApiResponse } from '../types';
import { Resource } from './resource';

export class AuditLogs extends Resource {
  /**
   * List audit logs for the current team.
   */
  async list(filters?: Record<string, any>): Promise<ApiResponse> {
    return (await this.client.get('/audit-logs', filters)) as ApiResponse;
  }

  /**
   * Get a specific audit log entry by ID.
   */
  async get(id: string): Promise<ApiResponse> {
    return (await this.client.get(`/audit-logs/${id}`)) as ApiResponse;
  }
}
