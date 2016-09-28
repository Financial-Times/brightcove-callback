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

### Setup

### AWS Credentials

#### Local
If deploying from a non-ec2 instance setup aws profile
http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-multiple-profiles

#### Set default profile in shell
'''export set AWS_DEFAULT_PROFILE=staging'''

#### Run gulp deployment
'''gulp --env=staging --lambdarole=FTFlexServices-Deployer --account=528773984231 --region=eu-west-1'''
```

## Testing

```
$ npm install nodeunit -g
$ nodeunit test/index.good.test.js
```
