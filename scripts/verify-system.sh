#!/bin/bash
set -e
echo "Starting System Verification..."
npm test -- --ci
echo "Tests Passed."
npm run build
echo "Build Successful."
npm run docs
echo "Documentation Generated."
echo "System Verification Complete: LOCKED."
