TEST_PROJECT = "rht-jramirez-exchange-test"
STAGE_PROJECT = "rht-jramirez-exchange-stage"
PROD_PROJECT = "rht-jramirez-exchange-prod"

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
                            sh "npm test"
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

        stage("Deploy to Stage") {

            when { branch 'experiments' }

            parallel {
                stage("Currency") {
                    steps {
                        sh """
                            oc start-build currency --follow --wait -n $STAGE_PROJECT
                        """
                    }
                }

                stage("History") {
                    steps {
                        sh """
                            oc start-build history --follow --wait -n $STAGE_PROJECT
                        """
                    }
                }

                stage("News") {
                    steps {
                        sh """
                            oc start-build news --follow --wait -n $STAGE_PROJECT
                        """
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
                        sh """
                            oc start-build frontend --follow --wait -n $STAGE_PROJECT
                        """
                    }
                }

            }
        }


        stage("Deploy Branch to Test") {

            when {
                expression { env.BRANCH_NAME != 'experiments' }
            }

            parallel {
                stage("Currency") {
                    steps {
                        createOrUpdate("currency")
                    }
                }

                stage("History") {
                    steps {
                        createOrUpdate("currency")
                    }
                }

                stage("News") {
                    steps {
                        createOrUpdate("currency")
                    }
                }

                stage("Exchange") {
                    steps {
                        dir("exchange") {
                            sh """
                                oc project $TEST_PROJECT
                                ./mvnw clean package -DskipTests \
                                    -Dquarkus.kubernetes.name=exchange-$BRANCH-NAME \
                                    -Dquarkus.kubernetes.deploy=true \
                                    -Dquarkus.openshift.expose=true
                            """
                        }
                    }
                }

                stage("Frontend") {
                    steps {
                        createOrUpdate("currency")
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
                        def url = "http://frontend-${STAGE_PROJECT}.apps.na45-stage.dev.nextcle.com/"

                        if (env.BRANCH_NAME != "experiments") {
                            url = "http://frontend-${BRANCH_NAME}-${TEST_PROJECT}.apps.na45-stage.dev.nextcle.com/"
                        }

                        sh "npm ci"

                        withEnv(["CYPRESS_BASE_URL=$url"]) {
                            sh "npm run test:functional"
                        }
                    }

                }
            }
        }
    }
}


def createOrUpdate(service) {
    def name = "";
    def project = "";

    if (env.BRANCH_NAME == "experiments") {
        name = service
        project = STAGE_PROJECT
    } else {
        name = service + "-" + env.BRANCH_NAME
        project = TEST_PROJECT
    }

    def code = sh(script: "oc get deployment $name -n $project", returnStatus: true)

    if (code != 0) {
        sh """
            oc new-app --name $name \
                https://github.com/jramcast/devops-testing#${BRANCH_NAME} \
                --context-dir=$service \
                --strategy=docker
        """
        sh "oc expose svc/$name"
    } else {
        sh "oc start-build $name --follow --wait -n $project"
    }
}