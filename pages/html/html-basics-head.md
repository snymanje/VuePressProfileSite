---
title: HTML Basics - The heading
excerpt: "All the basics around the head of the html document."
date: 2019-08-03
tags: ["HTML"]
keywords: "html basics"
sidebar: auto
---

# HTML Basics

<br>
<hr>
<br>

## HTML page structure

It starts with the Document Type Declaration, this is a way to tell the browser this is an HTML page, and which version of HTML we are using.

```html
<!DOCTYPE html>
```

<br>

Next we have the html tag, always at the beginning after doctype

```html
<!DOCTYPE html>
<html>
  ....
</html>
```

Most tags come in pairs with an opening tag and a closing tag, there are a few tags that are self closing.

Inside the html tags we get the head and body tags.
Head is where we put the **title**, **metadata**, **css** and **javascript**.

Body is where we will put all our visual page content.

```html
<!DOCTYPE html>
<html>
  <head>
    ....
  </head>
  <body>
    ....
  </body>
</html>
```

<br >

### Attributes

Attributes can be added to the starting tag of an element. They can include things like **classes**, **ids** and **data-\*** attributes. They have a **key="value"** syntax.

```html
<p class="className">This is a paragraph</p>
```

or multiple attributes

```html
<p id="p-id" class="className" data-key="67">This is a paragraph</p>
```

<br>

## The head tag

<br>

### Title tag

The title tag is very important for SEO optimization.

### The script tag

The script tag could contain a link to an external script or the javascript could be writen between the opening and closing tags.
Sometimes this tag is used at the bottom of the page, just before the closing body tag, this is for better performance. Putting it at the bottom will load the whole page first before the script is executed. In modern JavaScript we should rather keep it in the head and use the defer attribute.
When the **defer** attribute is present the browser will load the script only when the parsing of the page is done.
You can also use a attribute called **async** to load the script asynchronously with the rest of the page.

```html
<head>
  <title>Software Engineering</title>
  <script defer src="somejsfile.js"></script>
  <!-- or  -->
  <script async src="somejsfile.js"></script>
  <script>
    console.log("You can write js here as well.");
  </script>
  <link />
</head>
```

### The noscript tag

You can use this tag to detect if javascript is enabled in the browser.
It can be used in both the `<head>` and body>```.
When it's used inside the head element, it must contain only **link**, **style** and **meta** elements.
When it's part of the body it can contain content including other tags.

```html
<head>
  <noscript>
    <style>
      .js-disabled {
        display: block;
      }
    </style>
  </noscript>
  <link />
</head>
```

### The link tag

The `<link>` tag is commonly used for linking to an external style sheet. But it can also be used for other purposes such as assisting search engines by providing links to relevant resources, and providing information on the website's navigational structure, etc.

```html
<!DOCTYPE html>
<html>
  <head>
    <link href="file.css" rel="stylesheet" />
  </head>
</html>
```

#### Attributes for the link tag includes,

**href** - Specifies the location of the linked document,
**crossorigin** - Specifies how the element handles cross-origin requests ( anonymous || use-credentials )
**media** - Specifies on what device the linked document will be displayed

```html
<link href="file.css" media="screen" rel="stylesheet" />
<link href="print.css" media="print" rel="stylesheet" />
```

**rel** - Required. Specifies the relationship between the current document and the linked document, they include,
alternate
author
dns-prefetch
help
icon
license
next
pingback
preconnect
prefetch
preload
prerender
prev
search
stylesheet
**size** - Specifies the size of the linked resource. Only for rel="icon"
**type** - Specifies the media type of the linked document

#### Linking a favicon

```html
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="/assets/appletouch-icon.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="32x32"
  href="/assets/fav icon-32x32.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="16x16"
  href="/assets/fav icon-16x16.png"
/>
```

### The style tag

When you are not linkning an external style sheet you can use the style element to hold the css.

```html
<html>
  <head>
    <style>
      .box {
        background: white;
        color: red;
      }
    </style>
  </head>
  <body></body>
</html>
```

### The base tag

The `<base>` tag specifies the base URL/target for all relative URLs in a document.
There can be at maximum one `<base>` element in a document, and it must be inside the <head> element.

```html
<html>
  <head>
    <base href="https://www.w3schools.com/" target="_blank" />
  </head>
  <body>
    <img src="images/stickman.gif" width="24" height="39" alt="Stickman" />
    <a href="tags/tag_base.asp">HTML base Tag</a>
  </body>
</html>
```

### The meta tag

The `<meta>` tag provides metadata about the HTML document. Metadata will not be displayed on the page, but will be machine parsable.
Meta elements are typically used to specify page description, keywords, author of the document, last modified, and other metadata. Very important to SEO...
The charset meta tag is used to set the page character encoding. **utf-8** in most case

```html
<head>
  <meta charset="UTF-8" />
  <meta name="description" content="Free Web tutorials" />
  <meta name="keywords" content="HTML,CSS,XML,JavaScript" />
  <meta name="author" content="John Doe" />
</head>
```

HTML5 introduced a method to let web designers take control over the viewport (the user's visible area of a web page), through the <meta> tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

A `<meta>` viewport element gives the browser instructions on how to control the page's dimensions and scaling.

The width=device-width part sets the width of the page to follow the screen-width of the device (which will vary depending on the device).

The initial-scale=1.0 part sets the initial zoom level when the page is first loaded by the browser.

The robots meta tag instructs the Search Engine bots whether to index a page and follow links, default is index and follow.

```html
<meta name="robots" content="noindex, nofollow" />
```

You can alo use the following meta tag to **redirect** a page somewhere else.
Change the content value to get redirected immediately.

```html
<meta http-equiv="refresh" content="5; url=http://jeansnyman.com/blog" />
```

X-UA-Compatible is a document mode meta tag that allows web authors to choose what version of Internet Explorer the page should be rendered as. ie-edge will use the latest version.

```html
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
```
