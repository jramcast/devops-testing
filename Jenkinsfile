
pipeline{
    agent any
    stages {

        stage('Create feature environment') {

            steps {
                b =  scmVars.GIT_BRANCH

                sh "echo $b"
            }

        }
    }
}