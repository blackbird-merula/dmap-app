#!/bin/bash

set -e

git submodule update --init --recursive

cd lib/dsuite
npm i
npm run build

for package in packages/*; do
  if [ -d "$package" ]; then
    cd "$package"
    bun link
    cd ../..
  fi
done

cd ../..
bun i
