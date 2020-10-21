#!/bin/bash

echo "Starting buidler compile";
npx buidler compile;
echo "Moving files to constants";
rm ../client/src/constants/abis/*;
cp ./artifacts/Pixel.json ../client/src/constants/abis;
cp ./artifacts/PixelFactory.json ../client/src/constants/abis;
