---
title: CSS Attribute Selectors
excerpt: Looking at attribute selectors in CSS
date: 2019-08-20
tags: ["Web"]
keywords: "CSS Attribute Selectors"
sidebar: auto
---

# **CSS Attribute Selectors**

The first selector type is the attribute presence selector.  
We can check if an element has an attribute using the `[]` syntax.

`p[id]` will select all `p` tags in the page that have an id attribute, regardless of its value:

```css
p[id] {
  /*	...	*/
}
```

<br>

## Exact attribute value selectors

Inside the brackets you can check the attribute value using `=` , and the CSS will be applied only if the attribute matches the exact value specified:

```css
p[id="some-id"] {
  /*	...	*/
}
```

<br>

## Match an attribute value portion

While `=` let us check for exact value, we have other operators:

- `*=` checks if the attribute contains the partial
- `^=` checks if the attribute starts with the partial
- `$=` checks if the attribute ends with the partial
- `|=` checks if the attribute starts with the partial and it's followed by a dash (common in classes, for example), or just contains the partial
- `~=` checks if the partial is contained in the attribute, but separated by spaces from the rest  
  <br>

All the checks we mentioned are **case sensitive**.

If you add an i just before the closing bracket, the check will be case insensitive.
