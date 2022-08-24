import express from 'express';
import { DataTypes } from "sequelize";

import sequelize from "../loadSequelize.js";

const Cliente = sequelize.define('Cliente', {

    email: DataTypes.STRING,
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    poblacion: DataTypes.STRING,
    password: DataTypes.STRING,
    cpostal: DataTypes.STRING,

},{ tableName: 'clientes', timestamps: false});

const router = express.Router();

router.get('/', function (req, res, next){

      sequelize.sync().then(()=>{
        Cliente.findAll()
        .then()
      })
})