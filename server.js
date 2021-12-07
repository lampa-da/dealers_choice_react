const path = require('path');
const express = require('express');
const app = express();
const {syncAndSeed} = require('./db')
module.exports = app

// Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Static file-serving middleware
app.use(express.static(path.join(__dirname, '.', 'public')))
app.use(express.static(path.join(__dirname, '.', 'dist')))
app.use(express.static(path.join(__dirname, '..', 'node_modules',  'css')))


// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard
app.use('/api', require('./api'))

// This middleware will catch any URLs resembling a file extension
// for example: .js, .html, .css
// This allows for proper 404s instead of the wildcard '#<{(|' catching
// URLs that bypass express.static because the given file does not exist.
app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).end()
  } else {
    next()
  }
})

// Sends our index.html (the "single page" of our SPA)
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'client', 'index.html')));

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/mock-1', (req, res, next) => {
  res.sendFile(path.join(__dirname, '.', 'public', 'shop-mock-1.html'))
})
const init = async()=>{
  try{
    await syncAndSeed()
    const port = process.env.PORT || 3030
    app.listen(port, ()=> console.log(`listening on port ${port}`))
  }
  catch(ex){
    console.log(ex)
  }
}
init()