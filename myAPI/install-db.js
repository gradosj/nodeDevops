'use strict';

const conn = require('./lib/connectMongoose');
const Anuncio = require('./models/anuncios');

console.log('control1'); 
conn.once('open', async () => {
    try {
        await initAnuncios();
        conn.close();
    } catch(err){
        console.error('hubo un error: ', err);
        process.exit(2);
    }
    
});

console.log('control2'); 

async function initAnuncios() {
    await Anuncio.deleteMany();
    await Anuncio.insertMany([
    {   
        nombre: 'bicicleta',
        venta: true,            
        precio: 200,
        foto: 'bici.jpg',
        tags: ['lifestyle', 'motor']
    },

    {   
        nombre: 'iphone',
        venta: true,            
        precio: 500,
        foto: 'iphone.jpg',
        tags: ['lifestyle', 'motor']
    },
    {   
        nombre: 'Pantalla',
        venta: false,            
        precio: 50,
        foto: 'pantalla.jpg',
        tags: ['lifestyle', 'motor']
    },

    ]);

}