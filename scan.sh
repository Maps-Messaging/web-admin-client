npm install -g sonar-scanner
sonar-scanner \
        -Dsonar.projectKey=web-admin-client \
        -Dsonar.organization=mapsmessaging.io \
        -Dsonar.sources=src \
        -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info \
        -Dsonar.host.url=https://sonarcloud.io \
        -Dsonar.login=$1
