#!/bin/bash
rm -rf out || exit 0;
mkdir out;
echo "starting deploy..."
( cd out
 git init
 git config user.name "vinceallenvince"
 git config user.email "vince@vinceallen.com"
 cp -r ../public/* ./
 cp -r ../doc/ ./doc
 cp -r ../reports ./reports
 cp ../release/SuperSimpleSim.min.js ./scripts/SuperSimpleSim.min.js
 cp ../release/SuperSimpleSim.min.css ./css/SuperSimpleSim.min.css
 git add .
 git commit -m "Deployed to Github Pages"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)
