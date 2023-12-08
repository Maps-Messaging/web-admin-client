 module.exports = {
     'dojomanagement-file-transfomer': {
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