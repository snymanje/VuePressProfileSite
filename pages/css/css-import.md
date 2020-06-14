---
title: CSS Import
excerpt: "Importing a CSS file from another CSS file. "
date: 2019-08-20
tags: ["Web"]
keywords: "CSS import"
sidebar: auto
---

# Importing CSS

<br>
<hr>
<br>

From any CSS file you can import another CSS file using the `@import` directive.
Here is how you use it:

```html
@import url(myfile.css)
```

<br>

`url()` can manage absolute or relative URLs.
One important thing you need to know is that `@import` directives must be put before any other CSS in the file, or they will be ignored.
You can use media descriptors to only load a CSS file on the specific media:

```html
@import url(myfile.css) all; @import url(myfile-screen.css) screen; @import
url(myfile-print.css) print;
```
