const router = require('express').Router()
const {models:{Product, Order, User}}=require('../db')


router.get('/orders', async(req, res, next)=>{
  try{
    res.send(await Order.findAll(
      {include: [Product, User]}
    ))
  }
  catch(ex){
    next(ex)
  }
})

router.get('/orders/:id', async(req, res, next)=>{
  try{
    res.send(await Order.findByPk(req.params.id, {include: [Product]}))
  }
  catch(ex){
    next(ex)
  }
})

router.get('/users', async(req, res, next)=>{
  try{
    res.send(await User.findAll({include: [Order]}))
  }
  catch(ex){
    next(ex)
  }
})
router.get('/users/:id', async(req, res, next)=>{
  try{
    res.send(await User.findByPk(req.params.id, {include: [Order]}))
  }
  catch(ex){
    next(ex)
  }
})

router.get('/products', async(req, res, next)=>{
  try{
    res.send(await Product.findAll())
  }
  catch(ex){
    next(ex)
  }
})

router.get('/products/:id', async(req, res, next)=>{
  try{
      res.send(await Product.findByPk(req.params.id))
  }
  catch(ex){
    next(ex)
  }
})

// router.post('/cats/:id/planing_route', async(req, res, next)=>{
//   try{
//       let planingRoute = await PlaningRoute.create({...req.body, catId: req.params.id})
//       planingRoute = await PlaningRoute.findByPk(planingRoute.id, {
//         include: [Planet]
//       })
//       res.send(planingRoute)
//   }
//   catch(ex){
//     next(ex)
//   }
// })


// router.get('/planing_routes', async(req, res, next)=> {
//   try {
//     res.send( await PlaningRoute.findAll());
//   }
//   catch(ex){
//     next(ex);
//   }
// });

// router.post('/planing_routes', async(req, res, next)=> {
//   try {
//     res.send(res.send( await PlaningRoute.create(req.body)));
//   }
//   catch(ex){
//     next(ex);
//   }
// });


// router.delete('/planing_routes/:id', async(req, res, next)=> {
//   try {
//     await PlaningRoute.destroy({ where: { id: req.params.id }});
//     res.sendStatus(204);
//   }
//   catch(ex){
//     next(ex);
//   }
// });

module.exports = router