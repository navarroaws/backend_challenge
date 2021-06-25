# Serverless Backend Challenge

[Serverless](https://serverless.com/) Backend Challenge - Serverless Image upload API

## Overview
This project uses the [Serverless framework.](https://serverless.com/)
It's an API for uploading images.

## Installation



1. [Set credentials ](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) ( aws ) 
    * example: 
    `serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
    
2. Run `npm install` to install project dependencies.

3. Run `npm install`
4. Deploy with `npx serverless deploy`


## Development
The project uses the [serverless-offline plugin](https://www.npmjs.com/package/serverless-offline), and the [s3rver](https://www.npmjs.com/package/s3rver) lib, which emulates the aws S3 service

run local with `npm run servers`

IMPORTANT! 
set on s3config.js local credentials

{
  accessKeyId: "S3RVER",
  secretAccessKey: "S3RVER",
}

## Scripts
  * `npm start`         - runs serverless-offline and s3 local
  * `npm run  deploy`   - deploy to aws
  * `npm run  remove`   - remover from aws
  * `npm run  test`     - run tests
  

## How to use

Simply perform requests against the exposed endpoints:

### Create

```bash
curl -X POST https://XXXX.execute-api.region.amazonaws.com/dev/secure-api-files --form 'file=@"/home/path_to_your_file/image.png"'
```


## AWS services used

- Lambda
- API Gateway
- S3
- Cloudformation

## TODO 
```
- [x] upload file to s3          
- [x] provide create user endpoint      
- [x] aprovide login user endpoint     
- [x] Unit or Integration Tests   
- [ ] add secutiry middleware to verify Bearer Tokens, x-api-key, etc.           
- [ ] get image metadata and store into S3          
- [ ] implemenets aws DynamoDB 
- [ ] add openApi docs 
```
