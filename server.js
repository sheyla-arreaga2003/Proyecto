const express = require ('express');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./routes/usuario');
const categoriaProductoRoutes = require('./routes/categoria');
const estadoRoutes = require('./routes/estado')
const ordenRoutes = require('./routes/orden');
const ordenDetalleRoutes = require('./routes/ordenDetalle');
const productoRoutes = require('./routes/producto');
const authRoutes  = require('./routes/auth');
const sequelize = require ('./config/db');
const authenticateToken = require('./middlewares/auth');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res)=> {
    res.send("hello word")
})


//rutas encriptar
app.use('/api/auth', authRoutes)
app.use('/api', authenticateToken,usuarioRoutes);
app.use('/api',authenticateToken, categoriaProductoRoutes);
app.use('/api', authenticateToken,estadoRoutes);
app.use('/api',authenticateToken, ordenRoutes);
app.use('/api', authenticateToken,ordenDetalleRoutes);
app.use('/api', authenticateToken,productoRoutes);


//prueba para conexion de base de datos
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