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
