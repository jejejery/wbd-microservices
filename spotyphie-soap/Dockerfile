FROM openjdk:8

WORKDIR /var/www/html/
COPY ./src/ ./src/
ENTRYPOINT ["java", "-jar", "./src/jar/artifacts/spotyphie_soap_jar/spotyphie-soap.jar"]