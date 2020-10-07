const express = require("express");
const {
	graphqlHTTP
} = require("express-graphql");
const cors = require("cors");
const port = 4000;
const schema = require("../src/schema/schema");

const app = express();

app.post('/register', () => {});

app.post('/login', () => {});

app.use(cors());

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(port, () =>
	console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`)
);