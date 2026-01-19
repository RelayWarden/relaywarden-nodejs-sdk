/**
 * Tests for the RelayWarden client.
 */

import axios from 'axios';
import { Client } from '../src/client';
import {
  AuthenticationError,
  RateLimitError,
  ValidationError,
} from '../src/errors';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Client', () => {
  let client: Client;

  beforeEach(() => {
    client = new Client('https://api.relaywarden.eu/api/v1', 'test-token');
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should initialize with base URL and token', () => {
      expect(client).toBeInstanceOf(Client);
    });

    it('should set project ID', () => {
      client.setProjectId('project-123');
      expect(client.getProjectId()).toBe('project-123');
    });

    it('should set team ID', () => {
      client.setTeamId('team-123');
      expect(client.getTeamId()).toBe('team-123');
    });
  });

  describe('resource accessors', () => {
    it('should provide identity resource', () => {
      expect(client.identity).toBeDefined();
    });

    it('should provide projects resource', () => {
      expect(client.projects).toBeDefined();
    });

    it('should provide messages resource', () => {
      expect(client.messages).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should throw AuthenticationError on 401', async () => {
      const mockAxiosInstance = {
        request: jest.fn().mockRejectedValue({
          response: {
            status: 401,
            data: {
              error: {
                code: 'unauthorized',
                message: 'Unauthenticated',
              },
              meta: {
                request_id: 'req-123',
              },
            },
            headers: {},
          },
          isAxiosError: true,
        }),
      };

      (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

      const testClient = new Client('https://api.relaywarden.eu/api/v1', 'test-token');
      await expect(testClient.get('/test')).rejects.toThrow(AuthenticationError);
    });

    it('should throw ValidationError on 422', async () => {
      const mockAxiosInstance = {
        request: jest.fn().mockRejectedValue({
          response: {
            status: 422,
            data: {
              error: {
                code: 'validation_error',
                message: 'Validation failed',
                details: [{ field: 'email', message: 'Invalid email' }],
              },
              meta: {
                request_id: 'req-123',
              },
            },
            headers: {},
          },
          isAxiosError: true,
        }),
      };

      (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

      const testClient = new Client('https://api.relaywarden.eu/api/v1', 'test-token');
      await expect(testClient.post('/test', {})).rejects.toThrow(ValidationError);
    });

    it('should throw RateLimitError on 429', async () => {
      const mockAxiosInstance = {
        request: jest.fn().mockRejectedValue({
          response: {
            status: 429,
            data: {
              error: {
                code: 'rate_limit_exceeded',
                message: 'Rate limit exceeded',
              },
              meta: {
                request_id: 'req-123',
              },
            },
            headers: {
              'retry-after': '60',
            },
          },
          isAxiosError: true,
        }),
      };

      (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

      // Create client with maxRetries = 0 to prevent retry logic from waiting
      const testClient = new Client('https://api.relaywarden.eu/api/v1', 'test-token', {
        maxRetries: 0,
      });
      await expect(testClient.get('/test')).rejects.toThrow(RateLimitError);
    }, 10000); // Increase timeout to 10 seconds
  });
});
