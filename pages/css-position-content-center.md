---
title: Position content in the center using CSS position. 
excerpt: "Sometimes you need to position content perfectly in the middle without using flexbox or grid."
date: 2019-08-29
tags: ["CSS"]
keywords: "CSS Positioning"
cover_image: ""
---

# Positioning content perfectly in the middle
<br>
<hr>
<br>

If you need content to be centered in the middle of the viewport or in die middle of another element you need to set the position property of the parent element to relative and the position property of the element you want to center, to absolute.  
Then you need to set the top and left properties to 50% which will place the starting part of the element in the middle. But this is not perfect, to get it perfectly in the middle add the tramsform property to move it perfectly in the middle.  
See example below.

The HTML part
```html
<body>
    <div class="main">
      <h2>I want this in the middle</h2>
    </div>
</body>
```
<br>


The CSS part
```css
.main {
        position: relative;
        height: 100vh;
        width: 100%;
}
h2 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
}
```
<br>

CodeSandBox example  

https://codesandbox.io/embed/position-content-in-the-middle-with-css-position-property-uffoq?fontsize=14

