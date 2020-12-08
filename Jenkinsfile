pipeline{

	

	agent {label "nodejs-10"}
    options{
        buildDiscarder(logRotator(numToKeepStr: '200'))
	}

	stages{
		stage("clone"){

	
	steps{
		script {
  def codeRepository = "https://github.com/kkxiaoa/git-test"
  def credential_id = ""
  env.CODE_REPO = codeRepository
  try {
    def alaudaDevopsInstance = alaudaDevops.newInstance()
    alaudaDevopsInstance.withCluster(){
      alaudaDevopsInstance.withProject(alaudaContext.getNamespace()){
        def coderepo = alaudaDevopsInstance.selector("coderepository", "github-kkxiaoa-git-test").object()
        if(coderepo) {
          credential_id = coderepo.metadata.annotations.secretNamespace + '-' + coderepo.metadata.annotations.secretName
        }
      }
    }
  } catch(err) {
    echo err.getMessage()
  }
  if ( credential_id == "") {
    credential_id = "kkxiao-kkxiao-github"
  }

  env.CREDENTIAL_ID = credential_id
  def relativeDirectory = "."
  env.RELATIVE_DIRECTORY = relativeDirectory

  def branchFromInput = "main"

  if("".equals(branchFromInput)){
    branchFromInput = "master"
  }

  env.BRANCH = branchFromInput

  def scmVars = checkout([
    $class: 'GitSCM',
    branches: [[name: branchFromInput]],
    extensions: [[
      $class: 'SubmoduleOption',
      recursiveSubmodules: true,
      parentCredentials: true,
      reference: '',
    ],[
      $class: 'RelativeTargetDirectory',
      relativeTargetDir: relativeDirectory
    ],[
      $class: 'RecordLastChangeLog'
    ]],
    userRemoteConfigs: [[
      credentialsId: credential_id,
      url: codeRepository
    ]]
  ])

  dir(RELATIVE_DIRECTORY){
      env.FROM_SCM = true
      env.SCM_AUTHOR = sh (script: 'git log -1 --pretty=format:"%an"',returnStdout: true).trim()
      env.SCM_COMMIT_INFO = sh (script: 'git log -1 --pretty=%B',returnStdout: true).trim()
      env.SCM_COMMIT = scmVars.GIT_COMMIT
      env.GIT_COMMIT = scmVars.GIT_COMMIT
      env.GIT_BRANCH = scmVars.GIT_BRANCH
      env.GIT_BRANCH_AS_TAG = scmVars.GIT_BRANCH.replaceFirst("origin/","").replaceAll("/","-")
}

  alaudaPipeline.appendInfo(STAGE_NAME, [commit_id: scmVars.GIT_COMMIT, branch: scmVars.GIT_BRANCH, repo_url: codeRepository as String], '_Clone')

  
  env.TIMESTAMP = new Date().format("yyyyMMddHHmmss")
}
}
}
stage("nodejs"){

	
	steps{
		script {
    dir(RELATIVE_DIRECTORY) {
        container('nodejs') {
            sh """
              npm install
            """
        }
    }
}
}
}
stage("build-docker"){

	
	steps{
		script {
    def alaudaDevopsInstance = alaudaDevops.newInstance()
    def retryCount = 3
    def repositoryAddr = '192.168.17.2:30013/hello'.replace("http://","").replace("https://","")
    env.IMAGE_REPO = repositoryAddr

    def credentialId = ''
    credentialId = ""
    dir(RELATIVE_DIRECTORY) {
        container('tools'){
            retry(retryCount) {
                try{
                    if (credentialId != '') {
                      withCredentials([usernamePassword(credentialsId: "${credentialId}", passwordVariable: 'PASSWD', usernameVariable: 'USER')]) {
                        sh "docker login ${IMAGE_REPO} -u ${USER} -p ${PASSWD}"
                        }
                      }
                    }
                catch(err){
                    echo err.getMessage()
                    alaudaDevopsInstance.withCluster() {
                          def secretNamespace = ""
                          def secretName = ""
                          def secret = alaudaDevopsInstance.selector( "secret/${secretName}" )
                          alaudaDevopsInstance.withProject( "${secretNamespace}" ) {
                              def secretjson = secret.object().data['.dockerconfigjson']
                              def dockerconfigjson = base64Decode("${secretjson}");
                              writeFile file: 'config.json', text: dockerconfigjson
                              sh """
                                set +x
                                mkdir -p ~/.docker
                                mv -f config.json ~/.docker/config.json
                              """
                          }
                      }
                }
                def buildImages = []
                  def tagswithcomma = "latest"
                  def tags = tagswithcomma.split(",")
                  def incubatorimage = "${IMAGE_REPO}:${tags[0]}"
                  sh " docker build -t ${incubatorimage} -f Dockerfile  ."
                  tags.each { tag ->
                    sh """
                        docker tag ${incubatorimage} ${IMAGE_REPO}:${tag}
                        docker push ${IMAGE_REPO}:${tag}
                    """
                    buildImages.add("${IMAGE_REPO}:${tag}" as String)
                  }
                alaudaPipeline.appendInfo(STAGE_NAME, [build_image: buildImages], '_Docker')
                if (credentialId != '') {
                    sh "docker logout ${IMAGE_REPO}"
                }
            }
        }
    }
}
}
}

	}
}
