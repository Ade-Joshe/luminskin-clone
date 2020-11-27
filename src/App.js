import './App.css';
import { Product } from './pages';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://pangaea-interviews.now.sh/api/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Product />
    </ApolloProvider>
  );
}

export default App;