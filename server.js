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

// // READ - Get all teachers
app.get('/teachers', (req, res) => {
  res.json(teachers);
});

let students = [
  {
    "name" : "Mehdi Amini",
    "score" : "36",
    "username" : "mehdiii"    
  },
  {
    "name" : "Sahar Almasi",
    "score" : "97",
    "username" : "almasi83"
  },
  {
    "name" : "Misagh Rasoli",
    "score" : "0",
    "username" : "mis4gh"
  }
];

// // READ - Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// // app.use('/login', (req, res) => {
// //     res.send({
// //       token: 'test123'
// //     });
// //   });

// //   app.get('/add/:a/:b', (req, res) => {
// //     // res.send('<h1>Hello!</h1>');
// //     res.json({'ans' : 5});
// //   })

const PORT = 8081;
// app.listen(PORT, () => console.log('API is running on http://localhost:' + PROT + '/login'));
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});