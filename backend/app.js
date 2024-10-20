const connectToMongo = require("./db");
const express = require('express')
const app = express()
var cors = require('cors')
connectToMongo();
const port = process.env.PORT || 4000;

app.use(cors())
app.use(express.json())

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/Home', (req, res) => {
//   res.send('Home Page')
// })

// app.get('/ContactUs', (req, res) => {
//   res.send('Conatct us Page')
// })

// app.get('/user/1', (req, res) => {
//   res.send('User 1 Page')
// })

// app.get('/user/2', (req, res) => {
//   res.send('User 2 Page')
// })

app.listen(port, () => {
  console.log(`iNotebook app backend running at http://localhost:${port}`)
})