#!/bin/bash

set -e

cd ../Common
yarn
rm -rf dist
yarn build

MICROSERVICES=(
    API
    AuthService
    UsersService
)

for i in ${MICROSERVICES[@]}; do
    cd ../${i}
    yarn
    yarn build
done