# Rail full stack / api cdk

## 소개

* 기존에 인프라 구성하던 방식 그대로 EC2, RDS, S3, VPC로 구성 되어있습니다
* 별 이슈가 없다면 처음에만 인프라 구성을 위해서 사용하게 됩니다.
* 하다 막히면 김성준 본부장에게 바로 slack dm!

## 사용법

* https://insomenia.com/posts/325 을 먼저 설정해주세요

* 프로젝트에 `rails-cdk` 폴더가 없을 경우 rails-cdk 를 프로젝트 루트( api 서버라면 백엔드)에 클론합니다.

  `git clone git@github.com:insomenia/rails-cdk.git`


* ### .env  추가, 각자 프로젝트에 맞게 설정하세요! ( rails-cdk 폴더에 추가합니다. )


  * URL 변수는 https://github.com/insomenia/host-cdk 을 먼저 설정해야합니다.  

    ## 도메인 설정을 안하실꺼라면 아예 비워두세요.

  ```shell
  # 콘솔에 로그인 했을때 account number 혹은 
  # aws sts get-caller-identity --profile [프로필명] 으로 나오는 account number를 입력
  ACCOUNT=""
  # 보통은 서울리전으로 합니다.
  REGION="ap-northeast-2"
  # 레포지토리 명으로 하는걸 추천합니다 - mpick-server -> mpick
  # [A-Za-z][A-Za-z0-9-]에 맞게 
  APP_NAME="bone"
  # 회사 IP 입니다.
  MY_IP="220.117.38.70"
  # 데이터베이스 이름입니다.
  DB_NAME="bone_production"
  # 1password를 통해서 비밀번호를 생성하고 저장하세요! 
  # db password는 ascii character만 됩니다.
  DB_PASSWORD="엄청어려운비밀번호!"
  # 자신의 퍼블릭키를 넣습니다. - 이 퍼블릭키를 통해 EC2에 접근 예정!
  SSH_KEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDqRp/HKRdCfLq7bvcbg5MmPAgj2brk5fgWhxNqpJ6h9NRoE8J7go7OJ4sGEwedwW8sFOMW0bI4rGVYVKWfC0aOgweBoYKjq6WjcsVOGrokMhoQ31VU5Fa+oRcxeW9ro+ZgmsEc5Rc0OFr5RHwYz+u0zPKqVVy/ZoDthYdlGzHHMBRJOsoMsv1ySheJQOwEgK6WpHoH+U2BlIb6+bYbWGZFaJfhgWKuAJT5RWKAMhbLJyMopmyagfBnl8r1s/unFH89RdW1cU4c6H1J8eVkfNkC+cPYSkjvJMw+DS7Cl1/Hbxrm22eNxC0wr4kv+9hdZWdS9YYqPWPPZpYiqSJ47qaTsoAXoKDJ+EfEaSB3x0KKv7ZrbGDjIpVpCK0UPdJGBlE8Ky9v88nKZDnS4dCv2A0T5+Y/kRq1cK2prBdtbXP1o1QcDIRCD7EEZ0+4GWyKzkBVXGSNdK+DRniQ8D8Xe2KKTJeLbgrU3YxD4e1mFnpVeWm6nLpYe3R7RpaMsw+lxfqA2NYr7U89gPM7zNFfZThJidFfI5FqTxGDQFRO3h66p4OCbJFtQmuIKxCtleT3IIkR2/BQRiItholIh9RvNe7N3xp0drewrmJd8Otzx9uHhrGLKrf9yM+JAUofXoF5ejpwkrU+oc5V5ZSnVWk8vriP1cW+HzsJOti5rv8OfvgcPQ== seongjun@insomenia.com"
  
  
  # 백엔드 서버의 url입니다. 해당하는 환경 변수는 host-cdk 먼저 설정 해주세요 꼭!!!!!!!
  # 테스트서버의 경우
  # URL="api-bone.barber.work"
  # 실서버의 경우
  # 백엔드의 url 이므로 프론트엔드와 동일하면 안됩니다. 
  # URL="api.seongjun.kr"
  URL=""
  
  ```

  env 파일은 gitignore에 들어가있습니다. 1password로 공유해도됩니다.

* 인프라 구성 시작

```shell
cd rails-cdk
yarn install
yarn deploy --profile [프로필명] --all
# 따로 한가지 스텍만 deploy 하려면 --all 말고 S3Stack 이런식으로 정해서 하면됩니다.
```



### S3

S3Stack이 배포되고나면 다음과 같이 버킷이름과 access key / secret key가 콘솔에 노출됩니다.

![image](https://user-images.githubusercontent.com/72075148/116659906-3f47ec00-a9cd-11eb-8e0a-895f6508df39.png)

1password에 잘 저장해두고 Rails credentials에 추가 후 fog를 이용해서 imageuploader storage 를 변경합니다.

### EC2

EC2Stack이 배포되고나면 다음과 같이 public Ip가 콘솔에 노출됩니다.

![Screen Shot 2021-04-30 at 4 05 09 PM](https://user-images.githubusercontent.com/72075148/116660356-e0cf3d80-a9cd-11eb-89e2-06f12a534603.png)

ssh key가 잘 추가되었으면 `ssh deploy@[콘솔에 노출된 ip]` 를  통해서 접속이 가능합니다.

인스턴스에는 Rails 설치, nginx 설치 등 환경설정이 모두 되어있습니다.

capistrano 쪽(`production.rb`) ip 설정과 `/etc/nginx/site-enable/default` 쪽만 수정하면됩니다.

### rds

RDS이 배포되고나면 다음과 같이 Host가 콘솔에 노출됩니다.

![image](https://user-images.githubusercontent.com/72075148/116664667-bbddc900-a9d3-11eb-89b7-ee157b4ad7b1.png)


* `database.yml` 에서 Host , password, database를 입력합니다 ( 콘솔에 노출된 Host , env에 입력해둔 password / database name )
* user 는 deploy 입니다.
* Credential 사용을 권장합니다

```shell
EDITOR='vi' rails credentials:edit
```

```yaml
production:
<<: *default
 database: <%= Rails.application.credentials.dig(:rds_name) %>
 host: <%= Rails.application.credentials.dig(:rds_host) %>
 username: <%= Rails.application.credentials.dig(:rds_user) %>
 password: <%= Rails.application.credentials.dig(:rds_password) %>
```

## 인프라 구성은 모두 끝났습니다. 이후 배포는 capistrano를 사용해주세요. 

## https://insomenia.com/posts/334





## 기타

### 배포한 인프라 지우기

인프라를 지우고 싶으시면 본부장에게 먼저 여쭤보세요!

`cdk destroy` 를 하면 되는데 S3는 cli로 삭제가 불가능합니다. 버킷내의 오브젝트들이 모두 지워져있는 상태여야 가능합니다.

직접 aws로 들어가서 해당하는 S3 버킷을 모두 지워주세요

