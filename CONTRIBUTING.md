# Contributing to RelayWarden Node.js/TypeScript SDK

Thank you for your interest in contributing to the RelayWarden Node.js/TypeScript SDK! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm 9 or higher (or yarn)
- TypeScript knowledge
- Git

### Setting Up the Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/relaywarden-nodejs-sdk.git
   cd relaywarden-nodejs-sdk
   ```
3. Install dependencies:
   ```bash
   npm ci
   ```

## Development Workflow

### Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Ensure code follows project style guidelines
4. Write or update tests
5. Run linting:
   ```bash
   npm run lint
   ```
6. Format code:
   ```bash
   npm run format
   ```
7. Run tests:
   ```bash
   npm test
   ```
8. Build the project:
   ```bash
   npm run build
   ```
9. Commit your changes with clear, descriptive messages

### Coding Standards

- Follow TypeScript best practices
- Use strict type checking
- Add JSDoc comments for public APIs
- Keep functions focused and single-purpose
- Use async/await for asynchronous operations
- Follow the existing code style (enforced by ESLint and Prettier)

### TypeScript

- Use explicit types for function parameters and return values
- Avoid `any` types - use `unknown` or proper types instead
- Leverage TypeScript's type inference where appropriate
- Export types that users might need

### Testing

- Write tests for all new functionality
- Use Jest for unit and integration tests
- Ensure all tests pass before submitting
- Aim for high test coverage
- Test both success and error cases

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(messages): add support for message cancellation

Add the ability to cancel pending messages via the API.
This includes retry logic and proper error handling.
```

## Submitting Changes

1. Push your branch to your fork
2. Create a Pull Request targeting the `main` branch
3. Fill out the PR template completely
4. Ensure all CI checks pass
5. Address any review feedback

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] TypeScript compilation successful
- [ ] Linting passes
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] Commit messages follow Conventional Commits
- [ ] PR description is clear and complete

## Reporting Issues

When reporting bugs or requesting features:

1. Check existing issues to avoid duplicates
2. Use the appropriate issue template
3. Provide clear steps to reproduce (for bugs)
4. Include Node.js version, SDK version, and environment details
5. Add code examples when relevant

## Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for new public APIs
- Keep code examples up to date
- Update TypeScript type definitions documentation

## Questions?

- Open a discussion for questions
- Check existing issues and discussions
- Review the README for common usage patterns

Thank you for contributing! 🎉
