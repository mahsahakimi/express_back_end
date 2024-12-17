const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const Problem = require("./models/Problem");
const Teacher = require("./models/Teacher");
const Student = require("./models/Student");
const Token = require("./models/Token");

const app = express();
app.use(cors());
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/express_backend", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Get all problems
app.get("/problems", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching problems", error: err });
  }
});

// Get all problems by author
app.get('/problems/:author', async (req, res) => {
  try {
    const author = req.params.author;
    const _problems = await Problem.find({ author });

    if (_problems.length === 0) {
      return res.status(404).json({ message: "No problems found for this author!" });
    }

    res.json(_problems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching problems by author", error: err });
  }
});


// Get a problem by title
app.get('/problems/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const problem = await Problem.findOne({ title });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found!" });
    }

    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: "Error fetching the problem", error: err });
  }
});


// Check problem answer
app.post('/problems/checkproblem/:username', async (req, res) => {
  try {
    const { Title, Answer } = req.body;
    const { username } = req.params;

    // Find the problem by title
    const problem = await Problem.findOne({ title: Title });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found!" });
    }

    // Compare the provided answer
    if (problem.answer !== Answer) {
      return res.json({ message: "False!" });
    }

    // Find the student by username
    const student = await Student.findOne({ username });
    if (!student) {
      return res.status(404).json({ message: "Student not found!" });
    }

    // Check if the problem has already been solved
    const alreadySolved = student.solved.includes(Title);
    if (alreadySolved) {
      return res.json({ message: "Problem already solved!" });
    }

    // Add the problem to the student's solved list
    student.solved.push(Title);
    await student.save();

    return res.json({ message: "Correct!" });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while checking the problem", error: err.message });
  }
});


// Get all teachers
app.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching teachers", error: err });
  }
});

// Get a teacher by username
app.get('/teachers/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Find the teacher by username
    const teacher = await Teacher.findOne({ username });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found!" });
    }

    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: "Error fetching the teacher", error: err.message });
  }
});


// Get all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err });
  }
});

// Get a student by username
app.get('/students/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Find the student by username
    const student = await Student.findOne({ username });

    if (!student) {
      return res.status(404).json({ message: "Student not found!" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching the student", error: err.message });
  }
});


// Get a student's solved problems by username
app.get('/students/:username/solved', async (req, res) => {
  try {
    const { username } = req.params;

    // Find the student by username
    const student = await Student.findOne({ username });
    if (!student) {
      return res.status(404).json({ message: "Student not found!" });
    }

    // Fetch solved problems from the Problem collection
    const solvedProblems = await Problem.find({ title: { $in: student.solved } });
    res.json(solvedProblems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching solved problems", error: err.message });
  }
});


app.put("/addsolved", async (req, res) => {
  try {
    const { username, problemTitle } = req.body;

    const student = await Student.findOne({ username });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.solved.push(problemTitle);
    await student.save();

    res.json({ message: "Problem added to solved list", student });
  } catch (err) {
    res.status(500).json({ message: "Error updating student", error: err });
  }
});

// Add a new user
app.post("/signup", async (req, res) => {
  try {
    const { name, username, type, password } = req.body;

    // Check if user exists
    const existingUser = await Token.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (type === "t") {
      const newTeacher = new Teacher({ name, created: 0, username, followers: 0, followings: 0 });
      await newTeacher.save();
    } else {
      const newStudent = new Student({ name, score: 0, username, followers: 0, followings: 0, solved: [] });
      await newStudent.save();
    }

    const newToken = new Token({ username, password, type });
    await newToken.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error signing up", error: err });
  }
});

// login check
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Token.findOne({ username, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.json({ message: "Login successful", type: user.type });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err });
  }
});

// Add a new problem
app.post("/saveproblem", async (req, res) => {
  try {
    const newProblem = new Problem({
      title: req.body.Title,
      content: req.body.Content,
      option_1: req.body.Op1,
      option_2: req.body.Op2,
      option_3: req.body.Op3,
      option_4: req.body.Op4,
      answer: req.body.Answer,
      difficulty: req.body.Difficulty,
      category: req.body.Category,
      author: req.body.authContext,
    });

    await newProblem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(500).json({ message: "Error saving problem", error: err });
  }
});

app.put("/updateproblem/:title", async (req, res) => {
  try {
    const { title } = req.params;

    const problem = await Problem.findOne({ title });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    problem.solved += 1;
    await problem.save();

    res.json({ message: "Problem solved count updated", problem });
  } catch (err) {
    res.status(500).json({ message: "Error updating problem", error: err });
  }
});

// Start the server
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});