# RelayWarden Node.js/TypeScript SDK

Official Node.js/TypeScript SDK for the RelayWarden API v1.

## Installation

```bash
npm install @relaywarden/sdk
```

Or with yarn:

```bash
yarn add @relaywarden/sdk
```

## Quick Start

```typescript
import { Client } from '@relaywarden/sdk';

// Initialize the client
const client = new Client({
  baseUrl: 'https://api.relaywarden.eu/api/v1',
  token: 'your-api-token',
  projectId: 'your-project-id'
});

// Send a message
const message = await client.messages.send({
  from: {
    email: 'noreply@example.com',
    name: 'Acme Corp'
  },
  to: [
    { email: 'user@example.com' }
  ],
  subject: 'Welcome!',
  html: '<h1>Welcome!</h1>',
  text: 'Welcome!'
}, 'unique-idempotency-key');

console.log(`Message ID: ${message.data.message_id}`);
```

## Authentication

The SDK uses Bearer token authentication. Pass your API token when creating the client:

```typescript
const client = new Client({
  baseUrl: 'https://api.relaywarden.eu/api/v1',
  token: 'your-api-token'
});
```

## Resources

### Identity

```typescript
// Get current user/service account info
const me = await client.identity.me();

// List teams
const teams = await client.identity.teams();
```

### Projects

```typescript
// List projects
const projects = await client.projects.list({ environment: 'production' });

// Create project
const project = await client.projects.create({
  name: 'Production',
  environment: 'production'
});

// Get project
const project = await client.projects.get('project-id');

// Update project
const project = await client.projects.update('project-id', {
  name: 'Updated Name'
});

// Delete project
await client.projects.delete('project-id');
```

### Messages

```typescript
// Send message with idempotency key
const message = await client.messages.send({
  from: { email: 'noreply@example.com' },
  to: [{ email: 'user@example.com' }],
  subject: 'Hello',
  html: '<h1>Hello</h1>'
}, 'unique-idempotency-key');

// List messages
const messages = await client.messages.list({
  status: 'delivered',
  per_page: 25
});

// Get message
const message = await client.messages.get('message-id');

// Get message timeline
const timeline = await client.messages.getTimeline('message-id');

// Cancel message
await client.messages.cancel('message-id');

// Resend message
await client.messages.resend('message-id');
```

### Templates

```typescript
// Create template
const template = await client.templates.create({
  name: 'Welcome Email',
  subject: 'Welcome {{ $name }}!',
  html_body: '<h1>Welcome {{ $name }}!</h1>',
  text_body: 'Welcome {{ $name }}!'
});

// Render template
const rendered = await client.templates.render('template-id', {
  data: { name: 'John' }
});

// Test send
await client.templates.testSend('template-id', {
  to: 'test@example.com',
  data: { name: 'John' }
});
```

### Domains

```typescript
// Create domain
const domain = await client.domains.create({
  domain: 'mail.example.com'
});

// Verify domain
const result = await client.domains.verify('domain-id');

// Get DNS records
const records = await client.domains.getDnsRecords('domain-id');

// Rotate DKIM keys
await client.domains.rotateDkim('domain-id');
```

## Error Handling

The SDK throws specific exception types for different error scenarios:

```typescript
import {
  AuthenticationError,
  RateLimitError,
  ValidationError,
  APIError
} from '@relaywarden/sdk';

try {
  const message = await client.messages.send({...});
} catch (error) {
  if (error instanceof AuthenticationError) {
    // 401 - Invalid or missing token
    console.error(`Authentication failed: ${error.message}`);
  } else if (error instanceof ValidationError) {
    // 422 - Validation errors
    console.error(`Validation failed: ${error.message}`);
    error.details.forEach(detail => {
      console.error(`  ${detail.field}: ${detail.message}`);
    });
  } else if (error instanceof RateLimitError) {
    // 429 - Rate limit exceeded
    console.error(`Rate limit exceeded. Retry after: ${error.retryAfter} seconds`);
  } else if (error instanceof APIError) {
    // Other API errors
    console.error(`API Error: ${error.message} [Request ID: ${error.requestId}]`);
  }
}
```

## Pagination

List endpoints return paginated responses:

```typescript
const response = await client.messages.list();

// Access pagination metadata
const currentPage = response.meta.current_page;
const total = response.meta.total;
const lastPage = response.meta.last_page;

// Access data
const messages = response.data;
```

## Rate Limiting

The SDK automatically handles rate limits with exponential backoff. Rate limit information is available in the error:

```typescript
try {
  await client.messages.send({...});
} catch (error) {
  if (error instanceof RateLimitError) {
    const retryAfter = error.retryAfter; // Seconds to wait
    // SDK will automatically retry, but you can also handle manually
  }
}
```

## Configuration

```typescript
const client = new Client({
  baseUrl: 'https://api.relaywarden.eu/api/v1',
  token: 'your-token',
  maxRetries: 3,
  timeout: 30000
});
```

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions:

```typescript
import { Client, SendMessageRequest, ApiResponse } from '@relaywarden/sdk';

const client = new Client({
  baseUrl: 'https://api.relaywarden.eu/api/v1',
  token: 'your-token'
});

const messageData: SendMessageRequest = {
  from: { email: 'noreply@example.com' },
  to: [{ email: 'user@example.com' }],
  subject: 'Hello',
  html: '<h1>Hello</h1>'
};

const response: ApiResponse = await client.messages.send(messageData);
```

## Testing

```bash
npm test
npm run test:coverage
```

## License

MIT
