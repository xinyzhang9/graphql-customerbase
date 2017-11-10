const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const axios = require('axios');

// const customers = [
//   {id: '1', name: 'Xinyang', email:'xinyang@gmail.com', age: 20},
//   {id: '2', name: 'Mike', email:'mike@gmail.com', age: 25},
//   {id: '3', name: 'John', email:'john@gmail.com', age: 32},
// ];

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    email: { type: GraphQLString},
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        // return customers.find((x) => x.id === args.id);
        return axios.get('http://localhost:3000/customers/'+args.id)
          .then( res => res.data );
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/customers/')
          .then( res => res.data );
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
