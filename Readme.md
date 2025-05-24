# To-Do App Deployment with CI/CD (Assignment 1)

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

# Assignment II – CI/CD Pipeline with Jenkins

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