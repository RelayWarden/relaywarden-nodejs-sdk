/**
 * Base resource class.
 */

import { Client } from '../client';

export abstract class Resource {
  protected client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}
