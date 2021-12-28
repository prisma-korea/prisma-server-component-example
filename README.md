# React Server Components + Prisma + React Router

This is a fork of the official [React Server Components Demo with Prisma](https://github.com/prisma/server-components-demo). You can learn more about how Prisma and React Server Components fit together in this [video](https://youtu.be/ATBdP-Yfaec?t=1482).

## Usage

1. Setup PostgreSQL database.
1. Set environment variables in `.env` file. See `.env.sample` for reference.
1. Install dependencies.
    ```shell
    npm i
    ```
1. Run database migration
    ```shell
    npx prisma migrate dev
    ```
1. Start server.
    ```shell
    npm start
    ```
1. Open http://localhost:4000 in browser.

## Note
Both React server components and `react-prisma` are in experimental stage.
Not recommended for production usage.

## License

This demo is MIT licensed.
