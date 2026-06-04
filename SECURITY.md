# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

### How to Report

**Please DO NOT open a public GitHub issue** for security vulnerabilities.

Instead, please report security vulnerabilities via:

- GitHub Security Advisories (if enabled for this repository)

### What to Include

When reporting a vulnerability, please include:

- **Description**: Clear description of the vulnerability
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Impact**: Assessment of potential impact
- **Suggested fix**: If you have one (optional)
- **Your contact**: How to reach you for follow-up questions

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 1 week
- **Fix timeline**: Depends on severity and complexity
- **Public disclosure**: Coordinated with reporter after fix is released

## Security Best Practices

### For Contributors

- Never commit secrets, API keys, or credentials
- Keep dependencies up to date
- Follow secure coding practices
- Run `npm audit` regularly

### For Users

- Keep your environment variables secure
- Use strong API keys
- Regularly update dependencies
- Monitor for security advisories

## Known Security Considerations

See [docs/SECURITY_BLOCKERS.md](./docs/SECURITY_BLOCKERS.md) for documented security debt and modernization roadmap.

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1) and announced in:
- GitHub Releases
- Security Advisories (when applicable)

## Acknowledgments

We appreciate responsible disclosure and will acknowledge reporters who help improve the security of this project.
