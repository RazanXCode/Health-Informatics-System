# Monthly Project: MediTrust - Dockerized

## Objective
This project demonstrates how to containerize a .NET-based application using Docker. It includes setting up a Dockerfile, building the image, and running the application inside a Docker container.
### Docker Setup
### Dockerfile
* Contains instructions to build a Docker image for the project.
* Installs dependencies and configures the environment to run the application.
###  Build Instructions
1. Open a terminal and navigate to the root of your project.
2. Build the Docker image:
   * docker build -t hisbackend:v1 -f Backend/HISBackend/Dockerfile .

###  Run Instructions
1. Run the Docker container:
   * docker run -d -p 8080:80 --name hisbackend-container hisbackend:v1
###  Verification
* Once the container is running, visit your application at:
 http://localhost:8080

### Docker Hub Image
You can pull and run the Docker image from Docker Hub using the link below:
* [Visit Docker Hub](https://hub.docker.com/r/raghadalahmadi/hisbackend/tags)


  
     



