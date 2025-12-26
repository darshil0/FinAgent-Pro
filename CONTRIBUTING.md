# Contributing to AI FinAgent QA

First off, thank you for considering contributing to the AI Financial Agent Testing Framework! It’s people like you who make this tool better for the QA and FinTech community.

## 📜 Code of Conduct

By participating in this project, you agree to maintain a professional and respectful environment. Please report any inappropriate behavior to the project maintainers.

## 🛠️ Getting Started

1. **Fork the repository** and create your branch from `main`.
2. **Install dependencies**:
```bash
bun install

```


3. **Set up your environment**: Ensure you have a `.env.local` with a valid `GEMINI_API_KEY` to run AI-integrated tests.
4. **Create a branch**: Use a descriptive name:
* `feat/add-redis-cache`
* `fix/chart-resize-issue`
* `docs/update-api-reference`



## 🏗️ Development Standards

To maintain the high standards required for financial QA tools, please adhere to the following:

### 1. TypeScript & Typing

* **No `any**`: Use strict typing. Use `interface` for object structures and `type` for unions/aliases.
* **Immutability**: Use `readonly` for interfaces where data should not be mutated after fetching.
* **Server vs. Client**: Mark client components with `'use client'`. Never use browser APIs (like `window` or `localStorage`) in Server Actions. Use the provided `useLocalStorage` hook which includes SSR safety guards.

### 2. UI & Styling

* **Design System**: Use **shadcn/ui** components.
* **Theming**: Ensure all new components support **Dark Mode** and respect `prefers-reduced-motion`.
* **Accessibility**: Use semantic HTML (e.g., `<main>`, `<section>`, `<button>`) and provide `aria-labels` for interactive elements.

### 3. Testing Requirements

We maintain a strict **>90% test coverage** goal.

* **Unit Tests**: Required for every utility function and logic-heavy component.
* **Integration Tests**: Required for any new Server Action or API route.
* **Validation Commands**:
```bash
bun test            # Run all tests
bun run typecheck   # Validate TypeScript (npx tsc --noEmit)
bun run lint        # Check code style

```



## 📨 Pull Request Process

### 1. Conventional Commits

We use conventional commit messages for automated changelog generation. Please format your commits as:

* `feat: ...` for new features
* `fix: ...` for bug fixes
* `docs: ...` for documentation changes
* `test: ...` for adding/fixing tests

### 2. PR Requirements

* **Update Documentation**: If you add a feature, update the `README.md`.
* **Self-Review**: Remove all `console.log` statements and debug breakpoints.
* **PR Template**: Your description must include:
* **Problem**: What issue does this solve?
* **Solution**: How did you fix it?
* **Testing**: List the specific tests run to verify the fix.



## 📊 Financial Data & Security

* **Mock Data Only**: Never commit real financial data or PII (Personally Identifiable Information). Use the mock generators in `tests/fixtures/`.
* **Secret Management**: Never hardcode API keys. Ensure all secrets are in `.env.local`.
