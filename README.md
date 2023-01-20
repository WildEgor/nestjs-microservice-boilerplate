## Description

## CICD
Add content of your .env to APP_ENV github secret - for docker build.
Add personal github token to NPM_TOKEN github secret - access to custom libs.
For docker add DOCKERHUB_USERNAME, DOCKERHUB_TOKEN, DOCKER_REGISTRY, IMAGE_NAME and IMAGE_TAG.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
