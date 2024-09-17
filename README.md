#  TurnPoint Frontend Coding Challenge


## The Challenge
A client manager needs to be able to add a client to the database and then manage the list of clients. 
Basic client information includes:
* client name
* date of birth
* main and secondary languages
* primary “funding source”

Funding sources can only be chosen from the following: NDIS, HCP, CHSP, DVA, HACC

The App should be built using React and Typescript on the front end, with a Node/Express server. 
The data should be stored in a SQL database.

* [Getting Started](#Getting-Started)
* [Troubleshooting](#troubleshooting)
* [Assumptions](#Assumptions)
* [Decisions Made](#Decisions made)


## Getting Started
This will start both the client app and server, and will spin up a PostgreSQl database inside a docker container. 
Make sure you have docker installed on your computer before running the following.

* Run `npm install`
* Run `npm start`

## Troubleshooting
There are known issues with wait-for and certain versions of node. 
If the above script hangs or fails, run the following to get the project started.

### Start the server
* `cd server` and run `npm install`
* Start the docker image by running `docker-compose up`
* Migrate schema - `npm run prisma:migrate:dev && npm run prisma:generate`
* Finally, start the server - `node index.js`

### Start the front end
* `cd client` and run `npm install`
* start the client `npm start`


## Assumptions
* All fields are mandatory except for secondary language.
* Date of birth is a string - given more time I would create a date picker component with validation. 

## Decisions made
* Prisma: I chose to add prisma as a query builder to allow easier querying and typing.
* Tailwind: I added tailwind to speed up visual development so I could concentrate on the functionality. 
* Hard coding the prisma url - Normally this would go in an env variable but for this example I have hard coded it. 