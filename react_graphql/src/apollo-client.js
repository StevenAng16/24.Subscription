import {ApolloClient, InMemoryCache} from '@apollo/client'
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';


// Create an http link:
const httpLink = new HttpLink({
  uri: 'https://nice-jay-24.hasura.app/v1/graphql',
  headers : {
    'x-hasura-admin-secret' :
        'QchsgVIiFbztsTAHwnBi0GaVsdB1oyThpDHlaAjdpbMv4f4p00jZklL8pXl9JI26',
    },
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: 'wss://nice-jay-24.hasura.app/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers : {
            'x-hasura-admin-secret' :
                'QchsgVIiFbztsTAHwnBi0GaVsdB1oyThpDHlaAjdpbMv4f4p00jZklL8pXl9JI26',
            },
      }
    }
  });

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const splitLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
    uri : 'https://nice-jay-24.hasura.app/v1/graphql',
    cache : new InMemoryCache(),
    headers : {
        'x-hasura-admin-secret' :
            'QchsgVIiFbztsTAHwnBi0GaVsdB1oyThpDHlaAjdpbMv4f4p00jZklL8pXl9JI26',
    },
});

export default client