const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const users = [
	{ id: '23', firstName: 'Bill', lastName: 'Simmons', email: 'bs@gmail.com', companyId: '1' },
	{ id: '47', firstName: 'Samantha', lastName: 'Smith', email: 'ss@gmail.com', companyId: '2' },
	{ id: '12', firstName: 'Kyle', lastName: 'Hagler', email: 'kylehagler@gmail.com', companyId: '2' }
];

const companies = [{ id: '1', name: 'Apple', description: 'lorem' }, { id: '2', name: 'Google', description: 'lorem' }];

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		email: { type: GraphQLString }
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return _.find(users, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
