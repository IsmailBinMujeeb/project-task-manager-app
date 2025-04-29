# Project Task Manager App

> This project is mainly focused on backend and has pretty small frontend too.

## Tech Stack

- ![React](https://img.shields.io/badge/React-blue?logo=react&logoColor=white)
- ![Node JS](https://img.shields.io/badge/Node.JS-green?logo=node.js&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-lightgreen?logo=mongodb&logoColor=black)
- ![JWT](https://img.shields.io/badge/JWT-red?logo=jsonwebtokens&logoColor=white)

## Installation

1. Clone The Repo
    ```bash
    git clone https://github.com/IsmailBinMujeeb/project-task-manager-app.git
    ```

2. Navigate to project-task-manager-app folder
    ```bash
    cd project-task-manager-app
    ```

## Backend Setup

0. Navigate To Backend folder
    ```bash
    cd backend
    ```

1. Install Dependencies
    ```bash
    npm install or npm i
    ```

2. Copy the sample.env code into .env
    ```bash
    copy sample.env .env
    ```
    or Copy and Paste in `.env`
    ```env
    PORT=3000

    MONGO_URI=
    CORS_ORIGIN=

    ACCESS_TOKEN_SECRET=
    ACCESS_TOKEN_EXPIRES_IN=

    REFRESH_TOKEN_SECRET=
    REFRESH_TOKEN_EXPIRES_IN=
    ```

3. Start the backend server
    ```
    npm run dev
    ```

4. Start Postman All APIs are available at http://localhost:3000/api/

## Frontend Setup

0. Make sure you are in the root diractory of project.

1. Navigate to fronend folder
    ```bash
    cd frontend
    ```

2. Install dependancies
    ```besh
    npm install or npm i
    ```

3. Run The App
    ```
    npm run dev
    ```

4. The App is acessable at http://localhost:3000

## Usage

| Routes | Usage |
|--------|-------|
|`/`|Landing Page|
|`/signup`|Signup Page|
|`/login`|Login Page|
|`/dashboard`|Dashboard `(All Projects Here)`|
|`/create-project`|Create A Project|
|`/project/:projectId`|A Perticular Project|