# Contributing to Dialogo

Thank you for your interest in contributing to Dialogo! This guide will help you get started with development and understand our contribution process.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- Git

### Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/dialogo.git
   cd dialogo
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development**

   ```bash
   # Watch mode for the main library
   pnpm dev

   # Start the test website
   pnpm dev:test

   # Start the documentation website
   pnpm dev:website
   ```

## 🏗️ Project Structure

```
dialogo/
├── src/
│   └── index.ts          # Main library code
├── test/                 # Test website and examples
│   ├── src/
│   │   └── app/         # Next.js test app
│   └── package.json
├── dist/                 # Built files (generated)
├── package.json          # Main package configuration
└── README.md            # Documentation
```

## 📝 Development Guidelines

### Code Standards

- **TypeScript**: All code must be written in TypeScript
- **Zero Dependencies**: Keep the main library dependency-free
- **Framework Agnostic**: Ensure compatibility with any JavaScript environment without type conflicts
- **Headless Design**: Maintain separation between logic and presentation
- **Type Safety**: Use framework-agnostic types that work with React, Vue, Svelte, and any other framework

### Type Definitions

When adding new features, ensure proper TypeScript definitions that are framework-agnostic:

```typescript
// ✅ Good - Framework-agnostic types
type ModalContent = Element | string | object;

// ✅ Good - Descriptive interface that works with any framework
export type ModalState = {
  isOpen: boolean;
  activeView: { element: ModalContent; id: number } | null;
  hasHistory: boolean;
};
```

### API Design Principles

1. **Consistency**: Follow existing patterns
2. **Simplicity**: Keep the API intuitive
3. **Flexibility**: Support multiple use cases
4. **Type Safety**: Provide comprehensive TypeScript support
5. **Framework Agnostic**: Ensure types work with React, Vue, Svelte, and any other framework

### Testing Strategy

#### Manual Testing

- Test with React components
- Test with Vue components
- Test with Svelte components
- Test with vanilla JavaScript
- Test with different DOM elements (HTML, SVG, custom elements)
- Test navigation history functionality
- Test subscription/unsubscription patterns
- Test framework-agnostic type compatibility

#### Automated Testing

```bash
# Run tests
pnpm test

# Type checking
pnpm type-check
```

## 🎯 Contribution Areas

### High Priority

- **Bug Fixes**: Issues affecting core functionality
- **Type Safety**: Improving TypeScript definitions
- **Documentation**: Clarifying API usage and examples
- **Performance**: Optimizing state management

### Medium Priority

- **New Features**: Additional utility methods
- **Framework Examples**: Integration guides for Vue, Svelte, etc.
- **Testing**: Additional test coverage including framework compatibility tests
- **Build Optimization**: Improving bundle size and compatibility
- **Type Safety**: Ensuring framework-agnostic types work with all frameworks

### Low Priority

- **UI Components**: Since Dialogo is headless, UI components belong in separate packages
- **Styling**: Visual styling should be handled by consumers

## 🔧 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### 2. Make Your Changes

- Follow the existing code style
- Add TypeScript types for new features
- Update documentation if needed
- Test across different environments

### 3. Test Your Changes

```bash
# Build the library
pnpm build

# Check types
pnpm type-check

# Test in the test app
pnpm dev:test
```

### 4. Update Documentation

- Update README.md if API changes
- Add examples for new features
- Update type definitions in documentation

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add new navigation method"
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

- Provide a clear description of changes
- Include testing instructions
- Reference any related issues

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows TypeScript best practices
- [ ] No new dependencies added to main package
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] Examples work in test environment

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing

- [ ] Tested with React
- [ ] Tested with vanilla JavaScript
- [ ] Tested with different DOM elements
- [ ] Navigation history works correctly

## Breaking Changes

- [ ] No breaking changes
- [ ] Breaking changes documented

## Additional Notes

Any additional context or notes
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment**: Node.js version, package manager, framework
2. **Reproduction**: Minimal code example
3. **Expected vs Actual**: Clear description of expected behavior
4. **Console Errors**: Any error messages or warnings

### Bug Report Template

````markdown
## Bug Description

Clear description of the issue

## Steps to Reproduce

1. Step one
2. Step two
3. Step three

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- Node.js: v18.x
- Package Manager: pnpm
- Framework: React/Vanilla JS/etc.

## Code Example

```javascript
// Minimal reproduction code
```
````

## Console Output

Any error messages or warnings

````

## 💡 Feature Requests

When suggesting features:

1. **Use Case**: Explain the problem you're solving
2. **Proposed Solution**: Describe your suggested approach
3. **Alternatives**: Consider existing workarounds
4. **Framework Impact**: Consider how it affects different frameworks

## 🏷️ Version Management

### Semantic Versioning
- **Patch** (0.1.x): Bug fixes, no breaking changes
- **Minor** (0.x.0): New features, backward compatible
- **Major** (x.0.0): Breaking changes

### Release Process
1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create git tag
4. Publish to npm

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Welcome diverse perspectives

### Communication
- Use GitHub Issues for discussions
- Be clear and specific in feedback
- Ask questions when unsure
- Share knowledge and examples

## 📚 Resources

### Development Tools
- **TypeScript**: Language and type checking
- **Bunchee**: Build tool for library
- **Playwright**: End-to-end testing
- **Turbo**: Monorepo management

### Useful Commands
```bash
# Development
pnpm dev              # Watch mode
pnpm build            # Build library
pnpm type-check       # Type checking

# Testing
pnpm test             # Run tests
pnpm dev:test         # Test website
pnpm dev:website      # Documentation

# Code Quality
pnpm format           # Format code
````

### Getting Help

- 📧 Email: ciao@edoardoguido.com
- 🐛 Issues: GitHub Issues
- 📖 Docs: README.md and website

---

**Thank you for contributing to Dialogo!** 🎉

Your contributions help make Dialogo better for everyone in the JavaScript ecosystem.
