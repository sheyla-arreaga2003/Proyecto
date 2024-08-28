const express = require ('express');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./routes/usuario');
const categoriaProductoRoutes = require('./routes/categoria');
const estadoRoutes = require('./routes/estado')
const ordenRoutes = require('./routes/orden');
const ordenDetalleRoutes = require('./routes/ordenDetalle');
const productoRoutes = require('./routes/producto');
const sequelize = require ('./config/db');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res)=> {
    res.send("hello word")
})


//rutas
app.use('/api', usuarioRoutes);
app.use('/api', categoriaProductoRoutes);
app.use('/api', estadoRoutes);
app.use('/api', ordenRoutes);
app.use('/api', ordenDetalleRoutes);
app.use('/api', productoRoutes);



app.get('/db-test', (req, res) => {
    try {
      sequelize.authenticate();
      console.log('authenticado')
     res.send('db-test connection')
    } catch (error) {
      console.log('no authenticado')
      
    }
  })
app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
    })