# DevOps Lab 1: Node.js Express CI/CD Pipeline

This repository contains a containerized Node.js + Express application with automated testing and Jenkins CI/CD pipeline integration.

---

## 🛠️ Tech Stack

*   **Runtime:** Node.js (Express framework)
*   **Testing:** Jest & Supertest
*   **Containerization:** Docker (Multi-stage builds)
*   **CI/CD Automation:** Jenkins Pipeline

---

## 📂 Project Structure

```text
devops-lab1-ci-cd/
├── src/
│   ├── app.js               # Application entry point
│   └── routes/
│       ├── index.js         # Main routes
│       └── health.js        # Health check endpoint
├── __tests__/
│   └── app.test.js          # Jest unit tests
├── Dockerfile               # Production Docker build definition
├── Jenkinsfile              # Jenkins declarative pipeline script
├── .gitignore               # Ignored files list
└── package.json             # App metadata & dependencies
```

---

## 🌿 2.3 Branch Strategy

We follow a simplified **GitHub Flow / Feature Branching** strategy:

```mermaid
gitGraph
    commit id: "Initial commit"
    commit id: "feat: add express server"
    branch feature/add-health-check
    checkout feature/add-health-check
    commit id: "feat: add /health endpoint"
    commit id: "test: verify health endpoint"
    checkout main
    merge feature/add-health-check
    commit id: "release: v1.0.0"
```

### Branches Used:
1.  **`main`**: The default branch representing production-ready code. Only merged after tests pass.
2.  **`feature/*`** or **`fix/*`**: Temporary branches used for development. PRs (Pull Requests) are created to merge these branches back into `main`.

---

## 📝 2.4 Meaningful Commit Conventions

We strictly adhere to the **Conventional Commits** specification to maintain a clean git log:

### Commit Format:
```text
<type>(<scope>): <description>

[optional body]
```

### Commit Types:
*   `feat`: A new feature (e.g., `feat(routes): add health check route`).
*   `fix`: A bug fix (e.g., `fix(deps): add package-lock.json for npm ci`).
*   `docs`: Documentation changes only (e.g., `docs: update README with branch strategy`).
*   `style`: Code style changes (formatting, missing semi-colons, etc.; no production logic changes).
*   `test`: Adding or correcting tests (e.g., `test(api): add tests for about page`).
*   `chore`: Updating build tasks, package manager configs, etc. (e.g., `chore: update gitignore`).

---

## 🚀 How to Run Locally

### 1. Development Mode
```bash
npm install
npm run dev
```

### 2. Run Tests
```bash
npm test
```

### 3. Run with Docker
```bash
docker build -t devops-lab1-app .
docker run -p 3000:3000 --name devops-lab1-container devops-lab1-app
```
Check health at: `http://localhost:3000/health`

---

## 📷 Stage 7: Evidence Checklist (Screenshots)

To complete the lab verification, capture the following screenshots and save them in the `docs/screenshots/` folder with the specified filenames. They will automatically render below:

### 1. Git Version & Config
*   **Filename:** `git_version.png`
*   Command: `git --version; git config user.name; git config user.email`
*   ![Git Version](./docs/screenshots/git_version.png)

### 2. GitHub Repository Setup
*   **Filename:** `github_repo.png`
*   Show that the repository has been created on GitHub and code is successfully pushed.
*   ![GitHub Repo](./docs/screenshots/github_repo.png)

### 3. Jenkins Dashboard
*   **Filename:** `jenkins_dashboard.png`
*   Show the Jenkins homepage showing the list of jobs and the `devops-lab1-pipeline` status.
*   ![Jenkins Dashboard](./docs/screenshots/jenkins_dashboard.png)

### 4. Successful Pipeline Run (Green Status)
*   **Filename:** `jenkins_pipeline_success.png`
*   Show the Pipeline Stage View with all steps checked green (Build #4).
*   ![Successful Pipeline](./docs/screenshots/jenkins_pipeline_success.png)

### 5. Console Output of Successful Build
*   **Filename:** `jenkins_console.png`
*   Show the end of the console log displaying `Finished: SUCCESS`.
*   ![Jenkins Console](./docs/screenshots/jenkins_console.png)

### 6. GitHub Commit History
*   **Filename:** `github_commits.png`
*   Show the commit log on GitHub showing conventional commits (`feat:`, `fix:`, `docs:`).
*   ![GitHub Commits](./docs/screenshots/github_commits.png)

### 7. Polling/Webhook Trigger Configuration
*   **Filename:** `jenkins_triggers.png`
*   Show the triggers section in Jenkins config displaying "Build Triggers" (e.g., Poll SCM).
*   ![SCM Polling Trigger](./docs/screenshots/jenkins_triggers.png)

