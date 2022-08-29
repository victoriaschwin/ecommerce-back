import express from "express";
import { DataTypes } from "sequelize";

import sequelize from "../loadSequelize.js";

const Factura = sequelize.define(
  "Factura",
  {
    numero: DataTypes.STRING,
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    poblacion: DataTypes.STRING,
    cpostal: DataTypes.STRING,
    fecha: DataTypes.DATEONLY,
  },
  { tableName: "facturas", timestamps: false }
);
const Articulo = sequelize.define('Articulo', {
  nombre: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  precio: DataTypes.FLOAT,
  stock: DataTypes.FLOAT

}, { tableName: 'articulos', timestamps: false });


const Linea = sequelize.define('Linea', {
  ArticuloId: {
      type: DataTypes.INTEGER,
      field: "ArticuloId",
      references: {
          model: Articulo,
          key: "id"
      }
  },
  FacturaId: {
      field: "FacturaId",
      type: DataTypes.INTEGER,
      references: {
          model: Factura,
          key: "id"
      }
  }
}, { tableName: 'lineas', timestamps: false });

Articulo.belongsToMany(Factura, {through: Linea});
Factura.belongsToMany(Articulo, {through: Linea});

const router = express.Router();

//Todas las facturas de todos los clientes
router.get("/", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Factura.findAll()
        .then((facturas) =>
          res.json({
            ok: true,
            data: facturas,
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

//Facturas del cliente
router.get("/:id", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Factura.findAll({where: {clienteid: req.params.id}, include: {model: Articulo}})
        .then((factura) =>
          res.json({
            ok: true,
            data: factura,
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

//Factura especifica de un cliente
router.get("/:id/:idf", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Factura.findOne({where: {clienteid: req.params.id, id: req.params.idf}, include: {model: Articulo}})
        .then((factura) =>
          res.json({
            ok: true,
            data: factura,
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
      Factura.create(req.body)
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

//Modifica la factura existente
router.put('/:id', function (req, res, next) {
  sequelize.sync().then(() => {
      Factura.findOne({ where: { id: req.params.id } })
          .then((factura) =>
              factura.update(req.body)
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
      Factura.destroy({ where: { id: req.params.id }, include: {model: Linea} })
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