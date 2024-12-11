# @invitation-homes/leasing-application-webclient

## What is this project

Leasing Application is a customer facing website used to apply to lease an Invitation Homes property.

This project is powered by [sveltejs/kit](https://svelte.dev/blog/svelte-3-rethinking-reactivity).

## Where can I see this project running

#### Production: https://www.invitationhomes.com/lease?property=1017-hess-rd-concord-nc-28025

#### Development: https://www.devinvh.com/lease?property=1017-hess-rd-concord-nc-28025

## Setup for Local Development

These instructions assume that you have Git cli and Homebrew installed.

### Setup up SSH

- Check for [existing SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys)

- Create a [new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

- Add your [SSH key to Github](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

Clone the repo

```
git clone git@github.com:invitation-homes/leasing-application-webclient.git
```

### Install requirements

- Install Volta

  ```
  brew install volta
  ```

- Install Node

  ```
  brew install node
  ```

- Install Yarn
  ```
  npm install -g yarn
  ```

## Environment Variables

### First time running project:

1. Make sure you have `heroku-cli` installed:

   - `brew tap heroku/brew && brew install heroku`

2. Make sure you have access to the Heroku app for Customer-Profile-Webapp

3. Run `source create-env.sh`

### Add new environment variable

1. Add it to the file `config/variables.js`
   - Client side variables should be prefixed with `VITE_`.
   - For example: `VITE_INVH_DOMAIN_NAME`.

### Using environment variables

#### On the client

When consuming environment variables on the client side we use the `Config` class imported from `$lib/config/environment.client`.

Example

```javascript
import { ClientConfig } from "$lib/config/environment.client";

const plsURL = ClientConfig.env.VITE_PLS_URL;
```

#### On the server

For server side evnironment variables the prefix `VITE_` is not required. And we use the `default` exported from `$lib/config/environment.server`

Example

```javascript
import { config } from "$lib/config/environment.server";

const awsAPIKey = config.env.AWS_API_KEY;
```

### Checking access and environment for Heroku

- Visit [Heroku Development App Settings](https://dashboard.heroku.com/apps/customer-website-dev/settings)

  > It might be the case that you don't have access to the Heroku settings page, request for access to it from a member with admin role, check users in [Heroku Development App Access](https://dashboard.heroku.com/apps/customer-website-dev/access).

- Click 'Reveal Config Vars' or visit contentful web app and navigate Settings > Api keys > local development

- Where values are missing from your .env file copy the values from the DEV settings. (Note it is important to ensure that you are in the **DEV** app settings)

- If you need any help with this step you can also just ask a fellow developer for some help.

### Environment Variables to Get the Client Ip Address

For us to be able to capture the correct IP address from the client we need to set two environment variables:

- `ADDRESS_HEADER`: set it to `X-Forwarded-For`.
- `XFF_DEPTH`: set it to `3`.

Read more about this here: https://github.com/sveltejs/kit/tree/master/packages/adapter-node#address_header-and-xff_depth

## Node version

- Check Node version

  > Generally latest and is specified in the package.json

  ```sh
  volta install node
  ```

  ```sh
  volta setup
  ```

## Setup domain for cookies

- Open the file `/etc/hosts` with root privileges:

```sh
$ sudo vi /etc/hosts
```

- Add a hostname for localhost:

```sh
127.0.0.1   localhost.devinvh.com
```

- Ensure that the environment variables are setup correctly

```javascript
# .env file
...
export LEASING_APPLICATION_WEB_URL='https://localhost.devinvh.com:3000/lease'
...
```

## Run the project

- And now to run the project
  ```sh
  source .env && yarn && yarn dev --https --host
  ```

You will see alot of stuff flash by and then access using your application url
Starting a new application for a property
`http://localhost.devinvh.com:3000/lease?property={the-property-slug}`

Accessing a current application
`http://localhost.devinvh.com:3000/lease/application{the-application-id}`

> You may receive a message blocking the access because of the self-signed certificate, check your browser on how to bypass that (for Chromium-based, you need to select "Advanced" and proceed anyway).

## Debugging the project

In order to debug the project you first need to know if you want to debug client side or server side code.

### Client Side

For client side code simply add the Svelte debug tag in the Svelte file you want to debug.

```svelte
{@debug yourVariable}
```

In your browser of choice navigate to the page in question with Developer Tools opened and the page should interrupt when rendering.

### Server Side

Debugging server side code is accomplished with a remote debugger. To setup and connect the remote debugger:

1. Start the debugging server
   ```sh
   source .env && yarn && yarn debug
   ```
1. Attach the VSCode Debugger
   1. In VSCode navigate to the Debugger (⇧⌘D)
   1. On the top of the debugger select `"Remote Debug Svelte:9229"`
   1. Click the green arrow to run
1. With the debugger attached you can now add debugger; keywords to indicate where you'd like the process to stop.
   ```javascript
   function someFunction() {
     debugger; //execution will pause here
     logger.info("After breakpoint");
   }
   ```
