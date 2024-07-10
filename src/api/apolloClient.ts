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