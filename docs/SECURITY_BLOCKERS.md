# Security Debt and Modernization Roadmap

## Remaining Vulnerabilities

After upgrading direct dependencies to the latest safe versions within the current architecture, some vulnerabilities remain due to deep transitive dependencies, primarily anchored by `react-scripts`.

### Client-side Blockers
The following vulnerabilities are currently blocked by `react-scripts@5.0.1`:

- **nth-check (<2.0.1):** High severity ReDoS. Transitive via `@svgr/webpack`.
- **postcss (<8.4.31):** Moderate severity. Transitive via `resolve-url-loader`.
- **serialize-javascript (<=7.0.2):** High severity RCE/XSS. Transitive via `css-minimizer-webpack-plugin` and `rollup-plugin-terser`.
- **webpack-dev-server (<=5.2.0):** Moderate severity.
- **jsdom / http-proxy-agent / @tootallnate/once:** Incorrect Control Flow Scoping. Transitive via `jest`.

### Server-side Blockers
- **fast-xml-parser (transitive):** High severity vulnerabilities remain in the version used by `@aws-sdk` (which is a dependency of `mongodb`, used by `mongoose@6`). While Mongoose 6 was updated to its latest patch, a full move to Mongoose 9 would be required to potentially resolve this, which is a breaking change.

## Modernization Path (Recommended)

To fully remediate the remaining security debt, the following steps are recommended:

1. **Migrate Client from `react-scripts` to Vite:**
   - `react-scripts` is no longer maintained and pins many vulnerable dependencies (Webpack 5, Jest 27, etc.).
   - Migrating to Vite will allow for more granular control over dependencies and much faster build times.
2. **Upgrade to Mongoose 9.x:**
   - This will involve breaking changes in the server-side data layer but will provide access to the latest security patches in the MongoDB driver and its transitive dependencies.
3. **Migrate to React 19:**
   - Once the build system is modernized, moving to React 19 will ensure long-term support.
