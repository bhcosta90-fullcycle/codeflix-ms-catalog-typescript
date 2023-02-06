#!/bin/sh

if [ ! -f "./src/@shared/.env.testing.example" ]; then
    cp ./src/@shared/.env.testing.example ./src/@shared/.env.testing
fi

yarn install

yarn run dev
