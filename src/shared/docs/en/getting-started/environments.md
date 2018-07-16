## Overview

Begin offers three hosted environments out of the box: `testing`, `staging`, and `production`. (Of course, Begin also supports full [local development](/en/getting-started/quickstart/#working-locally).)

Your `testing`, `staging`, and `production` environments have independent, fully configurable variables in Begin, with the environment name available by default under `NODE_ENV`.

Configured variables are available to all routes within each environment at runtime.


## Adding variables

To add your environment variables, open `Environments` in the left nav in Begin.

Under the environment you want to add a variable to (i.e. `staging`), add your key and value, and click `Add`.

This variable is now available to all your routes in `staging`.

> Note: keys can only contain upper case alphanumeric characters and underscores (`[A-Z0-9_]`), and must start with a letter. Values are limited to 255 characters.


## Editing variables

To modify an existing variable, overwrite it with a new variable with the key you want to overwrite.

To delete a variable, simply click the red delete icon.
