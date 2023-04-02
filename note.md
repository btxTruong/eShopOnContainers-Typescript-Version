# This is note while working on the project

## libs
We need to build the libs before we use them.

```json
{
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "postinstall": "npm run build"
  }
}
```

## database
We need to run migrations in the database transaction.

## eslint
We can use eslint in each workspace, eslint automatically detects the workspace and merge
with the root eslint config.

## monorepo
we can use lerna to manage the monorepo. we use workspaces to manage the dependencies.

## docker
### image layering
>Once a layer changes, all downstream layers have to be recreated as well

https://docs.docker.com/get-started/09_image_best/#layer-caching

So we need to put the most frequently changed files at the end of the Dockerfile.

### useful resources
https://testdriven.io/blog/docker-best-practices/
