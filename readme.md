npm node yarn 설치

```

```


https://wani.kr/posts/2017/05/24/yarn-global-setting/

yarn config set prefix ~/.yarn-global
cat ~/.yarnrc
export PATH="$PATH:`yarn global bin`"


pm2 설치
yarn global add pm2@latest

which pm2 
ln -s pm2경로 /usr/local/bin/pm2

pm2 start --name=bus "yarn start:prod"


-----

todo

sync 

.env 애매 - sym_link