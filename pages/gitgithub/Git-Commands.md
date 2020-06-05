---
title: Git and GitHub Basics
excerpt: "A list of git commands I use on a daily basis."
date: 2020-01-04
tags: ["GIT"]
keywords: "git commands"
sidebar: auto
---

# Git and GitHub Basics

<br>
<hr>
<br>

![whyIusegit](/assets/images/Git/whyIusegit.jpg)

![GitHub](/assets/images/Git/github.jpg)

## Git Configs

```bash
# Tell git how you are

git config --global user.name jeansn

git config --global user.email jeansn123@gmail.com

git config user.name

```

<br>

## How Git works

![repo](/assets/images/Git/repo.jpg)

![commits](/assets/images/Git/commits.jpg)

![commits](/assets/images/Git/commits2.jpg)

<br>

## Create a New Git Repository

<br>

This creates a .git folder in the root directory that tracks all the changes to the files.

```bash
git init
```

<br>

To exclude any files from being tracked you need to add a .gitinore file in the root of you project and add the files or folders that should be excluded.

```bash
# In the file you can add thing like this
node_modules
dist
.cache
```

<br>

## Staging Files

<br>

![staging1](/assets/images/Git/staging1.jpg)

```bash
#Check which files are in the staging area
git status
# staged files will be in green

# Add file to staging
git add <path to file>  # git add src\assets\images\Git\github.jpg

# remove file from staging
git rm --cache <path to file>  # git rm --cache src/assets/images/Git/github.jpg

# Add all files to staging at once
git add .
```

<br>

## Commiting Files

<br>

![commiting](/assets/images/Git/commiting.jpg)

```bash
# Commiting staged files
git commit -m "created git blog post"

# review commit history
git log

# condenced
git log --oneline
```

<br>

## Undoing Things

<br>

![undoingThings](/assets/images/Git/undoingThings.jpg)

```bash
# Checkout commit ( Shows the code at a point in time )
git log --oneline
git checkout 5bb549d
# go back to current
git checkout master

# Revert commit ( Undo commit )
git revert 5bb549d
# to get out of the file
:wq

# Reset commit  ( Remove all commits to a point in time, files become uncommited )
git reset 5bb549d

```

<br>

## Branches

<br>

![branches](/assets/images/Git/branches.jpg)

```bash
# create a branch
git branch <name> # git branch feature-1

# list branches
git branch -a

# switch to different branch
git checkout <branch name> # git checkout feature-1

# delete a branch
 git branch -D <branch name> #  git branch -D feature-1

 # create branch and switch to it
 git checkout -b <branch name> # git checkout -b feature-1

```

<br>

## Merging Branches

<br>

```bash
# first check out the branch where you are merging into
git checkout master

git merge feature-1

```

<br>

## GitHub

<br>

![github2](/assets/images/Git/github2.jpg)

<br>

## Add remote branch in VSCode ( when remote repository already exists )

```bash
#Start new local repository
git init
git remote add origin https://github.com/user/repo.git
# Set a new remote

git remote -v
# Verify new remote
> origin  https://github.com/user/repo.git (fetch)
> origin  https://github.com/user/repo.git (push)

git pull origin master
```

<br>

**_ Remote name already exists_**

## Rename remote

```bash
git remote -v
# View existing remotes
> origin  https://github.com/OWNER/REPOSITORY.git (fetch)
> origin  https://github.com/OWNER/REPOSITORY.git (push)

git remote rename origin destination
# Change remote name from 'origin' to 'destination'

git remote -v
# Verify remote's new name
> destination  https://github.com/OWNER/REPOSITORY.git (fetch)
> destination  https://github.com/OWNER/REPOSITORY.git (push)
```

<br>

## Delete remote

```bash
git remote -v
# View current remotes
> origin  https://github.com/OWNER/REPOSITORY.git (fetch)
> origin  https://github.com/OWNER/REPOSITORY.git (push)
> destination  https://github.com/FORKER/REPOSITORY.git (fetch)
> destination  https://github.com/FORKER/REPOSITORY.git (push)

git remote rm destination
# Remove remote
git remote -v
# Verify it's gone
> origin  https://github.com/OWNER/REPOSITORY.git (fetch)
> origin  https://github.com/OWNER/REPOSITORY.git (push)
```

<br>

## Clone a Repo

```bash
git clone <repo link>
```

<br>

## Push Code to Repo

```bash
git push origin master
```

<br>

## Pull Code Changes from Remote Repo

```bash
git pull origin master
```

Thanks for reading!
