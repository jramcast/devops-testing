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

            parallel {
                stage("Currency") {
                    steps {
                        sh """
                            oc project rht-jramirez-exchange-stage
                            oc start-build currency --follow --wait
                        """
                    }
                }

                stage("History") {
                    steps {
                        sh """
                            oc project rht-jramirez-exchange-stage
                            oc start-build history --follow --wait
                        """
                    }
                }

                stage("News") {
                    steps {
                        sh """
                            oc project rht-jramirez-exchange-stage
                            oc start-build news --follow --wait
                        """
                    }
                }

                stage("Exchange") {
                    steps {
                        dir("exchange") {
                            sh """
                                oc project rht-jramirez-exchange-stage
                                ./mvnw clean package -DskipTests -Dquarkus.kubernetes.deploy=true -Dquarkus.openshift.expose=true
                            """
                        }
                    }
                }

                stage('Frontend') {
                    agent {
                        label "jenkins-agent-node-14"
                    }
                    steps {
                        dir("history") {
                            sh "npm ci"
                            sh "npm run build:stage"
                        }
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
                    sh "npm ci"
                    sh "npm run test:functional"
                    // TODO:Pass services as env variables: news.rht-jramirez-exchange-stage:5000
                }
            }
        }
    }
}