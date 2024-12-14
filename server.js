const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());

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
    "author" : "emma2000",
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
    "author" : "5",
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
    "author" : "1",
    "solved" : "30"
  }
];

// Get all problems
app.get('/problems', (req, res) => {
  res.json(problems);
});

// Get a problem by name
app.get('/problems/:title', (req, res) => {
  const problem = problems.find(element => element.title === req.params.title);
  if (!problem) {
    return res.status(404).json({message: "Problem not found!"})
  }
  res.json(problem);
});


let teachers = [
  {
    "name" : "Emma Williams",
    "created" : "13",
    "username" : "emma2000"    
  },
  {
    "name" : "John Doe",
    "created" : "2",
    "username" : "johndoe"
  },
  {
    "name" : "Jane Smith",
    "created" : "0",
    "username" : "janeee"
  },
  {
    "name" : "Alex Johnson",
    "created" : "5",
    "username" : "alexjj"
  }
];

// Get all teachers
app.get('/teachers', (req, res) => {
  res.json(teachers);
});

let students = [
  {
    "name" : "Mehdi Amini",
    "score" : "36",
    "username" : "mehdiii",
    "followers" : "1",
    "followings" : "1"
  },
  {
    "name" : "Sahar Almasi",
    "score" : "97",
    "username" : "almasi83",
    "followers" : "0",
    "followings" : "2"
  },
  {
    "name" : "Misagh Rasoli",
    "score" : "0",
    "username" : "mis4gh",
    "followers" : "2",
    "followings" : "0"
  }
];

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

// app.post('/signup', (req, res) => {
//   console.log(req.message);
// });

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

// Add a new user
app.put('/signup', (req, res) => {
  tokens.forEach(element => {
    if (element.type === req.body.type) {
      if (element.username === req.body.username) {
        res.status(404).json({ message: 'User is alredy exist' });
      }
    }
  });

  if (req.body.type === 't') {
    let newUser = {
      "name": req.body.username,
      "created": "0",
      "username": req.body.username
    };
    teachers.push(newUser);
  } else {
    let newUser = {
      "name": req.body.username,
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

// Start the server
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});