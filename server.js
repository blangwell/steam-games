const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  // __dirname is an environment var that gets dir
  // the current file is within, sendFile sends an
  // entire static file
  res.sendFile(__dirname + '/index.html')

})

app.listen(8080, () => {
  console.log(`👂 on port 8080`)
})