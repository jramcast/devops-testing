TEST_PROJECT = "rht-jramirez-exchange-test"
STAGE_PROJECT = "rht-jramirez-exchange-stage"
PROD_PROJECT = "rht-jramirez-exchange-prod"
MAIN_BRANCH = "experiments"

pipeline{
    agent any

    options {
        parallelsAlwaysFailFast()
    }

    stages {
        stage("Code analysis & Unit Test") {
            parallel {
                stage("Currency") {
                    agent {
                        label "jenkins-agent-python-3"
                    }
                    steps {
                        dir("currency") {
                            sh "pip3 install -r requirements.txt"
                            sh "./scripts/lint"
                            sh "./scripts/test"
                        }
                    }
                }

                stage('History') {
                    agent {
                        label "jenkins-agent-node-14"
                    }
                    steps {
                        dir("history") {
                            sh "npm ci"
                            sh "npm run lint"
                            sh "npm run test:ci"
                        }
                    }
                }

                stage('Exchange') {
                    steps {
                        dir("exchange") {
                            sh "./mvnw clean verify"
                        }
                    }
                }
            }
        }

        stage("Service Level Integration Testing") {
            parallel {
                stage('History') {
                    agent {
                        label "jenkins-agent-node-14"
                    }
                    steps {
                        dir("history") {
                            sh "npm ci"
                            sh "npm run test:integration"
                        }
                    }
                }

                stage('Frontend') {
                    agent {
                        label "jenkins-agent-node-14"
                    }
                    steps {
                        dir("frontend") {
                            sh "npm ci --no-optional"
                            sh "npm run lint"
                            sh "npm run test:ci"
                        }
                    }
                }
            }
        }

        stage("Deploy to Stage") {

            when { branch MAIN_BRANCH }

            parallel {
                stage("Currency") {
                    steps {
                        createOrUpdate("currency", "")
                    }
                }

                stage("History") {
                    steps {
                        createOrUpdate("history", "")
                    }
                }

                stage("Exchange") {
                    steps {
                        dir("exchange") {
                            sh """
                                oc project $STAGE_PROJECT
                                ./mvnw clean package -DskipTests -Dquarkus.kubernetes.deploy=true -Dquarkus.openshift.expose=true
                            """
                        }
                    }
                }

                stage("Frontend") {
                    steps {
                        createOrUpdate(
                            "frontend",
                            "--build-env REACT_APP_GW_ENDPOINT=http://exchange-${STAGE_PROJECT}.apps.na45-stage.dev.nextcle.com/"
                        )
                    }
                }
            }
        }


        stage("Deploy Branch to Test") {

            when {
                expression { env.BRANCH_NAME != MAIN_BRANCH }
            }

            parallel {
                stage("Currency") {
                    steps {
                        createOrUpdate("currency", "")
                    }
                }

                stage("History") {
                    steps {
                        createOrUpdate("history", "")
                    }
                }

                stage("Exchange") {
                    steps {
                        dir("exchange") {
                            sh """
                                oc project $TEST_PROJECT
                                ./mvnw clean package -DskipTests \
                                    -Dquarkus.openshift.name=${BRANCH_NAME}-exchange \
                                    -Dquarkus.kubernetes.deploy=true \
                                    -Dquarkus.openshift.expose=true \
                                    -Dquarkus.openshift.env.vars.HISTORY_SERVICE=${BRANCH_NAME}-history:8080 \
                                    -Dquarkus.openshift.env.vars.CURRENCY_SERVICE=${BRANCH_NAME}-currency:5000
                            """
                        }
                    }
                }

                stage("Frontend") {
                    steps {
                        createOrUpdate(
                            "frontend",
                            "--build-env REACT_APP_GW_ENDPOINT=http://${BRANCH_NAME}-exchange-${TEST_PROJECT}.apps.na45-stage.dev.nextcle.com/"
                        )
                    }
                }
            }
        }


        stage("Functional Tests") {
            agent {
                label "jenkins-agent-cypress"
            }

            steps {
                dir("frontend") {
                    script {
                        def url = getFrontendUrl()

                        sh "npm ci"

                        withEnv(["CYPRESS_BASE_URL=$url"]) {
                            sh "npm run test:functional"
                        }

                        archiveArtifacts "cypress/video"
                    }

                }
            }
        }
    }
}


def createOrUpdate(service, args) {
    def name = "";
    def project = "";

    if (env.BRANCH_NAME == MAIN_BRANCH) {
        name = service
        project = STAGE_PROJECT
    } else {
        name = env.BRANCH_NAME + "-" + service
        project = TEST_PROJECT
    }

    def code = sh(script: "oc get deployment $name -n $project", returnStatus: true)

    if (code != 0) {
        sh """
            oc new-app --name $name \
                https://github.com/jramcast/devops-testing#${BRANCH_NAME} \
                --context-dir=$service \
                --strategy=docker \
                $args || true
        """
        sh "oc expose svc/$name"
        retry(3) {
            sh "oc logs -f bc/$name"
        }
    } else {
        sh "oc start-build $name --follow --wait -n $project"
    }
}

def getFrontendUrl() {
    def url = "http://frontend-${STAGE_PROJECT}.apps.na45-stage.dev.nextcle.com/"

    if (env.BRANCH_NAME != MAIN_BRANCH) {
        url = "http://${BRANCH_NAME}-frontend-${TEST_PROJECT}.apps.na45-stage.dev.nextcle.com/"
    }

    return url;
}
