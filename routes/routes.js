const {Router} = require('express')
const faker = require("../Faker/index")
const modelProductos = require('../models/productos')
const modelMensajes = require('../models/mensajes')
const auth = require ('../middlewares/auth')

const router = Router()


router.get('/', auth, async (req,res)=>{

    const items = await modelProductos.cargarProductos()
    const mensajes = await modelMensajes.cargarMensajes()
   
    // res.render('index', {items: items, mensajes: mensajes})   
    
    const {name} = req.session.user

    console.log('req.session.user: %o' , req.session.user)

    res.render('index' , { items: items, name: name, mensajes: mensajes})

})

router.get('/login', (req, res)=>{
    res.render('login' , {layout: 'login'})
})

router.post('/login' , (req, res)=>{
    const username = req.body.nombre

    req.session.user = { name: username }

    //res.render('index', {name: username})
    res.redirect('/')
})

router.post('/logout' , (req, res)=>{
    const username = req.session.user

    console.log('POST /logout ->req.body: %o' , req.body)

    //req.session.user = {name: username}

    res.render('logout', {name: username})
})

router.get('/logout', auth, (req, res)=>{
    const {name} = req.session.user

    console.log('router.get-> name: ' + name)
    req.session.destroy((err)=>{
        if(err){
            console.log(err.message)
            res.send('Hubo un error: ')
            return
        }
        res.render('logout', {layout: 'logout', name:name })
    })
})

router.get('/add', (req,res)=>{

    res.render('add')
})

router.post('/add', (req,res)=>{
    res.redirect('/')
})

router.get('/api/productos-test', (req,res)=>{

    const listaFake = faker.crearLista()
    res.render('faker', { listaFake: listaFake })
  })

  module.exports = router