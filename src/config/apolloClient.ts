import { API_URL } from "@/actions/actions";
import { ApolloClient, InMemoryCache } from "@apollo/client";


const apolloClient = new ApolloClient({
  uri: `${API_URL}/graphql`,
  //uri: `http://localhost:8084/graphql`,
  cache: new InMemoryCache(),
});

export default apolloClient;
