d # Currency Exchange application

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



## Jenkins agents

To create Node.js agent,

```
oc process -f jenkins/jenkins-agent-template.yml  -p NAME=jenkins-agent-node-14 -p SOURCE_CONTEXT_DIR=jenkins/node14 SOURCE_REPOSITORY_REF=experiments | oc apply -f -
```

```
oc process -f jenkins/jenkins-agent-template.yml  -p NAME=jenkins-agent-python-3 -p SOURCE_CONTEXT_DIR=jenkins/python3 SOURCE_REPOSITORY_REF=experiments | oc apply -f -
```


## Deployments in stage environment

Project:

```
oc new-project rht-jramirez-exchange-stage

```

Allow Jenkins to deploy to this project:

```
oc policy add-role-to-user edit system:serviceaccount:rht-jramirez-jenkins:jenkins
```

Currency

```
oc new-app --name currency \
https://github.com/jramcast/devops-testing#experiments \
--context-dir=currency \
--strategy=docker

oc expose svc/currency
```


History

```
oc new-app --name history \
https://github.com/jramcast/devops-testing#experiments \
--context-dir=history \
--strategy=docker

oc expose svc/history
```


Exchange

```
oc new-app --name exchange \
https://github.com/jramcast/devops-testing#experiments \
--context-dir=exchange \
--strategy=docker

oc expose svc/exchange
```