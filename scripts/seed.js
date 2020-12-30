/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const path = require('path');
const {readdir, unlink, writeFile} = require('fs/promises');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const NOTES_PATH = './notes';
const seedData = [
  {
    title: 'Meeting Notes',
    body: 'This is an example note. It contains **Markdown**!',
  },
  {
    title: 'Make a thing',
    body: `It's very easy to make some words **bold** and other words *italic* with
Markdown. You can even [link to React's website!](https://www.reactjs.org).`,
  },
  {
    title:
      'A note with a very long title because sometimes you need more words',
    body: `You can write all kinds of [amazing](https://en.wikipedia.org/wiki/The_Amazing)
notes in this app! These note live on the server in the \`notes\` folder.

![This app is powered by React](https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/React_Native_Logo.png/800px-React_Native_Logo.png)`,
  },
  {title: 'I wrote this note today', body: 'It was an excellent note.'},
];

async function seed() {
  await prisma.note.deleteMany();
  const res = await Promise.all(
    seedData.map((data) => prisma.note.create({data}))
  );

  const oldNotes = await readdir(path.resolve(NOTES_PATH));
  await Promise.all(
    oldNotes
      .filter((filename) => filename.endsWith('.md'))
      .map((filename) => unlink(path.resolve(NOTES_PATH, filename)))
  );

  await Promise.all(
    res.map(({id, body}) => {
      const data = new Uint8Array(Buffer.from(body));
      return writeFile(path.resolve(NOTES_PATH, `${id}.md`), data, (err) => {
        if (err) {
          throw err;
        }
      });
    })
  );
  prisma.$disconnect();
}

seed();
