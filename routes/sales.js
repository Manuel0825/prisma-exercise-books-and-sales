const express = require("express");
const router = express.Router();
const prisma = require('../prisma');

router.get("/", async (req, res) => {
    try {
      const allSales = await prisma.venta.findMany();
      res.json(allSales);
    } catch (error) {
      res.json("Server error");
    }
  });

  

    router.get("/book/:isbn", async (req, res) => {
        const salesIsbn = await prisma.venta.findMany({
          where: {
            ISBN: req.params.isbn
          },
        });
        try {
          res.json(salesIsbn);
        } catch (error) {
          res.json("Server error");
        }
      });

      router.get("/date/:date", async (req, res) => {
        const newDate = await prisma.venta.findMany({
          where: {
            Fecha_Venta: new Date(req.params.date)
          },
        });
        try {
          res.json(newDate);
        } catch (error) {
          res.json("Server error");
        }
      });
      router.get("/sales/top", async (req, res) => {
        try {
          const combineTablesIsbn = await prisma.venta.findMany({
            include: {
             Libro: {
              select: {
                Autor: true,
                Titulo: true,
                Precio: true,
              }
             }
            },
          });
          res.json(combineTablesIsbn);
        } catch (error) {
          res.json("Server Error");
        }
      });


      
      router.get("/:id", async (req, res) => {
        const bookIsbn = await prisma.venta.findUnique({
          where: {
          ID_Venta: Number(req.params.id)
          },
          });
          try{
           res.json(bookIsbn)
          }
            catch (error) {
              res.json("Server error");
            }
          
        });



module.exports = router;
