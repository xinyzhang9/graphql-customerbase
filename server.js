const express = require('express')
const expressGraphQL = require('express-graphql');
const app = express();

const schema = require('./schema');

app.use('/graphql',expressGraphQL({
  schema: schema,
  graphiql: true,
}))

app.listen(4000, ()=> {
  console.log(`server running on port 4000 ...`);
})
