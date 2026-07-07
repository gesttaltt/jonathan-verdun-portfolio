# Testing Specification

Reference for the testing strategy, tooling, and CI integration.

---

## Stack

| Tool                        | Version | Role                          |
| --------------------------- | ------- | ----------------------------- |
| Jest                        | 30.2.0  | Test runner                   |
| @testing-library/react      | 16.3.2  | Component rendering           |
| @testing-library/jest-dom   | 6.9.1   | DOM assertion matchers        |
| @testing-library/user-event | 14.6.1  | User interaction simulation   |
| fast-check                  | 4.5.3   | Property-based / fuzz testing |
| ts-jest                     | 29.4.6  | TypeScript transform          |

---

## Configuration

### Jest Config (`jest.config.mjs`)

```javascript
const config = {
  setupFilesAfterSetup: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
}
```

Uses `next/jest` to inherit Next.js transforms (SWC compilation, CSS module handling, image mocking).

### Setup File (`jest.setup.ts`)

Polyfills required for jsdom:

1. **IntersectionObserver** — required by Framer Motion. Provides a no-op implementation.
2. **matchMedia** — required by responsive hooks. Returns `{ matches: false }` mock.
3. **@testing-library/jest-dom** — extends `expect` with DOM matchers (`toBeInTheDocument`, `toHaveTextContent`, etc.).

---

## Test Organization

Tests live alongside source in `__tests__/` directories or `*.test.ts` files:

```
src/
├── __tests__/
│   ├── CommandProcessor.test.ts
│   └── ProjectContract.test.ts
```

### Naming convention

- Unit tests: `[Module].test.ts`
- Component tests: `[Component].test.tsx`
- Property tests: `[Domain].property.test.ts`

---

## Testing Strategies

### Unit Tests

Verify isolated service logic:

```typescript
// CommandProcessor.test.ts
const processor = new DefaultCommandProcessor()
expect(processor.process('help')).toContain('Available commands')
expect(processor.process('unknown')).toContain('command not found')
```

### Property-Based Tests (fast-check)

Fuzz domain invariants with random inputs:

```typescript
import fc from 'fast-check'

fc.assert(
  fc.property(fc.string(), (input) => {
    const result = processor.process(input)
    // Invariant: process() always returns a non-empty string
    expect(result.length).toBeGreaterThan(0)
  })
)
```

This aligns with the QA Philosophy contract's "property-based" layer for discovering unknown unknowns.

### Component Tests

Use React Testing Library to verify rendering and user interaction:

```typescript
render(<Terminal commands={mockCommands} processor={mockProcessor} />)
expect(screen.getByRole('log')).toBeInTheDocument()
```

---

## Scripts

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `npm test`           | Run full test suite              |
| `npm run test:watch` | Watch mode for development       |
| `npm test -- --ci`   | CI mode (used in GitHub Actions) |

---

## CI Integration

Tests run in the GitHub Actions pipeline on every push/PR to `main`, `master`, or `dev`:

```yaml
- name: Run Tests
  run: npm test -- --ci
```

Tested against Node.js 20.x and 22.x matrices. Tests must pass before the build step proceeds.

---

## Mocking Patterns

### WebGL / Three.js

Three.js components are wrapped in `<ErrorBoundary>` in production. In tests, the R3F canvas and WebGL context aren't available in jsdom, so these components are typically:

- Tested at the integration boundary (props in, rendered output assertions)
- Mocked at the module level when testing parent components

### Static Data

The repository pattern (`IProjectRepository`) enables injecting mock data in tests:

```typescript
const mockAdapter: IProjectRepository = {
  getProjects: () => [{ id: 'test', title: 'Test', ... }]
}

render(
  <ProjectProvider adapter={mockAdapter}>
    <ProjectGallery />
  </ProjectProvider>
)
```
