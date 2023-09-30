# Summary
I found a bit to build docker with monorepo by lerna that we need to write a script to can use common package
in target package that we want to build. Because the workspace only is defined in root package.json

# Solution
Move to use turborepo. it has a feature to handle it
