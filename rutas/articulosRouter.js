import express from "express";
import { DataTypes } from "sequelize";
import sequelize from "../loadSequelize.js";

const Articulo = sequelize.define(
  "Articulo",
  {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.FLOAT,
  },
  { tableName: "articulos", timestamps: false }
);

const router = express.Router();

router.get("/", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Articulo.findAll()
        .then((articulos) =>
          res.json({
            ok: true,
            data: articulos,
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
      Articulo.findOne({where: {id: req.params.id}})
        .then((articulos) =>
          res.json({
            ok: true,
            data: articulos,
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
      Articulo.create(req.body)
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

router.put('/:id', function (req, res, next) {
  sequelize.sync().then(() => {
      Articulo.findOne({ where: { id: req.params.id } })
          .then((articulo) =>
              articulo.update(req.body)
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


router.delete('/:id', function (req, res, next) {

  sequelize.sync().then(() => {
      Articulo.destroy({ where: { id: req.params.id } })
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