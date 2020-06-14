---
title: HTML Basics - Text tags
excerpt: "All the tags to interact with	text"
date: 2019-08-06
tags: ["Web"]
keywords: "html basics"
sidebar: auto
---

# HTML Basics - The document body

<br>
<hr>
<br>

Between the closing head tag and the closing html tag we only have the body tag and only one of them.
Inside of this tag we place all the tags to make up the content on the page.

## Block elements vs inline elements

Block elements do not allow other elements next to them, inline elements do.
This behaviar can be changed using CSS display property.  
<br>

## The `<p>` tag

This tag creates a paragraph of text.
Type: Block element.

```html
<p>This is a paragraph</p>
<p>This is another paragrapp</p>
```

<br>

## The `<span>` tag

This tag can be used to create a section inside a paragraph, that you can target with CSS.  
Type: Inline element.

```html
<p>This is a paragraph <span>This test will be styled with css</span></p>
```

<br>

## The `<br>` tag

This tag creates a line break. Can be used to create a line break in a paragraph.  
Type: Inline element.

```html
<p>
  This is a paragraph <br />
  more text in a new line
</p>
```

<p>This is a paragraph <br> more text in a new line</p>
<br>

## The `<h1>` - `<h6>` tags

From big to small and most important to least important, we have `h1`, `h2`,`h3`,`h4`,`h5`,`h6`.
You should always only have one `h1` element on a page. headings are important to SEO.

Type: Block element.

```html
<h1>Biggest</h1>
<h2>Smaller than h1</h2>
<h3>Smaller that h2</h3>
<h4>Smaller that h3</h4>
<h5>Smaller that h4</h5>
<h6>Smallest</h6>
```

<br>

## The `<strong>` tag

This tag marks text as _**strong**_, to show it's important.
Type: Inline element.

```html
<p>This is a paragraph <strong>of text</strong></p>
```

<p>This is a paragraph of <strong>text</strong></p>
<br>

## The `<em>` tag

This tag is used to mark the text as _emphasized_. It's not a visual hint but a semantic hint.  
Type: Inline element.

```html
<p>This is a paragraph of <em>text</em></p>
```

<p>This is a paragraph of <em>text</em></p>
<br>

## The `<blockquote>` tag

The `<blockquote>` tag specifies a section that is quoted from another source.
Browsers usually indent `<blockquote>` elements.  
Type: Block element.

```html
<blockquote>This is a blockquote</blockquote>
```

<blockquote>This is a blockquote</blockquote>
<br>

## The `<hr>` tag

This tag creates a horizontal line, this can be used to create separation between content.  
Type: Block element.

```html
<p>We are separated by a hr tag</p>
<hr />
<p>We are separated by a hr tag</p>
```

<p>We are separated by a hr tag</p>
<hr>
<p>We are separated by a hr tag</p>
<br>

## The `<code>` tag

This tag is very useful to show code blocks.  
Type: Block element.

```html
<pre>
    <code>
    console.log("This tag can be used to display code like this");
    console.log("And like this");
    </code>
</pre>
```

You have to wrap the code block with a `<pre>` tag otherwise whitespace will be igored and all the text will be displayed in one line.  
By default the browser will apply styling to the pre tag similar to this.

```css
pre {
  display: block;
  font-family: monospace;
  white-space: pre;
  margin: 1em 0px;
}
```

## Lists

There 3 types of lists,

1. unordered list
2. ordered list
3. definition list ( rarely used )

## The `<ul>` tag

This tag creates a undordered list and each item in the list are presented with a `<li>` tag.  
Type: Block element.

```html
<ul>
  <li>item1</li>
  <li>item2</li>
</ul>
```

<ul>
    <li>item1</li>
    <li>item2</li>
</ul>  
<br>

## The `<ol>` tag

This tag creates a ordered list and each item in the list are presented with a `<li>` tag.  
Type: Block element.

```html
<ol>
  <li>item1</li>
  <li>item2</li>
</ol>
```

<ol>
    <li>item1</li>
    <li>item2</li>
</ol>  
<br>

## Other text tags for presentational purposes.

## The `<mark>` tag

```html
<mark>mark</mark>
```

<mark>mark</mark>
<br>

## The `<ins>` tag

```html
<ins>ins</ins>
```

<ins>ins</ins>
<br>

## The `<del>` tag

```html
<del>del</del>
```

<del>del</del>
<br>

## The `<sup>` tag

```html
<p>2 x 4<sup>8</sup></p>
```

<p>2 x 4<sup>8</sup></p>
<br>

## The `<sub>` tag

```html
<p>$16<sub>p/p</sub></p>
```

<p>$16<sub>p/p</sub></p>
<br>

## The `<small>` tag

```html
<p>This is normal text<small>This is small text</small></p>
```

<p>This is normal text <small>and this is small text</small></p>
<br>

## The `<i>` tag

```html
<i>This is text in a i tag</i>
```

<i>This is text in a i tag</i>
<br>

## The `<b>` tag

```html
<b>This is text in a b tag</b>
```

<b>This is text in a b tag</b>
<br>

## Links

Links are created using the `<a>` tag and it's destination can be set with the `href` attribute.
The link name can be added between the opening and closing tag.

```html
<a href="https://jeansnyman.com">Home</a>

// it can also be a relative url
<a href="/blog/">Blog</a>

//To open a link in a new tab
<a href="/blog/" target="_blank">Blog</a>

//The link text can also be replaced with anything else like an image.
<a href="https://jeansnyman.com">
  <img src="some_image.jpg" alt="image" />
</a>
```
