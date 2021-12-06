const {syncAndSeed, models: {Product, Order, User}, conn} = require('./db')
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));  
app.use('/api', require('./api'))

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