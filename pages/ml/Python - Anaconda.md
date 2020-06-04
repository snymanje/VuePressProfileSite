---
title: Python - Miniconda Guide.
excerpt: "How to create a new environment and install packages."
date: 2020-04-16
tags: ["python"]
keywords: "python miniconda guide"
sidebar: auto
---

# Miniconda Guide

<br>
<hr>
<br>

Miniconda is a free minimal installer for conda.  
It is a small, bootstrap version of Anaconda that includes only conda, Python, the packages they depend on, and a small number of other useful packages, including pip, zlib and a few others.

<br>

> Download and install the latest version of Miniconda.
> Then open the Anaconda Prompt

<br>

## Create new environment

<br>

First create a new folder where you want to create the new environment, like sampleProject1...then cd into this directory.

```bash
conda create --prefix ./env
```

<br>

## Activate environment

Change your directory location....

```bash
conda activate C:\WorkingDir\Development\Python\PyCourse\sampleProj1\env
```

<br>

## Install packages

Now install the required packages

```bash
conda install pandas numpy matplotlib scikit-learn
```

<br>

## List all environments

```bash
conda env list
```

<br>

## Open previous environment

Change your directory location....

```bash
conda activate C:\WorkingDir\Development\Python\PyCourse\sampleProj1\env
```

<br>

## Open Jupyter Notebook

Once your environment is activated, run jupter notebook

```bash
jupyter notebook
```

<br>

## Install package in jupyter notebook

```python
import sys
!conda install --yes --prefix {sys.prefix} textblob
```
