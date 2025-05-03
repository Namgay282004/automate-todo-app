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

![](images/16.png)

On each push to GitHub, Render automatically builds and redeploys both services.

### Conclusion
This assignment demonstrated how to:

- Build a full-stack app using modern frameworks

- Use Docker for packaging applications

- Deploy and manage services using Render

- Automate deployments using CI/CD from GitHub

These practices are foundational for modern DevOps and cloud-native workflows.

