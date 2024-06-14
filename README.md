# astro-craftcms

Starter project for [Astro](https://astro.build/) with [Craft CMS](https://craftcms.com/) as the content source.

## Requirements

- A Node.js version manager. [asdf](https://asdf-vm.com/) is supported out of the box. If you use something else, add the appropriate config file using the Node.js version specified in `.tool-versions`.
- [DDEV](https://ddev.readthedocs.io/en/stable/) for Docker management.
- [Bun](https://bun.sh/) for Node.js package management.

## Setup

```shell
# Install Node.js dependencies
bun install
```

## Development

### CMS

Start Craft CMS:

```shell
cd packages/cms
ddev start
ddev launch
```

Log in to the Craft CMS control panel:

Visit <https://astro-craftcms.ddev.site/admin>.

Credentials:

username | password | email
---|---|---
admin | changeme | changeme@example.com

### App

Run Astro `package.json` scripts from any directory with

```shell
# from anywhere in the project
bun run --filter app <replace with the script>
```

or from the `packages/app` directory with

```shell
# from packages/app
bun run <replace with the script>
```

Start Astro by running the `dev` or `start` script (they're identical).
