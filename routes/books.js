const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/", async (req, res) => {
  try {
    const Books = await prisma.libro.findMany();
    res.json(Books);
  } catch (error) {
    res.json("Server error");
  }
});


router.get("/author/:author", async (req, res) => {
  const author = await prisma.libro.findMany({
    where: {
      Autor: req.params.author,
    },
  });
  try {
    res.json(author);
  } catch (error) {
    res.json("Server error");
  }
});

router.get("/price/:price", async (req, res) => {
  const price = await prisma.libro.findMany({
    where: {
      Precio: {
        gte: Number(req.params.price),
      },
    },
  });
  try {
    res.json(price);
  } catch (error) {
    res.json("Server error");
  }
});

router.get("/with-sales", async (req, res) => {
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

router.get("/:isbn", async (req, res) => {
  const bookIsbn = await prisma.libro.findUnique({
    where: {
      ISBN: req.params.isbn,
    },
  });
  try {
    res.json(bookIsbn);
  } catch (error) {
    res.json("Server error");
  }
});


module.exports = router;
