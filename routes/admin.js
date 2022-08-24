var express = require('express');
var router = express.Router();
var admin = require("./../inc/admin");
var users = require('./../inc/users')
var menus = require('./../inc/menus')

router.use(function(req, res, next){

    if(['/login'].indexOf(req.url) === -1 && !req.session.users){
            res.redirect("/admin/login")
        }else{
            next();
        }

    console.log('middleware: ', req.url)

    
})

router.use(function(req, res, next){

    req.menus = admin.getMenus(req);

    next();

})

router.get("/logout", function(req, res, next){

     delete req.session.users;

     res.redirect('/admin/login')

})

router.get('/', function(req, res, nex){

        admin.dashboard().then(data=>{
            res.render('admin/index', admin.getParams(req, {
                data
            }))
        }).catch(err =>{
            console.error(err)
        })
       
    

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

    res.render('admin/contacts', admin.getParams(req))

})
router.get('/emails', function(req, res, nex){

    res.render('admin/emails', admin.getParams(req))

})
router.get('/menus', function(req, res, nex){

    menus.getMenus().then(data=>{
        res.render('admin/menus', admin.getParams(req, {
            data
        }))
    })

    

})

router.post('/menus', function(req, res, next){
    
    menus.save(req.fields, req.files).then(results=>{
        res.send(results);
    }).catch(err=>{
        res.send(err);
    })
})
router.get('/reservations', function(req, res, nex){

    res.render('admin/reservations', admin.getParams(req, {
        date:{}
    }))

})
router.get('/users', function(req, res, nex){

    res.render('admin/users', admin.getParams(req))

})

module.exports = router;