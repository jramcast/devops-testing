
pipeline{
    agent any
    stages {

        stage('Create feature environment') {
            steps {
                script{
                    def b =  scmVars.GIT_BRANCH
                    sh "echo $b"
                }
            }

        }
    }
}