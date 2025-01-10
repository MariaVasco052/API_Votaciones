const express = require('express');
const cors = require('cors');
const app = express();
const votantesRoutes = require('./routes/votantesRoutes.js');
const votosRoutes = require('./routes/votosRoutes.js');
const candidatosRoutes = require('./routes/candidatosRoutes.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hola Bienvenidos al Sistema de Votacion');
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/votantes", votantesRoutes);
app.use("/votos", votosRoutes);
app.use("/candidatos", candidatosRoutes);

app.listen(6500, () => {
    console.log('Servidor activo'),
    console.log('Documentación Swagger disponible en http://localhost:6500/api-docs');
});

