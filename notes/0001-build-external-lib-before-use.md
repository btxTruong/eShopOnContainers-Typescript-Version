# Summary

We have some problems with own library, we need to build the library before we use it. Because some
of dependencies can not run without building

# Solution

We need to build it before we use it. Don't forget to add `main` in `package.json` to point to the
entry file and add `types` to point to the type definition file.
```json
{
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```
