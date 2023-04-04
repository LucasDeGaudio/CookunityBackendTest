# Challenge Cookunity

### Application:

This application provides information about an IP address and provides statistics on the use of the service.

### Requirements:

- NodeJS >= 16.14 (tested in 16.14)
- Docker (tested in 4.15.0 )

### Considerations before running the application:

The application runs on port 8000. You can modify the port binding in the `docker-compose.yml` file.

Redis runs on port 6379 (the port is bound to the host port in case you want to inspect the db from a client, but it's not necessary for the app to work). If there is a conflict, modify or remove the port in the `docker-compose.yml` file (`ports` property in redis section).

A Volume is used so that the Redis information is persisted. A `data` folder will be created when the container is built (in the project directory).

### Steps to run:

1. Clone the repository locally: `git clone https://github.com/LucasDeGaudio/CookunityBackendTest`
2. Go to the project directory: `cd CookunityBackendTest`
3. Run the `npm run dev` command
4. When finished, you can verify that the containers are running with the `docker ps` command
5. Open a browser window and go to the API documentation `http://localhost:8000/docs`

### Useful commands:

To view the application logs, use `docker logs cookunity_app`. Note: `cookunity_app` is the name that Docker will use for the container that runs the application, if the command does not work, find out the id or name of the container using `docker ps` and replace in the command `docker logs <containerId|containerName> `.

### Application:

The application is made up of an API and an in-memory database [REDIS].

The API is developed in Typescript, using express.

Redis is used to store information about the invocations to the service (to generate the statistics).

### Documentation:

The application is documented with Swagger, to enter open the browser with the following route `http://localhost:8000/docs`

### Testing:

1. Run the `npm i` command
2. Run the `npm run test` command

The application has the following coverage tresholds percentage:

- branches: 90
- functions: 90
- lines: 90
- statements: 90
