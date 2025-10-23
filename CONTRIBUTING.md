# Contributing to Facebook Ads Target Audience Finder

Thank you for your interest in contributing to the Facebook Ads Target Audience Finder! We welcome contributions from the community and are grateful for your support.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [hello@tisankan.dev](mailto:hello@tisankan.dev).

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment
4. Create a new branch for your feature or bug fix
5. Make your changes
6. Test your changes
7. Submit a pull request

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment details (OS, browser, Node.js version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- A clear and descriptive title
- A detailed description of the proposed enhancement
- Explain why this enhancement would be useful
- List any alternatives you've considered

### Code Contributions

1. **Fork and Clone**: Fork the repo and clone it locally
2. **Branch**: Create a new branch from `main` for your feature
3. **Code**: Write your code following our style guidelines
4. **Test**: Ensure all tests pass and add new tests if needed
5. **Commit**: Make clear, concise commit messages
6. **Push**: Push your branch to your fork
7. **PR**: Open a pull request with a clear description

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/facebook-ads-audience-finder.git
cd facebook-ads-audience-finder

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## Pull Request Process

1. **Update Documentation**: Update the README.md with details of changes if applicable
2. **Add Tests**: Include tests for new functionality
3. **Follow Style Guide**: Ensure your code follows our coding standards
4. **Clear Description**: Provide a clear description of what your PR does
5. **Link Issues**: Reference any related issues in your PR description
6. **Review Process**: Be responsive to feedback during the review process

### PR Title Format

Use conventional commit format for PR titles:

- `feat: add new audience targeting feature`
- `fix: resolve search filter bug`
- `docs: update API documentation`
- `style: improve button styling`
- `refactor: optimize search algorithm`
- `test: add unit tests for filters`

## Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Prefer functional components with hooks

### CSS/Styling

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS custom properties for theming

### Git Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(search): add location-based filtering

Add ability to filter audiences by geographic location
with radius-based search functionality.

Closes #123
```

## Testing

- Write unit tests for new functions
- Add integration tests for new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage

## Documentation

- Update README.md for new features
- Add JSDoc comments for new functions
- Update API documentation if applicable
- Include examples in documentation

## Reporting Issues

Use GitHub Issues to report bugs or request features. Please use the appropriate issue template and provide as much detail as possible.

### Security Issues

For security-related issues, please email [hello@](mailto:tisankan@example.com) directly instead of creating a public issue.

## Recognition

Contributors will be recognized in the README.md file and release notes. We appreciate all contributions, no matter how small!

## Questions?

If you have questions about contributing, feel free to:

- Open an issue with the `question` label
- Contact the maintainer: [Tisankan](https://tisankan.dev)
- Check existing discussions and issues

Thank you for contributing to making this project better! 🚀