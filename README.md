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

### Initial offering creation

**Important:** Before using the Project Estimation App or its API to add files to a GitHub repository, you must initialize the repository with at least one commit (such as a README or .gitignore file). The GitHub API cannot create files in a repo with no branch.

To initialize a repository:
- Manually create a README or any file in the repo via the GitHub web UI, or
- Use the GitHub API to create an initial commit/branch.

Once the repo is initialized, you will be able to create/update files as expected.

Use the latest template at https://red.ht/ConsultingScopingTemplate.
Organize tabs from left to right as you complete them.
Add participants, fill in opportunity info, and normalize the document title.
Check Portfolio Hub for existing offerings and import if applicable.
Complete the Project Complexity Matrix with client input.
Review and write business outcomes, tasks, weekly tasks, legal words to avoid, risks, out of scope items, prerequisites & assumptions, and training recommendations.

## Features
- Create and manage projects
- Estimate tasks using PERT and other models
- Share projects with team members
- Template-based project creation
- Home and reporting

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
                Home/
                        Home.tsx
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
