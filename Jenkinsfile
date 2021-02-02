pipeline{
    agent any
    stages {
        stage("Install deps") {

            parallel {
                stage("Currency") {
                    steps {
                        dir("currency") {
                            sh "pip3 install -r requirements.txt"
                        }
                    }
                }

                stage('History') {
                    agent {
                        label "jenkins-agent-node-14"
                    }
                    steps {
                        dir("currency") {
                            sh "python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt"
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