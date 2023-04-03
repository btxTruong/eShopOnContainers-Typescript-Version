# Summary

https://turbo.build/repo/docs/handbook/what-is-a-monorepo

# Solution

We combine yarn workspaces and lerna to manage our monorepo.
Lerna makes it easy to manage multiple packages in a single repository.

One thing to note is that we create a separate package for each tsconfig and eslint config. That  make
it easy to manage the dependencies and config.

Why we need to create new packages for tsconfig and eslint config?

To answer the question we will ask:

>What happen if we use it as a file and import it into other packages instead of creating a separate package for them

- We need to create a folder to share it with other packages. How we can import it ? Using relative path something like

```json
{
  "extends": "../../../../../../../../../tsconfig.json"
}
```

That is a nightmare to correct the path.

