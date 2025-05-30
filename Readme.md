# Assignment I : To-Do App Deployment with CI/CD 

## Objective

This report demonstrates practical implementation of DevOps workflows including:

- Building a full-stack To-Do application
- Containerizing the application using Docker
- Deploying services to Render.com
- Automating image builds and deployments via GitHub CI/CD pipelines


## Step 0: Basic Full-Stack Web App

### Tech Stack
- **Frontend:** React
- **Backend:** Node.js with Express
- **Database:** PostgreSQL

### Environment Configuration

- **Backend `.env`:**
  ```env
  DATABASE_URL=postgresql://namgay:password@localhost:5432/todo
  ```

- **Frontend `.env`:**
    ```
    REACT_APP_API_URL=http://localhost:5000
    ```

### Local Testing
- Run `npm i` and `npm start` in both `backend` and `todo-frontend` directories.

- Data flows from frontend to backend and is stored in the PostgreSQL database.

- `.env` files are listed in `.gitignore`.


## Part A: Dockerizing and Pushing to Docker Hub

### Docker Build

Dockerfiles created for both frontend and backend.

Images tagged using student ID.

### Sample Backend Dockerfile:

![](images/3.png)

### Sample Frontend Dockerfile:

![](images/4.png)

### Docker Push
```
docker build -t 02230290namgay/todo-backend:02230290 .
```
![](images/5.png)
```
docker push 02230290namgay/todo-backend:02230290
```
![](images/7.png)

```
docker build -t 02230290namgay/todo-frontend:02230290 .
```
![](images/6.png)
```
docker push 02230290namgay/todo-frontend:02230290
```
![](images/8.png)

##  Part A: Deploying to Render

### Backend Web Service
Create a Web Service and then Select "Existing image from Docker Hub".

Image: `02230290namgay/todo-backend:02230290`

![](images/9.png)

Create a Postgres database on `render.com`

![](images/12.png)

![](images/13.png)

![](images/14.png)

Environment Variables on `render.com`:
```
DB_HOST=dpg-d045kcidbo4c73e9fd90-a.singapore-postgres.render.com
DB_USER=namgay
DB_PASSWORD=WqjqzRsqn8pqb3uww1t0X6TaMEnkxddb
DB_NAME=todo_kin0
DB_PORT=5432
PORT=5000
```
![](images/10.png)

### Frontend Web Service
Create a Web Service and then Select "Existing image from Docker Hub".

Image: `02230290namgay/todo-frontend:02230290`

![](images/11.png)

Environment Variables on `render.com`(same process but set):

```
REACT_APP_API_URL=https://todo-backend-02230290.onrender.com
```

![](images/15.png)


## Part B: CI/CD with GitHub + Render

### Updated Structure
```
todo-app/
  ├── frontend/
  │   └── Dockerfile
  ├── backend/
  │   └── Dockerfile
  └── render.yaml
```

### render.yaml
```
services:
  - type: web
    name: backend-todo
    env: docker
    dockerfilePath: ./backend/Dockerfile
    envVars:
      - key: DATABASE_URL
        value: https://todo-frontend-02230290final.onrender.com
      - key: PORT
        value: 5000

  - type: web
    name: frontend-todo
    env: docker
    dockerfilePath: ./frontend/Dockerfile
    envVars:
      - key: REACT_APP_API_URL
        value: https://todo-backend-02230290-final.onrender.com
```

## Challenges Faced

Part B of this assignment which is to deploy directly from a Git repo with multi-service Docker setup was not completed as we are required to use Blueprints but sadly it works under subscription only.


### Conclusion
This assignment demonstrated how to:

- Build a full-stack app using modern frameworks

- Use Docker for packaging applications

- Deploy and manage services using Render

- Automate deployments using CI/CD from GitHub

These practices are foundational for modern DevOps and cloud-native workflows.

-----

# Assignment II: CI/CD Pipeline with Jenkins

## Objective

This assignment involved configuring a Jenkins pipeline to automate the build, test, and deployment of a Node.js-based to-do list application. The CI/CD workflow ensures seamless code integration, testing, and deployment using Jenkins, GitHub, Node.js, and optionally Docker.

## Pipeline Stages Implemented

The Jenkins pipeline includes the following stages:

1. **Checkout** – Clones the GitHub repository.
2. **Install** – Installs all Node.js dependencies using `npm install`.
3. **Build** – Builds the project (optional for basic Node.js apps).
4. **Test** – Runs unit tests using Jest with JUnit report generation.
5. **Deploy** – Builds and pushes a Docker image to Docker Hub.


## Setup Instructions

### Jenkins Configuration

- Installed Jenkins locally and accessed it via [](http://localhost:8080)


- Installed required plugins:

  - NodeJS Plugin

  - Pipeline

  - GitHub Integration

  - Docker Pipeline

- Configured Node.js under Manage Jenkins > Tools > NodeJS

- Added GitHub credentials using a Personal Access Token.

### GitHub

- Repository: [automate-todo-app](https://github.com/Namgay282004/automate-todo-app.git)

- Added Jenkinsfile in the root directory.

### Testing

- Installed Jest and Jest JUnit Reporter:
  ```
  npm install --save-dev jest jest-junit
  ```
- Added the following scripts to package.json:
  ```
  "scripts": {
  "test": "jest --ci --reporters=default --reporters=jest-junit"
  }
  ```

## Screenshots

Created a GitHub Personal Access Token (PAT) with repo and admin:repo_hook permissions
![](img-ass2/1.png)
![](img-ass2/2.png)

Navigated to Manage Jenkins > Tools > NodeJS
Added NodeJS installation (version 24.0.2)
![](img-ass2/3.png)

Added GitHub credentials in Jenkins (Manage Jenkins > Credentials > Node > Add)
![](img-ass2/4.png)

Create a Jenkinsfile in your root directory

Ran the following commands for both frontend and backend
```
npm install --save-dev jest-junit
```

Created a new Jenkins Pipeline item
  - Pipeline script from SCM (Git)
  - Provided the repository URL and credentials
  - Set the script path to "jenkinsfile"
  - Built and monitored the pipeline execution
![](img-ass2/5.png)
![](img-ass2/6.png)

Images were then created in DockerHub
![](img-ass2/7.png)


## Challenges Faced
1. **Node.js Plugin Detection Failure**
Had to specify the exact node that has to be installed 'NodeJS 24.0.2'
  ![](img-ass2/9.png)

    ![](img-ass2/3.png)

2. **Test Report Not Showing in Jenkins**
The test results weren’t showing under Jenkins initially. Fixed it by ensuring the *jest-junit* reporter was configured correctly and naming the result file as *junit.xml*.

3. **Docker Authentication**
Jenkins failed to push the Docker image due to missing credentials. Solved by adding Docker Hub credentials in Jenkins and referencing the correct ID in the Jenkinsfile. 
  ![](img-ass2/8.png)

4. **Jenkins pipeline failed at the Install stage due to a missing package.json file (ENOENT error)**.
The file was not found in the expected workspace directory. Verified the correct repository path and ensured *package.json* was committed and located properly.
![](img-ass2/10.png)
![](img-ass2/11.png)

Build `#33` succeeded, confirming the issue was fixed.
![](img-ass2/12.png)


## Conculsion

- Set up CI/CD pipeline using Jenkins.

- Automated code checkout, install, test, and deploy.

- Faced multiple build failures initially.

- Fixed issues by updating package.json and test scripts.

- Final build succeeded with passing tests.

----

# Assignment III: TODO App CI/CD Deployment with GitHub Actions

## Objective

This project is a CI/CD assignment that demonstrates building and deploying a full-stack TODO application using Docker, GitHub Actions, DockerHub, and Render.com.

The application is split into:
- `backend/` – Node.js (Express) server
- `frontend/` – React application

The pipeline builds Docker images for both services and pushes them to DockerHub. Deployments are then triggered on Render.com using deploy webhooks, all automated via GitHub Actions.

## Steps Followed (with Screenshots)

### 1. Project Structure Verification

- Ensured both `backend/` and `frontend/` directories contained a valid `package.json` with necessary scripts

- Verified the repository was set to public

- Confirmed Dockerfiles were correctly placed and structured for both services

### 2. Set Up GitHub Actions Workflow

Created `.github/workflows/main.yml` to automate:

- Docker login

- Build & push for backend and frontend

- Webhook deployment to Render

  ![](img-ass3/1.png)

### 3. Configured GitHub Secrets

Added the following secrets under:
**Settings** → **Secrets and Variables** → **Actions** (not Codespaces)



`DOCKERHUB_USERNAME`: Dockerhub Username

`DOCKERHUB_TOKEN`: Personal Access Token from Dockerhub

`RENDER_BACKEND_WEBHOOK_URL`

`RENDER_FRONTEND_WEBHOOK_URL`

![](img-ass3/5.png)

![](img-ass3/2.png)

### 4. Configured Render Deploy Hooks
- Created two services on Render (backend and frontend)

- Enabled deploy webhooks

- Used those URLs in GitHub secrets

  ![](img-ass3/3.png)

  ![](img-ass3/4.png)

### 5. Triggered Deployment
Final push to main branch ran the full CI/CD pipeline successfully:

- Images built and pushed

- Render deployment triggered

  ![](img-ass3/6.png)

  Verified that it deployed via Deploy Hook

  ![](img-ass3/7.png)
## Challenges Faced

### 1. DockerHub login failure in GitHub Actions
I encountered an error during the DockerHub login step in GitHub Actions:

```
Error: Username and password required
```
The issue occurred because I accidentally added the secrets under
**Secrets and variables** → **Codespaces** instead of → **Actions**. After moving the secrets to **Actions** scope, the login worked as expected.

## Conclusion
This part of the assignment helped reinforce practical understanding of CI/CD workflows using Docker, GitHub Actions, and Render. It covered:

- Dockerizing both frontend and backend

- Setting up automated builds and deployment pipelines

Everything now works as expected with every push to the main branch automatically building and deploying the app 

----

# Assignment IV: Secure CI/CD Pipeline with Docker, Jenkins, and GitHub Actions

## Objective

This assignment demonstrates how to integrate security best practices into CI/CD workflows using:

- Docker (non-root users and secret management)

- Jenkins (secure DockerHub credential management)

- GitHub Actions (secret handling and secure image deployment)

## Docker Secure Practices

### Docker Security Enhancements

- Updated `Dockerfile` to use a **non-root user** (appuser) to avoid privilege escalation risks.

- Used **Docker secrets** to store sensitive credentials instead of hardcoding them or exposing them in build logs.

  ![](img-ass4/3.png)

### Jenkins Secure Pipeline Setup

- **Credentials** → **Global** → **Add Credentials** → DockerHub username&password(DockerHub Personal Access Token)

- ID used: `docker-hub-creds`

  ![](img-ass4/2.png)

### GitHub Actions Secure Workflow

`.github/workflows/secure-ci.yml`

![](img-ass4/4.png)

GitHub Secrets Stored Under: **Settings** → **Secrets and Variables** → **Actions**

- `DOCKERHUB_USERNAME`

- `DOCKERHUB_TOKEN`

Successfully deployed images to DockerHub via GitHub Actions

![](img-ass4/5.png)

### Challenges Faced

- **Creating a Non-root User in Docker (Frontend)**

  While trying to create a non-root user in the `frontend/Dockerfile`, the build failed with the error:

  ```
  /bin/sh: groupadd: not found
  ```
  ![](img-ass4/1.png)

  This occurred because the base image `nginx:alpine` uses Alpine Linux, which does not include `groupadd` and `useradd` utilities by default. Replacing with debian-compatible commands worked.

  ```
  # Before (Incorrect for Alpine)
  RUN groupadd -r appgroup && useradd -r -g appgroup appuser

  # After (Correct for Alpine)
  RUN addgroup -S appgroup && adduser -S -G appgroup appuser
  ```

- **Dockerfile Path Error in GitHub Actions**

  The GitHub Actions workflow failed with:

  ```
  failed to read dockerfile: open Dockerfile: no such file or directory
  ```

  This happened because the default build context expected a `Dockerfile` in the root directory, but it was located at `frontend/Dockerfile.`

  Explicitly specifying the Dockerfile path and context in the workflow worked.

  ```
  - name: Build Docker image
    run: docker build -f frontend/Dockerfile -t secure-frontend ./frontend
  ```

## Conclusion

This assignment honed my DevSecOps concepts:

- Running containers as non-root users

- Managing Docker credentials securely

- Building and deploying Docker images through secure Jenkins and GitHub pipelines

The workflows ensure a secure image deployments for production-like environments.