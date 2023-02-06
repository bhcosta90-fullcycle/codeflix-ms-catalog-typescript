#!/bin/bash

if [ ! -f "./src/@core/.env.testing" ]; then
    cp ./src/@core/.env.test.example ./src/@core/.env.test
fi

yarn install

yarn run dev
