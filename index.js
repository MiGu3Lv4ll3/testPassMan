const express = require('express')
const path = require('path')
const app  = express()


app.use(express.static(path.join(__dirname, "src")))

app.listen('4000', ()=>{
  console.log('=>Server on port 4000!!!');
})