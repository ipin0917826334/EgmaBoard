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
                    sh 'docker tag forum-client 63070047/forum-client'
                    sh 'docker image push 63070047/forum-client'
                    sh 'docker tag forum-server 63070047/forum-server'
                    sh 'docker image push 63070047/forum-server'
                        
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
