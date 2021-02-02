pipeline{
    agent any
    stages {
        stage("Install deps") {

            parallel {
                stage("Currency") {
                    steps {
                        dir("currency") {
                            sh "python --version"
                            sh "pip install -r requirements.txt"
                        }
                    }
                }

                stage('History') {
                    agent {
                        label "jenkins-agent-node-14"
                    }
                    steps {
                        dir("currency") {
                            sh "npm ci"
                        }
                    }
                }

                stage('Exchange') {
                    steps {
                        dir("exchange") {
                            sh "./mvnw clean install"
                        }
                    }
                }
            }
        }
    }
}