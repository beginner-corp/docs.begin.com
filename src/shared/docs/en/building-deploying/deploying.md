## Overview

Deploying to Begin is as simple as pushing to `master` or cutting a git tag. More information about the [Begin build pipeline is also available here](/en/building-deploying/builds/).

Deployments to `staging` and `production` take only seconds are instantly available at scale – enjoy the benefits of near-instant iteration with frequent pushes!


## Deploying to `staging`

Each commit to `master` kicks off Begin CI within a few moments of your push.

The last step for each green build is a `staging` deploy.


## Deploying to `production`

Deploys to `production` can only occur when the latest `staging` build is green. Cut a `production` release by:
  - Using the `Deploy to Production` button in the left nav in Begin, or
  - Creating a [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging), i.e.:
```bash
git tag -a 1.0.1 -m "This release includes 20% more cowbell"
git push origin 1.0.1
```
  - Or also by cutting a [GitHub Release](https://help.github.com/articles/creating-releases/)

> 👓 Note: We strongly encourage the use of [SemVer](https://semver.org/) when creating `production` releases!
