'use strict';

const conn = require('./lib/connectMongoose');
const Anuncio = require('./models/anuncios');


conn.once('open', async () => {
    try {
        await initAnuncios();
        conn.close();
    } catch(err){
        console.error('hubo un error: ', err);
        process.exit(2);
    }
    
});



async function initAnuncios() {
    await Anuncio.deleteMany();
    await Anuncio.insertMany([
    {   
        nombre: 'bicicleta',
        venta: true,            
        precio: 200,
        foto: '/images/motor.jpg',
        tags: ['lifestyle', 'motor']
    },

    {   
        nombre: 'iphone',
        venta: true,            
        precio: 500,
        foto: '/images/mobile.jpg',
        tags: ['lifestyle', 'mobile']
    },
    {   
        nombre: 'pantalla',
        venta: false,            
        precio: 150,
        foto: '/images/work.jpg',
        tags: ['work']
    },
    {   
        nombre: 'mascarilla',
        venta: false,            
        precio: 0.50,
        foto: '/images/work.jpg',
        tags: ['lifestyle', 'mobile']
    },
    {   
        nombre: 'sudadera',
        venta: false,            
        precio: 10,
        foto: '/images/lifestyle.jpg',
        tags: ['lifestyle']
    },

    ]);

}