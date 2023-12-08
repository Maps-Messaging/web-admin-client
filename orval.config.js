 module.exports = {
     'maps-messaging-file-transfomer': {
         output: {
             mode: 'tags-split',
             target: './src/generated/mapsServer.ts',
             schemas: './src/generated/model',
             client: 'react-query',
             mock: false,
             override: {
                 query: {
                     useQuery: true,
                     options: {
                         staleTime: 30000,
                     },
                 },
             },
         },
         input: {
             target: './resources/openapi.json',
         },
     },
 };