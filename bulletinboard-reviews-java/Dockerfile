FROM sapmachine:jdk-ubuntu-17.0.8
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
