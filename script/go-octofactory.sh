#!/bin/bash
# Usage: . ./go-octofactory.sh && dev-vpn connect && go get -u github.com/github/monolith-twirp-actions/core@v1.0.99 && go mod vendor

read -p "Did you remember to prefix your execution with \". \" so the exports would stick?" BLAH
read -p "Step 1. Join the dev-vpn on your machine" VPN
read -p "Step 2. Go to https://octofactory.githubapp.com/artifactory/webapp/#/profile in your browser, hit enter" BROWSER
read -p "Step 3. Copy API token: " OCTOFACTORY_API_TOKEN

# https://github.com/github/go-lang/blob/main/docs/octofactory.md#configure-your-go-environment
export GOPROXYUSER=hashtagchris
export GOPROXYPASS="$OCTOFACTORY_API_TOKEN"
export GOPROXY="https://${GOPROXYUSER}:${GOPROXYPASS}@octofactory.githubapp.com/api/go/github-go,https://proxy.golang.org,direct"
export GOPRIVATE='*github.com/github/*'

# https://github.com/github/monolith-twirp/blob/master/docs/usage.md#go
export GONOPROXY='none'

echo "Go environment variables set"
