# nestjs-microservices

nestjs microservices project

# config

npm i @nestjs/config
nest g module config -p common (wrapper around config module)
npm i joi => for config schema validation (.env)

# monorepo

nest g library common
nest g module database -p common

# mongodb

npm i @nestjs/mongoose mongoose

# set up the ms

nest g app reservations
nest g resource reservations (project: default, transport layer: REST, generate CRUD: yes)

# validation

npm i class-validator class-transformer

# request logging automatically

npm i nestjs-pino pino-http pino-pretty
