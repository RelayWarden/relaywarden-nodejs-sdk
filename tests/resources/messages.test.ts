/**
 * Tests for Messages resource.
 */

import axios from 'axios';
import { Client } from '../../src/client';
import { Messages } from '../../src/resources/messages';

jest.mock('axios');

describe('Messages', () => {
  let client: Client;
  let messages: Messages;

  beforeEach(() => {
    client = new Client('https://api.relaywarden.eu/api/v1', 'test-token');
    client.setProjectId('project-123');
    messages = client.messages;
    jest.clearAllMocks();
  });

  it('should send a message', async () => {
    const mockAxiosInstance = {
      request: jest.fn().mockResolvedValue({
        status: 202,
        data: {
          data: {
            message_id: 'msg-123',
            status: 'accepted',
          },
          meta: {
            request_id: 'req-123',
          },
        },
      }),
    };

    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    const testClient = new Client('https://api.relaywarden.eu/api/v1', 'test-token');
    testClient.setProjectId('project-123');
    const testMessages = testClient.messages;

    const result = await testMessages.send({
      from: { email: 'noreply@example.com' },
      to: [{ email: 'user@example.com' }],
      subject: 'Test',
      html: '<h1>Test</h1>',
    });

    expect(result.data.message_id).toBe('msg-123');
  });

  it('should list messages', async () => {
    const mockAxiosInstance = {
      request: jest.fn().mockResolvedValue({
        status: 200,
        data: {
          data: [{ id: 'msg-1', subject: 'Test 1' }],
          meta: {
            current_page: 1,
            per_page: 25,
            total: 1,
          },
        },
      }),
    };

    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    const testClient = new Client('https://api.relaywarden.eu/api/v1', 'test-token');
    testClient.setProjectId('project-123');
    const testMessages = testClient.messages;

    const result = await testMessages.list();
    expect(result.data).toHaveLength(1);
  });
});
