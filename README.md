# local-events

We are building a development tracker toolkit, using Sanity & Next.js, that anyone can use to create a development tracker for their city.

## Before you start

You should already have:
- A GitHub account,  [generated an SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) and [added the key to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account).
- `git` should be installed on your computer. Verify this by running `git --version` in a terminal.
- A text editor installed: [Visual Studio Code](https://code.visualstudio.com/) is a popular choice that integrates well with GitHub.

## Create your own copy of this site

- Fork this repository, using the "Fork" button at the top right of this page.
- You may want to [rename your repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository) to something more meaningful.
- From a terminal, clone your newly-forked repository to your local computer, using your Git username and repository name instead of the placeholders here:

```
git clone git@github.com:<my-github-username>/<my-repository-name>.git
```

- This should create a new folder, `<my-repository-name>`, in the current directory.
- Change into that folder, which is the root directory of your new site:

```
cd <my-repository-name>
```

## Configure your local copy

- From a terminal, run `npm install` in the root directory.
- Open a text editor: if you're using Visual Studio Code, running `code .` in the terminal should open the site folder in a new window.
- Rename the `.env.development.example` and to `.env.development.local`, and populate it with your specific environment variables.
  - You will need to sign up for [Mapbox]() to obtain these values.
  - See [environment variables](#environment-variables) for more information about these values.
- From a terminal, `yarn dev` in the root directory: this will start the development server.
- If you see the toolkit running in your browser, congrats! You can now make changes to the site, or your CMS, and you should see them live in the site.

## Customizing the site

## Deploying the site to Netlify

- Log in to Netlify with your GitHub account.
- Link your site's GitHub repository to your Netlify account.
- Populate your environment variables in Netlify

## Environment variables

- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`: The Mapbox access token for your project. You can find this on your Mapbox [account page](https://www.mapbox.com/account/).

## Additional functionality

### Fetching data from other sources


