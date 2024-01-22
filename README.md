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
