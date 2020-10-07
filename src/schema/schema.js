const Posts = require('../data/posts');
const Authors = require('../data/authors');

const {
	GraphQLString,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema,
} = require("graphql");

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		name: {
			type: new GraphQLNonNull(GraphQLString)
		},
	})
});

const PostType = new GraphQLObjectType({
	name: "Post",
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		title: {
			type: new GraphQLNonNull(GraphQLString)
		},
		description: {
			type: GraphQLString
		},
		date: {
			type: GraphQLString
		},
		author: {
			type: AuthorType,
			resolve: function (post) {
				return Authors.find(author => author.id === post.author_id)
			}
		},
	}),
});

const BlogQueryRootType = new GraphQLObjectType({
	name: "BlogAppSchema",
	fields: () => ({
		authors: {
			type: new GraphQLList(AuthorType),
			resolve: function () {
				return Authors
			}
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve: function () {
				return Posts;
			},
		},
	}),
});

const BlogAppSchema = new GraphQLSchema({
	query: BlogQueryRootType,
});

module.exports = BlogAppSchema;