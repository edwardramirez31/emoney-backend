# ecommerce-serverless

## Installation

1. Install dependencies ´yarn install´
2. Add husky git hooks ´yarn husky install´

## Setup Semantic Release

1. Go to ´.releaserc´ and change the ´repositoryUrl´ key
2. Add an access token at GitHub actions secrets called ACTIONS_DEPLOY_ACCESS_TOKEN

## Deployment

1. Run ´aws configure´ to setup credentials
2. Execute ´serverless deploy --verbose´ to deploy Lambda functions
