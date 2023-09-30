# Summary

Sometimes, there is a SQL run failed, and we need to rollback the all migration. If not rollback, the
data will be in a inconsistent state.

# Solution

We can hook the umzug to add add transaction for up and down.
```typescript
migrations: {
  resolve: ({ name, path, context }) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
    const migration = require(path!);
    return {
      name,
      up: async () => getDBConn().transaction((t1) => migration.up({ context })),
      down: async () => getDBConn().transaction((t1) => migration.down({ context }))
    };
  };
}
```


