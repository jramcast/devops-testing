
pipeline{
    agent any
    stages {
        stage('Create feature environment') {
            steps {
                echo env.BRANCH_NAME
                echo env.CHANGE_TARGET
                echo env.CHANGE_ID
            }
        }
    }
}