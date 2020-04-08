FROM armv7/armhf-java8

ADD var/lib/jenkins/workspace/bookstore/bookstore/target/bookstore-0.0.1-SNAPSHOT.jar /opt/bookstore-0.0.1-SNAPSHOT.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "/opt/bookstore-0.0.1-SNAPSHOT.jar"]
