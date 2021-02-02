# Currency Exchange application

This application serves as an example of multi-service application. It consists of the following services:

- History
- Currency
- Exchange (Gateway)
- Frontend
- News

![Image of the application](imgs/app.png)


## Deployment

If you want to use the news endpoint, provide the `NEWS_ENABLED`
variable in the template.

Also note there is no `http://` in the `INGRESS_GW` parameter. Protocol
is added by the `frontend` application.

To deploy this application, execute:

```sh
oc process -f kubefiles/app-template.yml \
     -p EXCHANGE_GW=exchange-exchange.apps.example.com \
     -p NEWS_ENABLED=true \
     -p NEWS_ENDPOINT=url \
     | oc create -f -
```

To delete this application, execute:

```sh
oc delete all -l template=exchange
```


# Jenkins agent

To create Node.js agent,

```
oc process -f jenkins/jenkins-agent-template.yml  -p NAME=jenkins-agent-node-14 -p SOURCE_CONTEXT_DIR=jenkins/node14 SOURCE_REPOSITORY_REF=experiments | oc apply -f -
```