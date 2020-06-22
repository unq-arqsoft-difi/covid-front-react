#!/bin/bash

if [ "${TRAVIS_BRANCH}" = "master" ] && [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    echo "*** Set Up ssh keys ***"
    pushd .travis
    openssl aes-256-cbc -K $encrypted_1da259efee69_key -iv $encrypted_1da259efee69_iv -in deploy_key_difi_front.enc -out deploy_key_difi_front -d
    rm deploy_key_difi_front.enc
    chmod 600 deploy_key_difi_front
    mv deploy_key_difi_front ~/.ssh/id_rsa
    popd
else
    echo "Not setting ssh keys, since this branch isn't master or it's a Pull Request."
fi