# Pokédex

## Introduction

- Pokédex is a simple SPA that integrates [PokéAPI](https://pokeapi.co/) and a [custom API](pokedex-api.ondaniel.com.br) for complementar services, like removing unwanted pokémons
- This repo contains two main folders: `backend` and `frontend`, which defines independent applications

## Backend

### Backend archtecture

- Backend was developed using NodeJS and Typescript
- It uses ExpressJS as http server provider
- It was developd following SOLID principles
- Postgres is used as the main database and uses migrations to setup its tables
- Prettier, Eslint and Editorconfig are being used to keep the code following a good pattern
- PM2 is used to serve files in production mode
- Docker is used to create database container

### Backend folder structure

- The project is splitted into two main folders:
  - `Modules`: each folder inside holds files attached to an **entity** of the project. In this case, just the **RemovedPokemon** entity. They have the following structure:
    - `Infra`: all files related to external services, like **database** and **http server**
      - `Http`: stores controllers and routes using Express as external dependency
      - `TypeORM`: stores entities and repositories using TypeORM as external dependency
      - `Injections`: assign an external dependency to a ADT (Abstract Data Type). So a service will automatically use it when instantiated by using `container.resolve(Service)`. If we want to replace the dabatase, for example, we just need to create a new repository following the same ADT and register it on the injections folder
    - `Repositories`: ADTs for accessing entity repository
    - `Services`: the functional part of the code. Services are all functions we may want to access through the REST API
  - `Shared`: common files for all modules
- Whenever the client sends a request, the main flux consists on:
  - Route -> Controller -> Service, which can use repositories and other stuff to execute the desired functionality

### How to run backend

1. Go to the `backend` folder

2. Install project dependencies by running `npm install` or `yarn install`

3. Copy `docker-compose.yml` to a new `docker-compose.override.yml` file and fill it with the credentials that you want to create the containers. You may want to let with the same credentials of the example file for testing purposes.

4. Create and run docker containers by running `docker-compose -f docker-compose.override.yml up -d`

5. Copy `ormconfig.example.json` to a new `ormconfig.json` file and fill it with the same credentials that you have set up when creating the containers. If you have not changed your composer file, you don't have to change this one as well.

6. Create database tables by running `npm run typeorm migration:run` or `yarn typeorm migration:run`

7. Copy `.env.example` to a new `.env` file and fill it with the credentials that you want to.

8. Start backend on development mode by running `npm run dev` or `yarn dev`

### How to build and serve backend

1. Go to the `backend` folder

2. Generate `dist` folder by running `npm run build` or `yarn build`

3. Change your `ormconfig.json` file to use the files located on the `dist` folder:
   1. Just replace `src` by `dist` and `.ts` by `.js` on the `ormconfig.json` entries.

4. Start backend on production mode by running `yarn prod`

## Frontend

### Frontend archtecture

- Frontend was developed using ReactJS 18 and Typescript
- It uses [ChakraUI](https://chakra-ui.com/) as the main component provider
- It was developed following Atomic Design principles
- [PokéAPI](https://pokeapi.co/) is integrated to provide Pokémon info
- The backend is integrade as a custom API to provide complementar services
- React Context API is used instead of Redux to setup hooks and shared components
- Prettier, Eslint and Editorconfig are being used to keep the code following a good pattern

### Frontend folder strucure

- `public`: public HTML files
- `src`
  - `@Types`: data transfer objects and types in general
  - `Components`: splitted into `Atoms`, `Molecules` and `Organisms` as it follows Atomic Design principles. Organisms stores completely functional components. Molecules and Atoms components are focused to deliver just the UI strucuture, but oftenly implements simple functionalities as well
  - `Hooks`: custom hooks created using React Context API. Each one integrates functions and/or states that can be shared between all components
  - `Pages`: stores all the project pages, in this case, just the home
  - `Services`: setup all external APIs
  - `Styles`: setup [ChakraUI](https://chakra-ui.com/) style theme

### How to run frontend

1. Go to the `frontend` folder

2. Install project dependencies by running `npm install` or `yarn install`

3. Start frontend on development mode by running `npm run start` or `yarn start`
   1. Development mode will use backend on development mode as well, so you need backend running on `https://localhost:3000` to use its services
   2. If you want to run frontend locally but using the production API, you can do it by running `NODE_ENV=production yarn start` instead

### How to build and serve frontend

1. Go to the `frontend` folder

2. Generate `build` folder by running `npm run build` or `yarn build`

3. Serve static files using any server you want to
