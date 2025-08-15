# Project Estimation App

A modern React application for managing and estimating projects, built with PatternFly for a consistent and enterprise-grade UI.

## Table of Contents
- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## About
Project Estimation App helps teams create, share, and manage project estimates using proven methodologies. It leverages PatternFly React components for a professional look and feel.

## Features
- Create and manage projects
- Estimate tasks using PERT and other models
- Share projects with team members
- Template-based project creation
- Dashboard and reporting

## Getting Started
### Prerequisites
- Node.js (v18 or newer recommended)
- npm
- If you encounter 'react-scripts: command not found', run:
	```bash
	npm install react-scripts --save-dev
	```

### Installation
```bash
npm install
```

### Running Locally
```bash
npm start
```
The app will be available at `http://localhost:3000`.

### Build for Production
```bash
npm run build
```

## Project Structure
```
public/
	index.html
src/
	App.tsx
	index.tsx
	components/
		AppShell.tsx
		Dashboard.tsx
		projects/
			...
		templates/
			...
	lib/
		db.ts
		pert.ts
	models/
		types.ts
```

## Contributing
Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License
This project is licensed under the MIT License.

---
Built with [PatternFly React](https://patternfly.org/).
# project-estimation
Project Estimation App
