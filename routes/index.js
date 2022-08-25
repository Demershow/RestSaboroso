var conn = require ('./../inc/db');
var express = require('express');
var router = express.Router();
var menus = require('./../inc/menus')
var reservations = require ('./../inc/reservations');
const contacts = require('../inc/contacts');
var email = require('./../inc/email.js')

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

  contacts.render(req, res);

})

router.post('/contacts', function(req, res, next){

  if (!req.body.name){
    contacts.render(req, res, "Insira o nome!")
  } else if (!req.body.email){
    contacts.render(req, res, "Insira o Email!")
  } else if (!req.body.message){
    contacts.render(req, res, "Insira a mesnagem!")
  } else {
    contacts.save(req.body).then(results=>{

      req.body = {};

      contacts.render(req, res, null, 'Mensagem enviada!')
    }).catch(err=>{
      contacts.render(req, res, err.message)
    })

  }
  
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

  reservations.render(req, res)

})

router.post('/reservations', function(req, res, next){

  if (!req.body.name){
    reservations.render(req, res, "Insira o nome!")
  } else if (!req.body.email){
    reservations.render(req, res, "Insira o Email!")
  } else if (!req.body.people){
    reservations.render(req, res, "Insira o numero de pessoas!")
  } else if (!req.body.date){
    reservations.render(req, res, "Insira a data!")
  } else if (!req.body.time){
    reservations.render(req, res, "Insira a hora!")
  } else {
    reservations.save(req.body).then(results=>{

      req.body = {};

      reservations.render(req, res, null, 'Reserva realizada com sucesso')
    }).catch(err=>{
      reservations.render(req, res, err.message)
    })

  }
  
  })
router.get('/services', function(req, res, next){

  res.render('services', {
    title: 'Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: "Conheça nossos serviços!",

  })

})

router.post("/subscribe", function(req, res, next){
  email.save(req).then(results=>{

    res.send(results);
    
  }).catch(err=>{
      res.send(err);
  });
});

module.exports = router;
