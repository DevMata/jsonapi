# BLOG JSON API

JSON API implemented with Typescript. Allows to manage anonymous blogs and their comments.

## Start

1. run `npm install`
2. restore database from database.sql file in project folder
3. Use .envexample as guide to connect to PostgreSQL
4. run `npm run compile`
5. run `npm run start`

## Considerations

- Endpoint of blogs is localhost:3000/blogs/:id
- Endpoint of comments is localhost:3000/blogs/:id/comments/:id

## API examples

> Examples of the usage of the API can be found as Postman documentation [here](https://documenter.getpostman.com/view/9673662/SWE3dfhr?version=latest#f47972f1-98c1-4d03-aa00-a39be370b152)
