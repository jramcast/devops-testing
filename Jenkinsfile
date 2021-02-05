STAGE_PROJECT = "rht-jramirez-exchange-stage"
PROD_PROJECT = "rht-jramirez-exchange-prod"

pipeline{
    agent any
    stages {
        stage("Code analysis & Unit Test") {

            failFast true

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

            failFast true

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

        stage('Create feature environment') {
            when {
                expression { env.BRANCH_NAME != 'master' }
            }

            steps {
                echo 'todo: create custom environment'
            }
        }


        stage("Functional Tests") {
            agent {
                label "jenkins-agent-cypress"
            }

            environment {
                CYPRESS_BASE_URL = "http://frontend-${STAGE_PROJECT}.apps.na45-stage.dev.nextcle.com/"
            }

            steps {
                dir("frontend") {
                    sh "npm ci"
                    sh "npm run test:functional"
                }
            }
        }
    }
}