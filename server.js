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
    "options" : {
        "0" : "Kendrick Lamar",
        "1" : "Nas",
        "2" : "Eminem",
        "3" : "Reza Pishro"
    },
    "answer" : "2",
    "difficulty" : "Easy",
    "category" : "music",
    "author" : "2"
  },
  {
    "title" : "boom",
    "content" : "Where was 2024 olympics held?",
    "options" : {
        "0" : "Iran",
        "1" : "Paris",
        "2" : "America",
        "3" : "Japan"
    },
    "answer" : "1",
    "difficulty" : "Medium",
    "category" : "sport",
    "author" : "5"
  }
]

// // READ - Get all problems
app.get('/problems', (req, res) => {
  res.json(problems);
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