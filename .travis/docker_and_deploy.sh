#!/bin/bash

if [ "${TRAVIS_BRANCH}" = "master" ] && [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    echo "*** Building Docker Containers ***"
    docker build -f docker/Dockerfile -t unqdifi/covid-front-react .

    echo "*** Pushing Docker Containers ***"
    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
    docker push unqdifi/covid-front-react:latest

    echo "*** Deploying on Server ***"
    echo "$SERVER_IP ecdsa-sha2-nistp256 $SERVER_KEY" >> ~/.ssh/known_hosts
    ssh $SERVER_USERNAME@$SERVER_IP "/home/$SERVER_USERNAME/difi-covid-deploy.sh"
else
    echo "Not deploying, since this branch isn't master or it's a Pull Request."
fi
