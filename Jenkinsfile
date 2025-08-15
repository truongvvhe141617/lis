pipeline {
  agent any
  options { disableConcurrentBuilds(); timestamps() }

  stages {
    // Build & Push image on 127.0.0.2

    stage('Build & Push on 127.0.0.2') {
      when { branch 'sgh/release1.9' }
      steps {
        withCredentials([usernamePassword(
          credentialsId: '127.0.0.2',
          usernameVariable: 'SSH_USER',
          passwordVariable: 'SSH_PASS'
        )]) {
          script {
            def buildSrv = [
              name: 'build-201', // required
              host: '127.0.0.2',
              port: 22,
              user: SSH_USER,
              password: SSH_PASS,
              allowAnyHosts: true
            ]
            sshCommand remote: buildSrv, command: '''
              set -euo pipefail
              cd webapp
              make build
              make push
            '''
          }
        }
      }
    }

    stage('Deploy on 127.0.0.1') {
      when { branch 'sgh/release1.9' }
      steps {
        withCredentials([usernamePassword(
          credentialsId: '127.0.0.1',
          usernameVariable: 'SSH_USER',
          passwordVariable: 'SSH_PASS'
        )]) {
          script {
            def deploySrv = [
              name: 'deploy-60-41', // required
              host: '127.0.0.1',
              port: 22,
              user: SSH_USER,
              password: SSH_PASS,
              allowAnyHosts: true
            ]
            sshCommand remote: deploySrv, command: '''
              set -euo pipefail
              cd compose
              docker compose -f docker-compose.fe.yml -p "fe" down --remove-orphans
              docker compose -f docker-compose.fe.yml -p "fe" up -d --remove-orphans
            '''
          }
        }
      }
    }
  }

  post {
    success { echo 'Hoàn tất build & deploy.' }
    failure { echo 'Build/Deploy lỗi. Kiểm tra log ở các bước SSH.' }
  }
}
