import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://api.github.com/graphql',
        headers: {
            authorization: 'Bearer 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',
        },
    }),
    cache: new InMemoryCache(),
});

export default client;