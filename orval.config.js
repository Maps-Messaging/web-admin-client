module.exports = {
    'maps-admin-client-file-transfomer': {
        output: {
            mode: 'tags-split',
            target: './src/generated/mapsmessaging.ts',
            schemas: './src/generated/model',
            client: 'react-query',
            mock: false,
            override: {
                query: {
                    useQuery: true,
                    options: {
                        staleTime: 5000,
                    },
                },
            },
        },
        input: {
            target: './resources/openapi.json',
        },
    },
};
