import express from "express";
import { DataTypes } from "sequelize";

import sequelize from "../loadSequelize.js";

const Cliente = sequelize.define(
  "Cliente",
  {
    email: DataTypes.STRING,
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    poblacion: DataTypes.STRING,
    password: DataTypes.STRING,
    cpostal: DataTypes.STRING,
  },
  { tableName: "clientes", timestamps: false }
);

const router = express.Router();

router.get("/", function (req, res, next) {
  sequelize.sync().then(() => {
      Cliente.findAll()
        .then((clientes) =>
          res.json({
            ok: true,
            data: clientes,
          })
        )
        .catch((error) =>
          res.json({
            ok: false,
            error: error,
          })
        );
    })
    .catch((error) => {
      res.json({
        ok: false,
        error: error,
      });
    });
});

router.get("/:id", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Cliente.findOne({where: {id: req.params.id}})
        .then((clientes) =>
          res.json({
            ok: true,
            data: clientes,
          })
        )
        .catch((error) =>
          res.json({
            ok: false,
            error: error,
          })
        );
    })
    .catch((error) => {
      res.json({
        ok: false,
        error: error,
      });
    });
});

router.post('/', function (req, res, next) {
  sequelize.sync().then(() => {
      Cliente.create(req.body)
          .then((item) => item.save())
          .then((item) => res.json({ ok: true, data: item }))
          .catch((error) => res.json({ ok: false, error }))

  }).catch((error) => {
      res.json({
          ok: false,
          error: error
      })
  });
});

router.post('/login', function (req,res, next) {
  sequelize.sync().then(() => {
    console.log(req.body.email)
    Cliente.findOne({where: {email: req.body.email}})
      .then((item) => {
        console.log(item)
        if(item.password == req.body.password){
          res.json({ok: true, data: item})
        }else {
          res.json({ok: false,
          error: error})
        }
      })
        
      
  })
})

router.put('/:id', function (req, res, next) {
  sequelize.sync().then(() => {
      Cliente.findOne({ where: { id: req.params.id } })
          .then((cliente) =>
              cliente.update(req.body)
          )
          .then((ret) => res.json({
              ok: true,
              data: ret
          }))
          .catch(error => res.json({
              ok: false,
              error: error
          }));

  }).catch((error) => {
      res.json({
          ok: false,
          error: error
      })
  });
});

//Elimina factura por id de factura no de cliente.

router.delete('/:id', function (req, res, next) {

  sequelize.sync().then(() => {
      Cliente.destroy({ where: { id: req.params.id } })
          .then((data) => res.json({ ok: true, data }))
          .catch((error) => res.json({ ok: false, error }))

  }).catch((error) => {
      res.json({
          ok: false,
          error: error
      })
  });

});


export default router;