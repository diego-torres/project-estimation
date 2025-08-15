# Project Estimation Front-End

This repository hosts a PatternFly-powered React application written in TypeScript. It provides interfaces for creating project templates and estimating work.

## Testing Practices
- Unit tests are written with Jest and React Testing Library. Run `npm test` to execute the suite.
- ESLint enforces code quality. Run `npm run lint` before committing.
- Prettier is used for formatting via `npm run format`.

## Purpose
The application enables users to manage templates and projects for estimation purposes using PatternFly components.

## Common Controls
- Build UI with PatternFly React components such as `Button`, `Form`, `Modal` and lists.
- Place shared components in `src/components` and application routes in `src/app`.
- Include accompanying tests in `*.test.tsx` for new components.

Before submitting changes, run `npm run lint` and `npm test`.
