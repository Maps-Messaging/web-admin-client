export GITHUB_TOKEN=$1
VERSION=$(cat package.json | grep -m 1 '"version":' | awk -F'"' '{print $4}')

export GITHUB_ORGANIZATION=Maps-Messaging
export GITHUB_REPO=web-admin-client
export VERSION_NAME=maps_web_client_$VERSION

sed -i "s/API_BASE_URL: 'http:\/\/localhost:8080'/API_BASE_URL: ''/" next.config.js

npm install --force || true
npm install orval || true
npm run generate
npm run build

if [ ! -d out ]; then
  echo "Build failed: 'out' directory not found."
  exit 1
fi
tar -cvzf webAdminClient.tgz out/*

# Delete the release from GitHub before creating a new one
echo "Deleting release from GitHub before creating a new one"
gh release delete ${VERSION_NAME} --repo ${GITHUB_ORGANIZATION}/${GITHUB_REPO} --yes || true
sleep 5

# Create a new release in GitHub
echo "Creating a new release in GitHub"
gh release create ${VERSION_NAME} --repo ${GITHUB_ORGANIZATION}/${GITHUB_REPO} --title "${VERSION_NAME}" --notes "Automated release ${VERSION_NAME}" --target main --draft

sleep 5

# Upload the artifacts to GitHub
echo "Uploading the artifacts to GitHub"
gh release upload ${VERSION_NAME} webAdminClient.tgz --repo ${GITHUB_ORGANIZATION}/${GITHUB_REPO} --clobber
gh release edit ${VERSION_NAME} --repo ${GITHUB_ORGANIZATION}/${GITHUB_REPO} --draft=false
