# Contributing

Contributions to `astro-craftcms` will be considered. Be aware that this is an opinionated demonstration project, and updates may require updating the related blog posts. The bar for accepting contributions is higher than on some projects. But if there are better ways of doing things I'd love to learn them, so don't let the higher bar discourage you.

## Updating single-app branches

Changes to `main`'s `packages/app-*` need to be repeated in the single-app branches. As of this writing (branches may have since changed) the workflow is:

1.
    ```shell
    git checkout ssg-with-cached-data
    git rebase --update-refs -i blank
    ```

    and in the `git-rebase-todo` change all `pick`s to `edit`s.

1.
    ```shell
    git checkout main -- packages/app-ssr
    rm -rf packages/app
    mv packages/app-ssr packages/app
    ```

1. In `packages/app/package.json`, change the `"name"` to `astro-craftcms-app`.

1.
    ```shell
    bun i
    git add packages/app packages/app-ssr
    git commit --amend --no-edit
    git rebase --continue
    git checkout main -- packages/app-ssg-no-cache
    rm -rf packages/app
    mv packages/app-ssg-no-cache packages/app
    ```

1. In `packages/app/package.json`, change the `"name"` to `astro-craftcms-app`.

1.
    ```shell
    bun i
    git add packages/app packages/app-ssg-cache
    git commit --amend --no-edit
    git rebase --continue
    git checkout main -- packages/app-ssg-cache
    rm -rf packages/app
    mv packages/app-ssg-cache packages/app
    ```

1. In `packages/app/package.json`, change the `"name"` to `astro-craftcms-app`.

1.
    ```shell
    bun i
    git add packages/app packages/app-ssg-cache
    git commit --amend --no-edit
    git rebase --continue
    # (rebase finishes)
    git checkout ssr
    git push --force-with-lease
    git checkout ssg
    git push --force-with-lease
    git checkout ssg-with-cached-data
    git push --force-with-lease
    ```
