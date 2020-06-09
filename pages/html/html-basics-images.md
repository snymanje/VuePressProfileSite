---
title: HTML Basics - images
excerpt: "Looking at the different ways you can dispaly images."
date: 2019-08-16
tags: ["HTML"]
keywords: "html basics"
sidebar: auto
---

# HTML Basics - Images

<br>

Images are displayed using the `<img>` tag. There is a few different image types that can be used, the most common is PNG, JPEG, GIF, SVG and WebP.
The `img` tag has an attribute called `src` and this is used to set the image location.
There is also an `alt` attribute that is very important to add. This helps screen readers and search enigne bots to understand what the images is.

```html
<img src="/../mycat.jpg" alt="an image about my cat" />

// You can also use the width and height attributes to set the image size. This
is usually done with CSS.
<img src="/../mycat.jpg" alt="an image about my cat" width="250" height="160" />
```

<br>

## The `figure` tag

This tag is used as a wrapper around the `img` tag to display a caption with the image.

```html
<figure>
  <img src="cat.jpg" alt="A nice cat" />
  <figcaption>A nice cat</figcaption>
</figure>
```

<br>

## Responsive images using srcset

The srcset attribute allows you to set responsive images that the browser can use depending on the pixel density or window width, according to your preferences. This way, it can only download the resources it needs to render the page, without downloading a bigger image if it's on a mobile device, for example.

```html
<img
  srcset="
    elva-fairy-320w.jpg 320w,
    elva-fairy-480w.jpg 480w,
    elva-fairy-800w.jpg 800w
  "
  sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy"
/>
```

The `srcset` and `sizes` attributes look complicated, but they're not too hard to understand if you format them as shown above, with a different part of the attribute value on each line. Each value contains a comma-separated list, and each part of those lists is made up of three sub-parts. Let's run through the contents of each now:

`srcset` defines the set of images we will allow the browser to choose between, and what size each image is. Before each comma, we write:

1. An image filename (elva-fairy-480w.jpg)
2. A space
3. The image's inherent width in pixels (480w) — note that this uses the w unit, not px as you might expect. This is the image's real size, which can be found by inspecting the image file on your computer (for example, on a Mac you can select the image in Finder and press Cmd + I to bring up the info screen).  
   <br>

`sizes` defines a set of media conditions (e.g. screen widths) and indicates what image size would be best to choose, when certain media conditions are true — these are the hints we talked about earlier. In this case, before each comma we write:

1. A **media condition** ((max-width:480px)) — you'll learn more about these in the CSS topic, but for now let's just say that a media condition describes a possible state that the screen can be in. In this case, we are saying "when the viewport width is 480 pixels or less".
2. A space
3. The **width of the slot** the image will fill when the media condition is true (440px)  
   <br>

So, with these attributes in place, the browser will:

1. Look at its device width
2. Work out which media condition in the sizes list is the first one to be true
3. Look at the slot size given to that media query
4. Load the image referenced in the srcset list that most closely matches the chosen slot size  
   <br>

And that's it! At this point, if a supporting browser with a viewport width of 480px loads the page, the (max-width: 480px) media condition will be true, and so the browser chooses the 440px slot. The elva-fairy-480w.jpg will be loaded, as its inherent width (480w) is the closest to 440px. The 800px picture is 128KB on disk, whereas the 480px version is only 63KB — a saving of 65KB. Now, imagine if this was a page that had many pictures on it. Using this technique could save mobile users a lot of bandwidth.
<br>

## The `picture` tag

The `picture` does a similar job to srcset, the differences are subtle.  
You use picture when instead of just serving a smaller version of a file, you completely want to change it. Or serve a different image format.
A good usecase is when serve a WebP image, which is a format still not widely supported. In the picture tag you specify a list of images, and they will be used in order so if you look at the example, browsers that support WebP will use the first image, and fallback to JPG if not.

```html
<picture>
  <source type="image/webp" srcset="mycat.webp" />
  <img src="mycat.jpg" alt="An image" />
</picture>
```

> The source tag defines one (or more) formats for the images. The img tag is the fallback in case the browser is very old and does not support the picture tag.

You can also set media queries inside the source tag.

```html
<picture>
  <source media="(min-width: 500w)" srcset="dog-500.png" sizes="100vw" />
  <source media="(min-width: 1400w)" srcset="dog-1400.png" sizes="800px" />
  <img src="dog.png" alt="A dog image" />
</picture>
```

<br>
