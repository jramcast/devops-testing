# Currency Exchange application

This application serves as an example for the [DevOps Testing webminar](https://www.redhat.com/en/events/webinar/devops-testing-building-an-automated-test-driven-workflow-for-development-and-continuous-integration) demo.

- Frontend
- Exchange (Gateway)
- History
- Currency


## Install Jenkins on OpenShift

You must install Jenkins on OpenShift.

Create a project for the Jenkins deployment:

```
oc new-project YOUR-JENKINS-PROJECT
```

Create a new Jenkins application using the `jenkins-ephemeral`  template.

```
oc new-app openshift/jenkins-ephemeral -p MEMORY_LIMIT=2048Mi
```

> The `jenkins-ephemeral`  template does not persist data. 
If you restart the Jenkins pod, you will lose data.
Use the `jenkins-persistent`  template to persist your Jenkins data.



## Jenkins agents


This demo uses Jenkins on OpenShift, which requires Jenkins Agents to run specific runtimes.

To create Node.js agent, run:

```
oc process -f jenkins/jenkins-agent-template.yml  -p NAME=jenkins-agent-node-14 -p SOURCE_CONTEXT_DIR=jenkins/node14 | oc apply -f -
```

For the Python agent, run:

```
oc process -f jenkins/jenkins-agent-template.yml  -p NAME=jenkins-agent-python-3 -p SOURCE_CONTEXT_DIR=jenkins/python3 | oc apply -f -
```

For Cypress:

```
oc process -f jenkins/jenkins-agent-template.yml  -p NAME=jenkins-agent-cypress -p SOURCE_CONTEXT_DIR=jenkins/cypress | oc apply -f -
```


## Deployments in a test environment (for branches)

This example uses a test environment to make deployments specific to branches.
Each branch generates will generate its own deployments 

Create the test project:

```
oc new-project YOUR-TEST-PROJECT
```

Allow Jenkins to deploy to this project:

```
oc policy add-role-to-user edit system:serviceaccount:YOUR-JENKINS-PROJECT:jenkins -n YOUR-TEST-PROJECT
```


## Deployments in a stage (or prod) environment

Create the stage project:

```
oc new-project YOUR-STAGE-PROJECT
```

Allow Jenkins to deploy to this project:

```
oc policy add-role-to-user edit system:serviceaccount:YOUR-JENKINS-PROJECT:jenkins -n YOUR-STAGE-PROJECT
```

## How to create the deployments in OCP

You need to create the deployments before running the Jenkins pipeline.

* Currency service:

```
oc new-app --name currency \
https://github.com/GITHUB_USER/devops-testing \
--context-dir=currency \
--strategy=docker

oc expose svc/currency
```


* History service:

```
oc new-app --name history \
https://github.com/jramcast/devops-testing \
--context-dir=history \
--strategy=docker

oc expose svc/history
```


* Exchange service:

```
oc new-app --name exchange \
https://github.com/jramcast/devops-testing \
--context-dir=exchange

oc expose svc/exchange
```


* News service (optional):

```
oc new-app --name news \
https://github.com/jramcast/devops-testing \
--context-dir=news \
--strategy=docker

oc expose svc/news
```

* Web application:

```
oc new-app --name frontend \
https://github.com/jramcast/devops-testing \
--context-dir=frontend \
--strategy=docker

oc expose svc/frontend
```
