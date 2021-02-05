
pipeline{
    agent any
    stages {

        stage('Create feature environment') {

            steps {
                def b =  scmVars.GIT_BRANCH

                sh "echo $b"
            }

        }
    }
}