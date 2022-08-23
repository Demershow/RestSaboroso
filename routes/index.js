var conn = require ('./../inc/db');
var express = require('express');
var router = express.Router();
var menus = require('./../inc/menus')

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results=>{
    res.render('index.ejs', {
      title: 'Restaurante Saboroso!',
      menus: results,
      background: 'images/img_bg_1.jpg',
      isHome:true
     });
  })

  
});

router.get('/contacts', function(req, res, next){

  res.render('contacts',{
    title: 'contato - Restaurante Saboroso!',
    background: 'images/img_bg_3.jpg',
    h1: "Diga OI!",

  })

})
router.get('/menus', function(req, res, next){

  menus.getMenus().then(results =>{
    res.render('menus', {
      title: 'Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: "Saboreie os nossos menus!",
      menus:results,

    })
  
  })

 
})
router.get('/reservations', function(req, res, next){

  res.render('reservations', {
    title: 'Restaurante Saboroso!',
    background: 'images/img_bg_2.jpg',
    h1: "Reserve uma mesa!",

  })

})
router.get('/services', function(req, res, next){

  res.render('services', {
    title: 'Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: "Conheça nossos serviços!",

  })

})

module.exports = router;
