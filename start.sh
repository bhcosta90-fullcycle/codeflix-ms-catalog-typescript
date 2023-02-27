#!/bin/sh

if [ ! -f "./src/@shared/.env.testing" ]; then
    cp ./src/@shared/.env.testing.example ./src/@shared/.env.testing
fi

if [ ! -f "./src/nestjs/src/envs/.env" ]; then
    cp ./src/nestjs/src/envs/.env.example ./src/nestjs/src/envs/.env
fi

yarn install

yarn run dev
