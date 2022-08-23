var express = require('express');
var router = express.Router();
var users = require('./../inc/users')

router.use(function(req, res, next){

    if(['/login'].indexOf(req.url) === -1 && !req.session.user){
            res.redirect("/admin/login")
        }else{
            next();
        }

    console.log('middlewate: ', req.url)

    
})

router.get("/logout", function(req, res, next){

     delete req.session.user;

     res.redirect('/admin/login')

})

router.get('/', function(req, res, nex){


        res.render('admin/index')
    

});
router.get('/login', function(req, res, nex){

   users.render(req, res, null)

})
router.post('/login', function(req, res, nex){


    if(!req.body.email){
        users.render(req, res, "Preencha o email");
    }else if(!req.body.password){
        users.render(req, res, "preencha a senha")
    } else {
        users.login(req.body.email, req.body.password).then(user=>{
            req.session.user = user;

            res.redirect('/admin')

        }).catch(err=>{
            users.render(req, res, err.message || err)
        })
    }

})
router.get('/contacts', function(req, res, nex){

    res.render('admin/contacts')

})
router.get('/emails', function(req, res, nex){

    res.render('admin/emails')

})
router.get('/menus', function(req, res, nex){

    res.render('admin/menus')

})
router.get('/reservations', function(req, res, nex){

    res.render('admin/reservations', {
        date:{}
    })

})
router.get('/users', function(req, res, nex){

    res.render('admin/users')

})

module.exports = router;