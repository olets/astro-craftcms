# astro-craftcms

Starter project for SSG [Astro](https://astro.build/) with [Craft CMS](https://craftcms.com/) as the content source.

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

1. Start and log into Craft CMS (see below) and click on the avatar in the upper right. Update the admin name, email, and password.

## Development

From the project root, run

- `bun run dev` or `bun run start` (they do the same thing) to start the CMS and the app
- `bun run build` to build the app
- `bun run preview` to preview the built app

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

#### SSG

- Run `packages/app-ssg/package.json` scripts from the project root or from `packages` with

    ```shell
    bun run app-ssg <replace with the script> # e.g. `bun run app-ssg dev` or `bun run app-ssg start` to start the app
    ```

    For example, to start the SSG app run

    ```shell
    bun run app-ssg dev # or `bun run app-ssg start`
    ```

- Or run `packages/app-ssg/package.json` scripts from the `packages/app-ssg` directory or one of its subdirectories with

    ```shell
    bun run <replace with the script>
    ```

    > [!TIP]
    > The `dev`/`start` script has nicer terminal output when run this way than when run from the project root or `packages`.

    For example, to start the app run

    ```shell
    bun run dev # or `bun run app-ssg start`
    ```

To manage the Astro app's Node.js dependencies, `cd` to `packages/app-ssg` and run `bun` commands (e.g. `bun add …`).
