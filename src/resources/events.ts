/**
 * Events resource for viewing event history.
 */

import { ApiResponse } from '../types';
import { Resource } from './resource';

export class Events extends Resource {
  /**
   * List all events for the current team.
   */
  async list(filters?: Record<string, any>): Promise<ApiResponse> {
    return (await this.client.get('/events', filters)) as ApiResponse;
  }

  /**
   * Get a specific event by ID.
   */
  async get(id: string): Promise<ApiResponse> {
    return (await this.client.get(`/events/${id}`)) as ApiResponse;
  }
}
