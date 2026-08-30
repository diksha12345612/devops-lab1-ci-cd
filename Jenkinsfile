pipeline {
    agent any

    environment {
        NODE_VERSION = '24'
        APP_NAME     = 'devops-lab1-ci-cd'
        DOCKER_IMAGE = 'devops-lab1-app'
        PORT         = '3000'
    }

    stages {

        stage('📥 Checkout') {
            steps {
                echo '=== Checking out source code ==='
                checkout scm
            }
        }

        stage('📦 Install Dependencies') {
            steps {
                echo '=== Installing Node.js dependencies ==='
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci'
            }
        }

        stage('🧪 Run Tests') {
            steps {
                echo '=== Running unit tests with Jest ==='
                sh 'npm test'
            }
            post {
                always {
                    echo 'Test stage completed.'
                }
                failure {
                    echo '❌ Tests FAILED! Pipeline will stop.'
                }
            }
        }

        stage('🐳 Build Docker Image') {
            steps {
                echo '=== Building Docker image ==='
                sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
                sh "docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest"
            }
        }

        stage('🚀 Deploy Container') {
            steps {
                echo '=== Deploying application container ==='
                // Stop old container if running
                sh "docker stop ${APP_NAME} || true"
                sh "docker rm ${APP_NAME} || true"
                // Run new container
                sh """
                    docker run -d \\
                      --name ${APP_NAME} \\
                      -p ${PORT}:${PORT} \\
                      -e NODE_ENV=production \\
                      ${DOCKER_IMAGE}:latest
                """
            }
        }

        stage('✅ Health Check') {
            steps {
                echo '=== Running health check ==='
                sh 'sleep 5'
                sh "curl -f http://localhost:${PORT}/health || exit 1"
                echo '✅ Application is healthy!'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline SUCCEEDED! App deployed successfully.'
        }
        failure {
            echo '❌ Pipeline FAILED! Check logs above.'
        }
        always {
            echo "Pipeline finished. Build #${BUILD_NUMBER}"
        }
    }
}
