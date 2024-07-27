# astro-craftcms

Demonstration of three approaches to [Astro](https://astro.build/) with content modelled and managed in headless [Craft CMS](https://craftcms.com/).

Read the related articles (more in progress):

1. [Monorepo Setup for Headless Craft CMS
](https://www.olets.dev/posts/monorepo-setup-for-headless-craft-cms/)

2. [SSR Astro With Headless Craft CMS
](https://www.olets.dev/posts/ssr-astro-with-headless-craft-cms/)

<!-- @TODO 3 -->

<!-- @TODO 4 -->

## Requirements

- A Node.js version manager. [asdf](https://asdf-vm.com/) is supported out of the box. If you use something else, add the appropriate config file using the Node.js version specified in `.tool-versions`.
- [DDEV](https://ddev.readthedocs.io/en/stable/) for Docker management.
- [Bun](https://bun.sh/) for Node.js package management.

## Setup

1. Install Node.js dependencies

    ```shell
    bun install
    ```

1. Start the CMS

    ```shell
    bun run cms start
    ```

1. Import the database dump

    ```shell
    bun run cms db:import
    ```

1. Generate a security for Craft

    ```shell
    bun run cms craft setup/security-key
    ```

1. Start and log into Craft CMS (see below) and click on the avatar in the upper right. Update the admin name, email, and password.

1. Create the apps' env files

    ```shell
    cp packages/app-ssg-cache/.env{.example,}
    cp packages/app-ssg-no-cache/.env{.example,}
    cp packages/app-ssr/.env{.example,}
    ```

## Development

### CMS

- Run `packages/cms/package.json` scripts from the project root or from `packages` with

    ```shell
    bun run cms <replace with the script>
    ```

    For example, start Craft CMS with

    ```shell
    bun run cms start
    bun run cms launch
    ```

- Or run `packages/cms/package.json` scripts from the `packages/cms` directory or one of its subdirectories with

    ```shell
    bun run <replace with the script>
    ```

    For example, start Craft CMS with

    ```shell
    bun run start
    bun run launch
    ```

To run other [DDEV commands](https://ddev.readthedocs.io/en/stable/users/usage/commands/), including managing the CMS's dependencies, `cd` to `packages/cms` and run `ddev` commands (e.g. `ddev add …`).

To log in to the Craft CMS control panel, visit <https://astro-craftcms.ddev.site/admin>. Out of the box, these are the admin credentials — _**change them**_

username | password | email
---|---|---
admin | changeme | changeme@example.com

### App

#### SSR

[SSR Astro With Headless Craft CMS
](https://www.olets.dev/posts/ssr-astro-with-headless-craft-cms/) is a guide to building this app.

Basics of working with it:

- Run `packages/app-ssr/package.json` scripts from the project root or from `packages` with

    ```shell
    bun run app-ssr <replace with the script> # e.g. `bun run app-ssr dev` or `bun run app-ssr start` to start the app
    ```

    For example, to start the SSR app run

    ```shell
    bun run app-ssr dev # or `bun run app-ssr start`
    ```

- Or run `packages/app-ssr/package.json` scripts from the `packages/app-ssr` directory or one of its subdirectories with

    ```shell
    bun run <replace with the script>
    ```

    > [!TIP]
    > The `dev`/`start` script has nicer terminal output when run this way than when run from the project root or `packages`.

    For example, to start the app run

    ```shell
    bun run dev # or `bun run app-ssr start`
    ```

To manage the Astro app's Node.js dependencies, `cd` to `packages/app-ssr` and run `bun` commands (e.g. `bun add …`).

#### SSG with prebuilt site

> [!WARNING]  
> Still a work in progress

<!-- []() is a guide to building this app. -->

- Run `packages/app-ssg-no-cache/package.json` scripts from the project root or from `packages` with

    ```shell
    bun run app-ssg-no-cache <replace with the script> # e.g. `bun run app-ssg-no-cache dev` or `bun run app-ssg-no-cache start` to start the app
    ```

    For example, to start the SSG app run

    ```shell
    bun run app-ssg-no-cache dev # or `bun run app-ssg-no-cache start`
    ```

- Or run `packages/app-ssg-no-cache/package.json` scripts from the `packages/app-ssg-no-cache` directory or one of its subdirectories with

    ```shell
    bun run <replace with the script>
    ```

    > [!TIP]
    > The `dev`/`start` script has nicer terminal output when run this way than when run from the project root or `packages`.

    For example, to start the app run

    ```shell
    bun run dev # or `bun run app-ssg-no-cache start`
    ```

To manage the Astro app's Node.js dependencies, `cd` to `packages/app-ssg-no-cache` and run `bun` commands (e.g. `bun add …`).

##### Deploying

Run the `build` script, and then upload and serve `packages/app-ssg-no-cache/dist`.

#### SSG with cached data

> [!WARNING]  
> Still a work in progress

<!-- []() is a guide to building this app. -->

- Run `packages/app-ssg-cache-cache/package.json` scripts from the project root or from `packages` with

    ```shell
    bun run app-ssg-cache <replace with the script> # e.g. `bun run app-ssg-cache dev` or `bun run app-ssg-cache start` to start the app
    ```

    For example, to start the SSG app run

    ```shell
    bun run app-ssg-cache dev # or `bun run app-ssg-cache start`
    ```

- Or run `packages/app-ssg-cache/package.json` scripts from the `packages/app-ssg-cache` directory or one of its subdirectories with

    ```shell
    bun run <replace with the script>
    ```

    > [!TIP]
    > The `dev`/`start` script has nicer terminal output when run this way than when run from the project root or `packages`.

    For example, to start the app run

    ```shell
    bun run dev # or `bun run app-ssg-cache start`
    ```

To manage the Astro app's Node.js dependencies, `cd` to `packages/app-ssg-cache` and run `bun` commands (e.g. `bun add …`).

##### Deploying

Run the `cache` script, commit and push, and then on the server run the `build` script and serve `packages/app-cache/dist`.
