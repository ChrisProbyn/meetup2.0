import ApolloClient from "apollo-boost";

const apolloClient = new ApolloClient({
  uri: "http://192.168.1.68:4000/graphql"
 });
 
 export default apolloClient;