# API Documentation

## Overview
This document provides a comprehensive guide to the API built using Express.js. The API allows users to manage problems, teachers, and students effectively.

## Endpoints

### Get all problems
```js
app.get('/problems', (req, res) => {
    // Logic to retrieve all problems
});
```

### Get all problems by author
```js
app.get('/problems/:author', (req, res) => {
    // Logic to retrieve problems by a specific author
});
```

### Get a problem by name
```js
app.get('/problems/:title', (req, res) => {
    // Logic to retrieve a specific problem by its title
});
```

### Check problem answer
```js
app.post('/problems/checkproblem/:username', (req, res) => {
    // Logic to check the answer for a problem
});
```

### Get all teachers
```js
app.get('/teachers', (req, res) => {
    // Logic to retrieve all teachers
});
```

### Get a teacher by username
```js
app.get('/teachers/:username', (req, res) => {
    // Logic to retrieve a specific teacher by username
});
```

### Get all students
```js
app.get('/students', (req, res) => {
    // Logic to retrieve all students
});
```

### Get a student by username
```js
app.get('/students/:username', (req, res) => {
    // Logic to retrieve a specific student by username
});
```

### Get a student's solved problems by username
```js
app.get('/students/:username/solved', (req, res) => {
    // Logic to retrieve solved problems for a specific student
});
```

### Add a new user
```js
app.post('/signup', (req, res) => {
    // Logic to add a new user
});
```

### Login check
```js
app.post('/login', (req, res) => {
    // Logic to check user login credentials
});
```

### Add a new problem
```js
app.post('/saveproblem', (req, res) => {
    // Logic to add a new problem
});
```

## Running the Server
To start the server, use the following code in the root directory:
```bash
nose server.js
});
```
Ensure that you have all necessary dependencies installed and run the server using Node.js. Access the API at http://localhost:8081.