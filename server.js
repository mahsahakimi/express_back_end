const express = require('express');
const mongoose = require("mongoose");
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());

const mongoURI = "mongodb://127.0.0.1:27017/your-database-name";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

let problems = [
  {
    "title" : "yoyo",
    "content" : "Who is the most famous rapper in the hip-hop history?",
    "option_1" : "Kendrick Lamar",
    "option_2" : "Nas",
    "option_3" : "Eminem",
    "option_4" : "Reza Pishro",
    "answer" : "3",
    "difficulty" : "Easy",
    "category" : "music",
    "author" : "mmd",
    "solved" : "25"
  },
  {
    "title" : "boom",
    "content" : "Where was 2024 olympics held?",
    "option_1" : "Iran",
    "option_2" : "Paris",
    "option_3" : "America",
    "option_4" : "Japan",
    "answer" : "2",
    "difficulty" : "Medium",
    "category" : "sport",
    "author" : "mmd",
    "solved" : "20"
  },
  {
    "title" : "Add",
    "content" : "What is the sum of 4 + 3?",
    "option_1" : "5",
    "option_2" : "3",
    "option_3" : "1",
    "option_4" : "7",
    "answer" : "4",
    "difficulty" : "Easy",
    "category" : "math",
    "author" : "alexjj",
    "solved" : "30"
  }
];

let teachers = [
  {
    "name" : "Mohammad Faridi",
    "created" : "2",
    "username" : "mmd",
    "followers" : "0",
    "followings" : "0"   
  },
  {
    "name" : "John Doe",
    "created" : "2",
    "username" : "johndoe",
    "followers" : "1",
    "followings" : "1"
  },
  {
    "name" : "Jane Smith",
    "created" : "0",
    "username" : "janeee",
    "followers" : "0",
    "followings" : "2"
  },
  {
    "name" : "Alex Johnson",
    "created" : "5",
    "username" : "alexjj",
    "followers" : "0",
    "followings" : "2"
  }
];

let students = [
  {
    "name" : "Mehdi Amini",
    "score" : "2",
    "username" : "mehdiii",
    "followers" : "1",
    "followings" : "1",
    "solved" : ["yoyo", "boom"]
  },
  {
    "name" : "Sahar Almasi",
    "score" : "0",
    "username" : "almasi83",
    "followers" : "0",
    "followings" : "2",
    "solved" : []
  },
  {
    "name" : "Misagh Rasoli",
    "score" : "3",
    "username" : "mis4gh",
    "followers" : "2",
    "followings" : "0",
    "solved" : ["Add", "boom", "yoyo"]
  }
];

let tokens = [
  {
    "username" : "mmd",
    "password" : "123",
    "type" : "t" 
  },
  {
    "username" : "mis4gh",
    "password" : "123",
    "type" : "s" 
  }
];

// Get all problems
app.get('/problems', (req, res) => {
  res.json(problems);
});

// Get all problems by author
app.get('/problems/:author', (req, res) => {
  const _problems = [];
  problems.forEach(element => {
    if(element.author === req.params.author)
      _problems.push(element);
  });
  if (!_problems) {
    return res.json({message: "Problem not found!"})
  }
  res.json(_problems);
});

// Get a problem by name
app.get('/problems/:title', (req, res) => {
  const problem = problems.find(element => element.title === req.params.title);
  if (!problem) {
    return res.status(404).json({message: "Problem not found!"})
  }
  res.json(problem);
});

// check problem answer
app.post('/problems/checkproblem/:username', (req, res) => {
  const problem = problems.find((element) => {
    if (element.title === req.body.Title)
    {
      if (element.answer === req.body.Answer)
      {
        const student = students.find(stu => stu.username === req.params.username);
        const alredySolved = (student.solved).find((t) => (t === req.body.Title));
        if (!alredySolved) {
          student.solved.push(req.body.Title);
          return res.json({message: "Correct!"})
        }
        else
          return res.json({message: "Problem alredy solved!"});
      }
      else
        return res.json({message: "False!"})
    }
  });

  if (!problem) {
    return res.status(404).json({message: "Problem not found!"})
  }
});

// Get all teachers
app.get('/teachers', (req, res) => {
  res.json(teachers);
});

// Get a teacher by username
app.get('/teachers/:username', (req, res) => {
  const teacher = teachers.find(element => element.username === req.params.username);
  if (!teacher) {
    return res.status(404).json({message: "Teacher not found!"})
  }
  res.json(teacher);
});

// Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// Get a student by username
app.get('/students/:username', (req, res) => {
  const student = students.find(element => element.username === req.params.username);
  if (!student) {
    return res.status(404).json({message: "Student not found!"})
  }
  res.json(student);
});

// Get a student's solved problems by username
app.get('/students/:username/solved', (req, res) => {
  const student = students.find(element => element.username === req.params.username);
  if (!student) {
    return res.status(404).json({message: "Student not found!"})
  }
  const solved = student.solved;
  const solvedProblems = [];
  solved.forEach(elementName => {
    solvedProblems.push(problems.find(element => element.title === elementName));
  });
  res.json(solvedProblems);
});

// Add a new user
app.post('/signup', (req, res) => {
  tokens.forEach(element => {
    if (element.type === req.body.type) {
      if (element.username === req.body.username) {
        res.status(404).json({ message: 'User is alredy exist' });
      }
    }
  });

  if (req.body.type === 't') {
    let newUser = {
      "name": req.body.name,
      "created": "0",
      "username": req.body.username,
      "followers": "0",
      "followings": "0"
    };
    teachers.push(newUser);
  } else {
    let newUser = {
      "name": req.body.name,
      "score": "0",
      "username": req.body.username,
      "followers": "0",
      "followings": "0"
    };
    students.push(newUser);
  }
  const newToken = {
      "username": req.body.username,
      "password": req.body.password,
      "type": req.body.type
  };
  tokens.push(newToken);
  res.status(201).json(newToken);
});

// login check
app.post('/login', (req, res) => {
  let token = {
    "username": req.body.username,
    "password": req.body.password,
    "type": req.body.type
  };

  tokens.forEach(element => {
    if (element.type === token.type) {
      if (element.username === token.username) {
        if (element.password === token.password) {
          return res.status(200).json(token);
        }
      }
    }
  });
  res.status(404).json({ message: 'User not found' });
});

// Add a new problem
app.post('/saveproblem', (req, res) => {
  let flag = true;
  problems.forEach(element => {
    if (element.title === req.body.Title) {
      flag = false;
      return res.status(404).json({ message: 'Problem name is alredy exist' });
    }
  });
  if (flag) {
    const newProblem = {
      "title" : req.body.Title,
      "content" : req.body.Content,
      "option_1" : req.body.Op1,
      "option_2" : req.body.Op2,
      "option_3" : req.body.Op3,
      "option_4" : req.body.Op4,
      "answer" : req.body.Answer,
      "difficulty" : req.body.Difficulty,
      "category" : req.body.Category,
      "author" : req.body.authContext,
      "solved" : "0"
    };
  
    problems.push(newProblem);
    res.status(201).json(newProblem);
  }
});

// Start the server
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});