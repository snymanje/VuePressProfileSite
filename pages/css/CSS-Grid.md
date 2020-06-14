---
title: Build a responsive CSS Grid.
excerpt: "Build a responsive layout with CSS Grid"
date: 2019-09-10
tags: ["Web"]
keywords: "CSS Grid responsive layout"
sidebar: auto
---

# CSS Grid Introduction

<br>
<hr>
<br>

CSS Grid is a fundamentally new approach to building layouts using CSS.  
CSS Grid and Flexbox are not competing technologies. CSS Grid works on 2 dimensions (rows AND columns) while Flexbox works on a single dimension (rows OR columns).

Here's a list of all the properties available in CSS Grid.
![CSS Grid Properties](/assets/images/CSS-Grid-Properties.jpg)

## Grid basics.

For a good introduction to the basics of CSS Grid, please read this blog by [Flavio](https://flaviocopes.com/css-grid/ "CSS Grid").  
And also this link on naming grid lines, [Grid lines](https://gedd.ski/post/naming-css-grid-lines/ "CSS Grid")

What I'm doing differently in my example is that I'm naming my grid lines.
Naming lines is useful when creating a responsive design where you redefine the grid, rather than then needing to redefine the content position by changing the line number in your media queries, you can ensure that the line is always named the same in your definitions.  
Have a look at the [mozilla developer docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout "CSS Grid") for me details on this.

## Let's create a basic grid.

<br>

This will be the very simple desktop layout
![grid-desktop-layout](/assets/images/grid-desktop-layout.jpg)

And when the viewport gets smaller the sidebar moves to the top and the boxes will collaps.  
![grid-mobile-layout](/assets/images/grid-mobile-layout.jpg)

The html is very basic, we have a header, sidebar, main then another container with content and lastly the footer.

```html
<body>
  <div class="container">
    <div class="header">Header</div>
    <div class="sidebar">Sidebar</div>
    <div class="main">Main</div>
    <div class="box">
      <div class="box-1">Box-1</div>
      <div class="box-2">Box-2</div>
      <div class="box-3">Box-3</div>
      <div class="box-4">Box-4</div>
    </div>
    <div class="footer">Footer</div>
  </div>
</body>
```

The CSS is where it all happens.

```css
.container {
  width: 80%;
  background-color: #efefef;
  marin: auto;

  display: grid;
  grid-template-rows: repeat(5, min-content);
  grid-template-columns:
    [full-start sidebar-start] minmax(180px, 200px)
    [sidebar-end center-start] repeat(
      8,
      [col-start] minmax(min-content, 1fr) [col-end]
    )
    [full-end];
  grid-gap: 0.5rem;
}

@media only screen and (max-width: 1000px) {
  .container {
    grid-template-columns:
      [full-start center-start] repeat(
        8,
        [col-start]minmax(min-content, 1fr) [col-end]
      )
      [full-end];
  }
}

.container div {
  font-size: 1.5rem;
  text-align: center;
  padding: 1rem;
  color: black;
}

.header {
  background-color: greenyellow;
  grid-column: full-start / full-end;
  grid-row: 1 / 2;
}

.sidebar {
  background-color: royalblue;
  grid-column: sidebar-start / sidebar-end;
  grid-row: 2 / -1;
  /* grid-area: sidebar; */
}

@media only screen and (max-width: 1000px) {
  .sidebar {
    grid-column: full-start / full-end;
    grid-row: 2 / 3;
  }
}

.main {
  background-color: orangered;
  grid-column: center-start / full-end;
}

.box {
  background-color: goldenrod;
  grid-column: center-start / full-end;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* grid-gap: 1rem; */
}

.footer {
  background-color: greenyellow;
  grid-column: full-start / full-end;
}
```

<br>

CodeSandBox example

https://codesandbox.io/embed/cssgridbasicsexample1-ukgmn?fontsize=14

<br>
<br>

### Thanks for reading!
