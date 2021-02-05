# Exchange project

This project uses Quarkus, the Supersonic Subatomic Java Framework.

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .


## Packaging and running the application

The application is packageable using `mvn clean package`.
It produces the executable `exchange-1.0-SNAPSHOT-runner.jar` file in `/target` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/lib` directory.

The application is now runnable using `java -jar target/exchange-1.0-SNAPSHOT-runner.jar`.

## Creating a native executable

A dockerfile was created for building a native executable. 

Execute `podman build -t $quay_registry/exchange:$version .` to build a native executable.


# Run with other services in local


Start your the history and currency microservices:

```
./scripts/start-local-services
```

In a different terminal, run

CURRENCY_SERVICE=localhost:8421 HISTORY_SERVICE=localhost:8422 ./mvnw compile quarkus:dev
## Tests

Unit

```
./mvnw verify
```

or

```
./mvnw verify -Dgroups="unit"
```

Integration

```
CURRENCY_SERVICE=localhost:8421 HISTORY_SERVICE=localhost:8422 ./mvnw verify -Dgroups="integration"
```

