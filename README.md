# Brightcove Ingest Call Back API and Publication Notifications

## Pre-requistes

### Install node and npm
#### Mac
```
$ brew install node
```

### Install Gulp and aws-lambda-gulp-tasks
#### Mac
```
$ npm install gulp -g 
$ npm install run-sequence  --save-dev
$ npm install aws-lambda-gulp-tasks --save-dev
```


npm install --save-dev

# Building etc..

## AWS Credentials
Setup your aws credentials in  ~/.aws/credentials 
```
[default]
aws_access_key_id = XXXXXXXXXX
aws_secret_access_key = XXXXXXXXXX

[test]
aws_access_key_id = XXXXXXXXXX
aws_secret_access_key = XXXXXXXXXX

[prod]
aws_access_key_id = XXXXXXXXXX
aws_secret_access_key = XXXXXXXXXX
```

##  Deploying
```
$ gulp --env==ENV --role=arn:aws:iam::810385116814:role/JemRayfieldsLambdaExecutionRole
```

## Testing

```
$ npm install nodeunit -g
$ nodeunit test/index.test.js
```
