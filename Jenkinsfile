STAGE_PROJECT = "rht-jramirez-exchange-stage"
PROD_PROJECT = "rht-jramirez-exchange-prod"

pipeline{
    agent any
    stages {

        stage('Create feature environment') {

            steps {
                echo scmVars.GIT_BRANCH
            }

        }
    }
}