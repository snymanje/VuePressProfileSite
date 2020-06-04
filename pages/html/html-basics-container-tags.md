---
title: HTML Basics - Container tags
excerpt: "Looking at the container tags like main, footer, etc"
date: 2019-08-07
tags: ["html"]
keywords: "html basics"
sidebar: auto
---

# HTML Basics - The container tags

<br>
<hr>
<br>

HTML have a set of container tags and those tags contain an unspecified set of other tags.
They are,

```html
<article></article>
<section></section>
<div></div>
```

<br>
<hr>
<br>

## article

The `<article>` tag specifies independent, self-contained content.
An article should make sense on its own and it should be possible to distribute it independently from the rest of the site.
Potential sources for the `<article>` element:

- Forum post
- Blog post
- News story
- Comment

It should contain a title with an (`h1 - h6`) tag.

```html
<article>
  <h1>Google Chrome</h1>
  <p>
    Google Chrome is a free, open-source web browser developed by Google,
    released in 2008.
  </p>
</article>
```

<br>
<hr>
<br>

## section

The `<section>` tag defines sections in a document, such as chapters, headers, footers, or any other sections of the document.

It should contain a title with an (`h1 - h6`) tag.

```html
<section>
  <h1>Services</h1>
  <p>We provide the following....</p>
</section>
```

<br>
<hr>
<br>

## div

The `<div>` tag defines a division or a section in an HTML document.
It's a generic container element that you can use where existing tags are not suited.

```html
<div style="background-color:lightblue">
  <h3>This is a heading</h3>
  <p>This is a paragraph.</p>
</div>
```

<br>
<hr>
<br>

# Page tags

## nav

The `<nav>` tag defines a set of navigation links.
Notice that NOT all links of a document should be inside a `<nav>` element.
The `<nav>` element is intended only for major block of navigation links.

Browsers, such as screen readers for disabled users, can use this element to determine whether to omit the initial rendering of this content.

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>
</nav>
```

<br>
<hr>
<br>

## aside

The `<aside>` element is used to identify content that is related to the primary content of the webpage, but does not constitute the primary content of the page. Author information, related links, related content, and advertisements are exampes of content that may be found in an aside element.

```html
<div>
  <p>some text..</p>
  <aside>
    <p>A quote..</p>
  </aside>
  <p>other text...</p>
</div>
```

<br>
<hr>
<br>

## header

The `<header>` element is used to identify content that precedes the primary content of the web page and often contains website branding, navigation elements, search forms, and similar content that is duplicated across all or most pages of a website.
It is used to define a header section for the element that contains it. It can be used as a header for a whole page (the most common usage), but can also be used as the header for an article or any other piece of on-page content.

As a page header

```html
<body>
  <header>
    <a src="/" id="logo">Site Title</a>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
</body>
```

As a section header

```html
<article>
  <header>
    <h2>Title of Article</h2>
    <span class="byline">by Arthur T. Writer</span>
  </header>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</article>
```

<br>
<hr>
<br>

## main

The `<main>` element is used to denote the content of a webpage that relates to the central topic of that page or application. It should include content that is unique to that page and should not include content that is duplicated across multiple webpages, such as headers, footers, and primary navigation elements.
The `<main>` element can only be used once in each HTML file.

<br>
<hr>
<br>

## footer

The `<footer>` element is a structural element used to identify the footer of a page, document, article, or section.
A `<footer>` typically contains copyright and authorship information or navigational elements pertaining to the contents of the parent element.

```html
<!DOCTYPE html>
<html>
  <head>
    . . .
  </head>
  <body>
    <header>
      <h1><!-- Site or Page Title --></h1>
      <nav><!-- main navigation --></nav>
    </header>
    <main>
      <article>
        <!-- main article content -->
      </article>
    </main>
    <aside>
      <!-- sidebar -->
    </aside>
    <footer>
      <section>
        <!-- Copyright Info -->
      </section>
      <address>
        <!-- Contact Info -->
      </address>
    </footer>
    <script>
      // Javascript
    </script>
  </body>
</html>
```
