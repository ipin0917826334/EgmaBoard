pipeline {
    agent any
    
    environment {
        CI = 'false'
        DOCKERHUB_COMMON_CREDS = credentials('dockerhub')
    }
    stages {
        stage('Initialize') {
            steps {
                echo 'Initial : Delete  containers and images'
                sh 'docker stop $(docker ps -a -q) || true'
                sh 'docker rm $(docker ps -a -q) || true'
                sh 'docker rmi $(docker images -a -q) --force || true'
                // sh 'docker stop Forum-server || true'
                // sh 'docker rm forum-server || true'
                // sh 'docker rmi forum-server || true'

                // sh 'docker stop Forum-client || true'
                // sh 'docker rm forum-client || true'
                // sh 'docker rmi forum-client || true'
              }
        }
        stage('Install dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install --force'
            }
        }

        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
                script {
                    docker.build('forum-server', './server')
                    docker.build('forum-client')
                    sh 'docker login -u $DOCKERHUB_COMMON_CREDS_USR -p $DOCKERHUB_COMMON_CREDS_PSW'
                    sh 'docker tag forum-client ipin0917826334/forum-client'
                    sh 'docker image push ipin0917826334/forum-client'
                    sh 'docker tag forum-server ipin0917826334/forum-server'
                    sh 'docker image push ipin0917826334/forum-server'
                        
                }
            }
        }
        stage('Run') {
            steps {
                sh "docker run -d -p 8081:3000 --name Forum-client forum-client"
                sh "docker run -d -p 5001:5001 --name Forum-server forum-server"
                sh "docker ps -a"
            }
        }
    }
}
