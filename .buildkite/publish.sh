#!/bin/bash
#
# Copyright [ 2020 - 2024 ] [Matthew Buckton]
# Copyright [ 2024 - 2026 ] [Maps Messaging B.V.]
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

set -euo pipefail

buildkite-agent artifact download webAdminClient.tgz .

GITHUB_TOKEN="$(buildkite-agent secret get GIT_HUB_TOKEN)"
export GITHUB_TOKEN
VERSION=$(jq -r .version package.json)
GITHUB_REPO="Maps-Messaging/web-admin-client"

if [ "$BUILDKITE_BRANCH" == "main" ]; then
    echo "Detected Main branch. Preparing production release..."
    VERSION_NAME="maps_web_client_${VERSION}"
    TARGET_BRANCH="main"
elif [ "$BUILDKITE_BRANCH" == "development" ]; then
    echo "Detected Development branch. Preparing dev release..."
    VERSION_NAME="maps_web_client_dev"
    TARGET_BRANCH="development"
else
    echo "Branch $BUILDKITE_BRANCH is not main or development. Skipping GitHub release."
    exit 0
fi


echo "Deleting existing release '${VERSION_NAME}' from GitHub if it exists..."
gh release delete "${VERSION_NAME}" --repo "${GITHUB_REPO}" --yes || true
sleep 5

echo "Creating a new release for ${TARGET_BRANCH}..."
gh release create "${VERSION_NAME}" \
    --repo "${GITHUB_REPO}" \
    --title "${VERSION_NAME}" \
    --notes "Automated release ${VERSION_NAME} from branch ${BUILDKITE_BRANCH}" \
    --target "${TARGET_BRANCH}" \
    --draft

sleep 5

echo "Uploading webAdminClient.tgz to GitHub..."
gh release upload "${VERSION_NAME}" webAdminClient.tgz --repo "${GITHUB_REPO}" --clobber

echo "Publishing release..."
gh release edit "${VERSION_NAME}" --repo "${GITHUB_REPO}" --draft=false

echo "Release process complete!"
