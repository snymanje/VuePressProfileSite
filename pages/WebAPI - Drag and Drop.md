---
title: HTML Drag and Drop Example
excerpt: "A Basic Example of the HTML Drag and Drop API"
date: 2020-01-04
tags: ["WebAPI"]
keywords: "HTML, Drag and Drop, WebAPI"
cover_image: ""
---

# HTML Drag and Drop Example
<br>
<hr>
<br>

***HTML Drag and Drop*** interfaces enable applications to use drag-and-drop features in browsers. The user may select draggable elements with a mouse, drag those elements to a droppable element, and drop them by releasing the mouse button.  

HTML drag-and-drop uses the ***DOM event model*** and ***drag events*** inherited from ***mouse events***. A typical drag operation begins when a user selects a draggable element, drags the element to a droppable element, and then releases the dragged element.  

During the drag operations, several event types are fired, and some events might fire many times, such as the ***drag*** and ***dragover*** events. 
<br> 

### The Drag Events
From the source element,
* dragstart
* drag
* dragend
  
<br>

On the target element,
* dragenter
* dragover
* dragleave
* dragexit
* drop

<br>

***Note that dragstart and dragend events are not fired when dragging a file into the browser from the OS.***
<br>

## Exmaple 1 - with drag and drop from local file system.
https://codesandbox.io/embed/html-draganddrop-with-fileupload-s6vo5?fontsize=14&hidenavigation=1&theme=dark

<br>
<br>

## Step 1 - Make Element Draggable
First you need to add the ***draggable attribute*** to the html element and set it to true.
Then in the javascript we need to add a ***event listener*** to the draggable element to listen for the ***dragstart*** event.

```html
<div class="movingElements">
    <div class="box">
        <img
          src="http://source.unsplash.com/random/150x150"
          draggable="true"
          ...
          />
        </div>
    <div class="box"></div>
    <div class="box"></div>
</div>
```
<br>

Every event related to drag and drop comes is a DragEvent object, and it comes with a property called ***dataTransfer*** which holds the data being dragged.  
So in the ***dragstart*** event we need to use the ***dataTransfer*** property to specify that data we are moving.
```javascript
const sourcElement = document.querySelector(".image");

sourcElement.addEventListener("dragstart", dragstart);

function dragstart(e) {
  e.dataTransfer.setData("text", e.target.id);
}

```
<br>
<br>

## Step 2 - The Drop Target
Where can we drag elements to is the next thing we need to specify. As well as we can’t just drag and drop any element, the element must be valid drop target.  
To make an element a drop target you need to listen to atleast the ***dragover*** and ***drop*** events.  
For the ***dragover*** event we only prevent the defaults.  

For the ***drag*** event we get the data for the source (moving element) and then append it to the target element.
```javascript
const targetElement = document.querySelectorAll(".box");

targetElement.forEach(el => {
  el.addEventListener("dragover", dragOver);
  el.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  e.target.appendChild(document.getElementById(data));
}
```
***Note that each handler calls preventDefault() to prevent additional event processing for this event (such as touch events or pointer events).***

<br>
<br>

## A Basic Exmaple 2
https://codesandbox.io/embed/html-draganddrop-ukprt?fontsize=14&hidenavigation=1&theme=dark

<br>
<br>

### Addition Resources
[Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API "Mozilla")  
[Flavio Copes](https://flaviocopes.com/drag-and-drop/ "Flavio")