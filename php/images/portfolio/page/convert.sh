#!/bin/bash


for file in *
do
cwebp  "$file" -o "$file.webp"
done
