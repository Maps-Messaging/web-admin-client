#
# Update the browser list
#
npx browserslist@latest --update-db

#
# Ensure all dependencies are installed
#
npm install || true

#
# Convert the openapi.json to functional typescript react queries
#
npm run generate || true

#
# build the client code
#
npm run build || true

#
# And, finally package it for deployment
#
npm run export || true
