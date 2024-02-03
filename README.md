# nestjs-microservices

nestjs microservices project

# config

yarn add @nestjs/config
nest g module config -p common (wrapper around config module)
yarn add joi => for config schema validation (.env)

# monorepo

nest g library common
nest g module database -p common

# mongodb

yarn add @nestjs/mongoose mongoose

# set up the ms

nest g app reservations
nest g resource reservations (project: default, transport layer: REST, generate CRUD: yes)
nest g module logger
nest g app auth
nest g module users > auth
nest g controller users > auth
nest g app payments

# validation

yarn add class-validator class-transformer

# request logging automatically

yarn add nestjs-pino pino-http pino-pretty

# auth

yarn add @nestjs/passport passport passport-local
yarn add -D @types/passport-local
yarn add @nestjs/jwt passport-jwt
yarn add -D @types/passport-jwt
yarn add bcryptjs express (bcryptjs for issue with docker mounting, express for required types for cookie)
yarn add -D @types/bcryptjs
yarn add cookie-parser
yarn add -D @types/cookie-parser

# ms communication

yarn add @nestjs/microservices (transport options, support networking between ms - we use standard tcp based transport layer to connect ms together)

# docker devcontainer

This project I only use a basic devcontainer Dockerfile to be able to run npm/nest without installing it locally and have some VSCode extensions.

# docker

The monorepo project now runs via the various dockerfiles and the docker-compose at the root.

cd apps/reservations:

- docker build ../../ -f Dockerfile -t sleepr_reservations

- ../../ is context where to run build from (run it from root, so you can copy over libs dir etc)
- -f Dockerfile = context path (curr dir)

- docker run sleepr_reservations

# docker-compose

In new terminal (WSL), outside of vscode:

- cd gitPersonal/nodejs/nestjs/nestjs-microservices/sleepr
- docker-compose up
  (this way mongodb extension is currently not working in vs code - maybe re-add the network!)

# stripe

https://dashboard.stripe.com/test/dashboard
get the developer key from the dashboard

yarn add stripe

# production

Create separate package.json files for each app, with only the dependencies these need.
yarn addnit per project

# rabbitmq

yarn add amqplib amqp-connection-manager
