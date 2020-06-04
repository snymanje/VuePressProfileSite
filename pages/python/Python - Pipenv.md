---
title: Python - Pipenv Cheat Sheet
excerpt: "Settting up pipenv"
date: 2020-01-01
tags: ["python"]
keywords: "pipenv"
sidebar: auto
---

# Pipenv Cheat Sheet

<br>
<hr>
<br>

## Install pipenv

```python
pip3 install pipenv
```

<br>

## Activate

```python
pipenv shell
```

<br>

## Check version of Python

```pythin
python --version
```

<br>

## Check path

```python
python
>>> import sys
>>> sys.executable
quit()
```

<br>

## Install a package

```python
pipenv install camelcase
```

<br>

## Check local packages

```python
pipenv lock -r
```

<br>

## Uninstall a package

```python
pipenv uninstall camelcase
```

<br>

## Install a dev package

```python
pipenv install nose --dev
```

<br>

## Install from requirements.txt

```python
pipenv install -r ./requirements.txt
```

<br>

## Check security vulnerabilities

```python
pipenv check
```

<br>

## Check dependency graph

```python
pipenv graph
```

<br>

## Ignore pipfile

```python
pipenv install --ignore-pipfile
```

<br>

## Set lockfile - before deployment

```python
pipenv lock
```

<br>

## Exiting the virtualenv

```python
exit
```

<br>

## Run with pipenv

```python
pipenv run *
```
