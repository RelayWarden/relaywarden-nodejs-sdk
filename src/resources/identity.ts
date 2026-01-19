/**
 * Identity resource for user/team information.
 */

import { ApiResponse } from '../types';
import { Resource } from './resource';

export class Identity extends Resource {
  /**
   * Get information about the currently authenticated user or service account.
   */
  async me(): Promise<ApiResponse> {
    return (await this.client.get('/me')) as ApiResponse;
  }

  /**
   * List all teams the authenticated user belongs to.
   */
  async teams(): Promise<ApiResponse> {
    return (await this.client.get('/teams')) as ApiResponse;
  }
}
