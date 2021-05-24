# Host cdk

## Host cdk는 처음에만 한번 셋팅하고 이후로는 진행하지 않습니다.

## 소개

* 도메인 연결을 위한 Hostedzone 설정하는 과정입니다.
* 테스트 서버를 연결할 경우와 실 서버를 연결할 경우 설정이 달라집니다.
* 프론트 / 백이 나뉘어져있는 구조라면 각각 도메인 설정을 해야합니다.
* 아웃풋으로 나오는 네임 서버를 대시보드나(테스트 서버) 도메인을 구매한 곳의 DNS 설정에서 (실 서버) 입력해줘야 합니다.
* 이 예시에서는 somehobby project 를 기준으로 설명합니다.

## 사용법

* https://insomenia.com/posts/325 을 먼저 설정해주세요
* 프로젝트에 `host-cdk` 폴더가 없을 경우 host-cdk 를 프로젝트 루트에 클론합니다 ( 프론트든 백이든 한곳에만 해주세요.)

  `git clone git@github.com:insomenia/host-cdk.git`


* `.env` 를 `./host-cdk` 경로에 파일 생성 합니다. ( 프로젝트 루트가 아닙니다. )



## 테스트서버를 셋팅 할 경우 ( barber.work 의 서브도메인을 사용합니다-기존 insomenia.com)

`.env`

```sh
# 콘솔에 로그인 했을때 account number 혹은 
# aws sts get-caller-identity --profile [프로필명] 으로 나오는 account number를 입력
ACCOUNT=""
# 레포지토리 명으로 하는걸 추천합니다 - mpick-server -> mpick
# [A-Za-z][A-Za-z0-9-]에 맞게 
APP_NAME="somehobby"

# 추가하고자 하는 url입니다.
# 반드시 테스트서버는 FRONT_URL / BACK_URL 만 설정하고
# 실서버는 URL만 설정합니다.

# 테스트서버 설정 시
# -> 테스트서버 프론트
FRONT_URL="somehobby.barber.work" 
# -> 테스트서버 백엔드
BACK_URL="api-somehobby.barber.work" 
# 실서버셋팅 URL은 따로 설정하지 않습니다!

```

## 실서버를 셋팅 할 경우

`.env`

```shell
# 콘솔에 로그인 했을때 account number 혹은 
# aws sts get-caller-identity --profile [프로필명] 으로 나오는 account number를 입력Cancel changes
ACCOUNT=""
# 레포지토리 명으로 하는걸 추천합니다 - mpick-server -> mpick
# [A-Za-z][A-Za-z0-9-]에 맞게 
APP_NAME="somehobby"

# 추가하고자 하는 url입니다.
# 반드시 테스트서버는 FRONT_URL / BACK_URL 만 설정하고
# 실서버는 URL만 설정합니다.

# 실서버 설정 시 
# -> 실서버 도메인 ( barber.work이 아니라 고객사로부터 받은 도메인 입니다!!! )
URL="seongjun.kr"
```



* hostedzone 생성 시작

```shell
cd host-cdk
yarn install
yarn deploy --profile [프로필명] --all
```



![image](https://user-images.githubusercontent.com/72075148/117400104-ef24d880-af3c-11eb-90cc-bf7879a37b1f.png)



## 테스트서버 셋팅 할 경우 ( [subdomain].barber.work )

* 대시보드에서 설정하고자 하는 프로젝트 수정에 들어갑니다.

* ### 콘솔의 아웃풋에 나온 네임서버들을 입력합니다. - 꼭 위에서부터 순서대로 잘 입력합니다, 끝에 "." 을 꼭 붙여주세요.

* 설정 전

  ![image](https://user-images.githubusercontent.com/72075148/117401264-3a3feb00-af3f-11eb-9dad-3aef9108414e.png)

* 설정 후 

  ![image](https://user-images.githubusercontent.com/72075148/117400914-89d1e700-af3e-11eb-8b57-03e029b3b6df.png)

  

## 실서버 셋팅 할 경우 ( barber.work ) 

## 각 도메인 구매 사이트 별로 DNS 설정에서 네임서버를 아웃풋의 네임서버로 변경합니다.

## ex) https://sovovy.tistory.com/37 -> 예시에서 가비아에서 설정하는 부분만 하시면 됩니다.

## 네임서버 변경하는 방법은 거의 다 비슷합니다.



### 이제 각각의 cdk ( rails-cdk / nextjs-cdk ) 에서 url옵션을 사용할 수 있습니다.





