![](https://imgur.com/wCjXu2u.png)

# React Server Components Demo with Prisma

This is a fork of the official [React Server Components Demo](https://github.com/reactjs/server-components-demo). You can learn more about how Prisma and React Server Components fit together in this [video](https://youtu.be/ATBdP-Yfaec?t=1482).

Instead of sending raw SQL queries, this repo uses [Prisma](https://prisma.io) as an ORM to communicate with the database. This approach has a number of benefits:

- More intuitive querying (no SQL knowledge required)
- Better developer experience (e.g. through autocompletion)
- Safer database queries (e.g. prevents SQL injections)
- Easier to query relations
- Human-readable data model + generated (but customizable) SQL migration scripts

<table>
<tr>
<th> Prisma </th>
<th> SQL </th>
</tr>
<tr>
<td>

```js
// A database query sent with Prisma
const notes = prisma.note.findMany({
  where: {
    title: {
      contains: searchText,
    },
  },
});
```

</td>
<td>

```js
// A database query sent with plain SQL
const notes = db.query(
  `select * from notes 
      where title ilike $1 
      order by id desc`,
  ['%' + searchText + '%']
).rows;
```

</td>
</tr>
</table>

This demo also uses a plain [SQLite](https://www.sqlite.org/index.html) database file instead of requiring a PostgreSQL server. This enables you to explore the awesome benefits of Server Components without any additional setup.

## Usage

```bash
git clone git@github.com:prisma/server-components-demo.git
cd server-components-demo
npm install
npm start
```

This demo features an experimental package, [`react-prisma`](https://www.npmjs.com/package/react-prisma). You can see `react-prisma` in action in [`src/NoteList.server.js`](./src/NoteList.server.js).

## Switch to another database (e.g. PostgreSQL, MySQL, SQL Server)

If you want to try this example with another database than SQLite, you can adjust the the database connection in [`prisma/schema.prisma`](./prisma/schema.prisma) by reconfiguring the `datasource` block. 

Learn more about the different connection configurations in the [docs](https://www.prisma.io/docs/reference/database-reference/connection-urls).

<details><summary>Expand for an overview of example configurations with different databases</summary>

### PostgreSQL

For PostgreSQL, the connection URL has the following structure:

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
}
```

Here is an example connection string with a local PostgreSQL database:

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://janedoe:mypassword@localhost:5432/notesapi?schema=public"
}
```

### MySQL

For MySQL, the connection URL has the following structure:

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://USER:PASSWORD@HOST:PORT/DATABASE"
}
```

Here is an example connection string with a local MySQL database:

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://janedoe:mypassword@localhost:3306/notesapi"
}
```

### Microsoft SQL Server (Preview)

Here is an example connection string with a local Microsoft SQL Server database:

```prisma
datasource db {
  provider = "sqlserver"
  url      = "sqlserver://localhost:1433;initial catalog=sample;user=sa;password=mypassword;"
}
```

Because SQL Server is currently in [Preview](https://www.prisma.io/docs/about/releases#preview), you need to specify the `previewFeatures` on your `generator` block:

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["microsoftSqlServer"]
}
```

</details>

## Evolving the app

Prisma enables you to run migrations based on the declarative [Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema). Assume you want to add more functionality to the app and add a second table to the database to associate every note with an "author", here's the workflow that you can apply with Prisma.

First adjust the data model in [`prisma/schema.prisma`](./prisma/schema.prisma):

```diff
// prisma/schema.prisma

model Note {
   id        Int      @id @default(autoincrement())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   title     String?
   body      String?
+  author    User?    @relation(fields: [authorId], references: [id])
+  authorId  Int?
}

+model User {
+   id    Int     @id @default(autoincrement())
+   name  String?
+   email String  @unique
+   notes Note[]
+}
```

Then run the following command to create the new `User` table and its relation to the `Note` table in the database:

```
npx prisma migrate dev --preview-feature
```

You can now read and write data into the `User` table using Prisma as well:

```ts
// Create a new note
prisma.user.create({
  name: "Dan",
  email: "dan@facebook.com",
  notes: {
    create: {
      title: "I did not make ReactJS"
    }
  }
})

// Query all notes with their authors
prisma.note.findMany({
  include: {
    author: true
  }
})
```

## View and edit the data in Prisma Studio

[Prisma Studio](https://github.com/prisma/studio/) is a "database browser" that lets you view and edit the data in your database. You can either [download](https://github.com/prisma/studio/releases) it for your operating system or run the following command to run it in your browser:

```
npx prisma studio
```

Here's a screenshot of Prisma Studio that shows the [seeded](./scripts/seed.js) data:

![](https://imgur.com/TMha4N7.png)

## License

This demo is MIT licensed.
