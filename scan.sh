sonar-scanner \
        -Dsonar.projectKey=web-admin-client \
        -Dsonar.organization=maps-messaging \
        -Dsonar.sources=src \
        -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info \
        -Dsonar.host.url=https://sonarcloud.io \
        -Dsonar.login=$1
