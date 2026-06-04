# Contributing to CMS MERN Dashboard

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Development Setup](#development-setup)
- [Branching Strategy](#branching-strategy)
- [Pull Request Process](#pull-request-process)
- [Code Standards](#code-standards)
- [Commit Messages](#commit-messages)
- [Reporting Issues](#reporting-issues)

## Development Setup

1. **Fork and clone** the repository
2. **Install PM2 globally**: `npm install -g pm2`
3. **Install dependencies**:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
4. **Set up environment files**:
   - Server: Create `.env` with `MONGO_URL`, `MONGO_PORT`, `ALLOWED_ORIGINS`, `API_KEY`
   - Client: Create `.env` with `REACT_APP_MONGODB_BASE_URL`, `REACT_APP_API_KEY`
5. **Start development**: `npm run dev` from root

## Branching Strategy

- **main**: Production-ready code (protected branch)
- **feature/***: New features
- **bugfix/***: Bug fixes
- **hotfix/***: Critical production fixes

**Important**: Never commit directly to `main`. All changes must go through a Pull Request.

## Pull Request Process

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code standards below

3. **Run validations** before submitting:
   ```bash
   npm run check
   ```
   This runs lint, test, and build for both client and server.

4. **Push your branch** and create a Pull Request on GitHub

5. **PR Requirements**:
   - Title should be descriptive
   - Include a description of changes
   - Reference any related issues
   - Ensure CI checks pass

6. **Review Process**:
   - PRs require review before merging
   - Address any feedback from reviewers
   - Use Squash or Rebase merge (linear history required)

## Code Standards

### General Guidelines
- Follow existing code style and patterns
- Make minimal changes to achieve the goal
- Keep code simple and maintainable
- Add comments for complex logic

### JavaScript/React (Client)
- Use functional components with hooks
- Follow Material UI patterns
- Use Redux Toolkit for state management
- Run `npm run check` before committing

### Node.js (Server)
- Use async/await for async operations
- Follow existing controller patterns
- Validate all inputs
- Handle errors appropriately

### Environment Variables
- Never commit `.env` files
- Never commit secrets, API keys, or connection strings
- Use `.env.example` for documentation

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add new dashboard widget
fix: resolve login timeout issue
docs: update API documentation
refactor: simplify data fetching logic
test: add unit tests for user controller
```

## Reporting Issues

When reporting bugs or requesting features:

1. **Search existing issues** first
2. **Use the appropriate issue template**
3. **Provide details**:
   - Clear description of the problem
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Screenshots if applicable

## Questions?

If you have questions about contributing, feel free to:
- Open a discussion on GitHub
- Comment on an existing issue
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
