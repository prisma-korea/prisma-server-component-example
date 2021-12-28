const express = require('express');
const {PrismaClient} = require('@prisma/client');
const {handleErrors} = require('./helpers.server');

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  '/',
  handleErrors(async (req, res) => {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    });

    res.send({post});
  })
);

router.put(
  '/:id',
  handleErrors(async (req, res) => {
    const post = await prisma.post.update({
      where: {id: req.params.id},
      data: req.body,
    });

    res.send({post});
  })
);

router.delete(
  '/:id',
  handleErrors(async (req, res) => {
    const post = await prisma.post.delete({where: {id: req.params.id}});

    res.send({post});
  })
);

module.exports = router;
