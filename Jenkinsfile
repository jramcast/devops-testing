pipeline{
    agent any
    stages {
        stage("Install deps") {

            parallel {
                stage("Currency") {
                    agent {
                        label "jenkins-agent-python-38"
                    }
                    steps {
                        dir("currency") {
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
                            sh "python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt"
                        }
                    }
                }

                stage('Exchange') {
                    steps {
                        dir("exchange") {
                            sh "mvn clean install"
                        }
                    }
                }
            }
        }
    }
}