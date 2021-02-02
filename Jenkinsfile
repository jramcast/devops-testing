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

        stage("Deploy Stage") {

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

                // stage('Exchange') {
                //     steps {
                //         dir("exchange") {
                //             sh "./mvnw clean verify"
                //         }
                //     }
                // }
            }

        }
    }
}