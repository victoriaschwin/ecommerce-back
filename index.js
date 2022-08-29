import express from "express";
import cors from "cors";

import articulos from "./rutas/articulosRouter.js";
import clientes from "./rutas/clientesRouter.js";
import facturas from "./rutas/facturasRouter.js";
import indexRouter from "./rutas/indexRouter.js";
import lineas from './rutas/lineasRouter.js'

const app = express();

app.use(express.json());
app.use(cors())

app.use('/', indexRouter);
app.use('/api/articulos', articulos);
app.use('/api/clientes', clientes);
app.use('/api/facturas', facturas);
app.use('api/lineas', lineas)

const port = 5000
app.listen(port, () => console.log(`App listening on port ${port}!`))