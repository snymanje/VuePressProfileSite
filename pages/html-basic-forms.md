---
title: HTML Basics - Forms
excerpt: "The form tag and all the input elements that goes with it."
date: 2019-08-11
tags: ["html"]
keywords: "html basics"
cover_image: ""
---

# HTML Basics - Forms
<br>
Forms gives us a way to interact with a page, or a web app.
By default forms are submitted using the HTTP GET method.
The `method` attribute can be set to GET or POST depending on whether you want to request data or send data. 
The `action` attribute can be used to set the destination where the form data should be submitted. It's not required.

```html
<form action="/contactme" method="POST">
    ...
</form>
```

## Let's now look at all the form fields available to us. 
<br >

## The `input` field  

The `<input>` element is the fundamental form element for gathering user info through forms. The vast majority of form fields are the `<input>` element, and there are only a handful of form field types — `<select>`, for example — that are actually a different element. From range sliders to date selectorsto submit buttons, the `<input>` element covers a lot of different cases.

Because of that, it also has a huge number of attributes and potential values. Many of them are only applicable to certain types of inputs. There are a handful that are universally important, though:

* The type attribute determines the type, or style, of the element. This is the most important attribute, as it determines everything else about how the `<input>` element behaves.
* The name is used in conjunction with the value attribute to send user data to the server.
* Setting the value attribute in your HTML document allows you to pre-specify the content of the input field, or its default value
* Both readonly and disable stop the user from editing the value of the input, but there are some important difference to know about.
* Including the required stops the form from accepting submission if the field has no value.

Let look at the available attributes.

## name

Specifies the name of an input element. The name and value of each input element are included in the HTTP request when the form is submitted.

Example
```html
<input type="text" name="username">
```
<br>

## value

Defines an initial value or default selection for an input field.

Example
```html
<input type="text" name="username" value="Value from value field">
```
<br>

## placeholder

Specifies placeholder text in a text-based input. It will be displayed in light grey.
Useful to add a hint to the user for what to type in.

Example
```html
<input type="text" name="username" placeholder="Placeholder text">
```
<br>

## The `type` attribute
<br>  

## email

Specifies placeholder text in a text-based input. It will be displayed in light grey.
Useful to add a hint to the user for what to type in.

Example
```html
<input type="text" name="username" placeholder="Placeholder text">
```
<br>

## password

The password input type will hide the password using asterisks(*) or a dot.

Example
```html
<input type="password" name="password" placeholder="Add password here">
```
<br>

## number

Inputs can be numbers only and you can add an optional min and max value.

Example
```html
<input type="number" name="age" placeholder="What is your age?" min="18" max="120">
```

You can aslo add the `step` attribute, this will increase the number by the value set for step.
```html
<input type="number" name="age" placeholder="What is your age?" min="10" max="30" step="2">
```
<br>

## hidden

Fields can be hidden from the user. They will still be sent to the server upon the form submit.
This is commonly used to store values like a CSRF token, used for security and user identification,	
or even to detect robots sending spam, using special techniques.
It can also just be used to identify a form	and	its	action.

Example
```html
<input type="hidden" name="hidden field" value="hidden field">
```
<br>

## submit

This will be a button, if click it will send the form data to the server.
Default value is submit if not specified.

Example
```html
<input type="submit" value="Submit">
```
<br>

## Form validation

Browser are capable of doing form validation for us.
We can use the required attribute to make sure a value is entered.

```html
<input type="text" name="name" placeholder="name" required>
```
<br>
When the type is set to email or number it will also enforce that. You wont be able to submit if the email field does not have a valid email address.  

The pattern attribute can also be used to validate the value.
```html
<input type="text" name="name" placeholder="name" pattern="[a-zA-Z]{8}">
``` 
<br>

## File Uploads

You can load files from your local computer to the server using the file type.
```html
<input type="file" name="some file">

//If you need to upload multiple files add the multiple attribute
<input type="file" name="some file" multiple>

//If you need to upload multiple files add the `multiple` attribute
<input type="file" name="some file" multiple>

//You can specify one or more file types allowed using the `accept` attribute
<input type="file" name="some file" accept="image/*">

//You can use a specific MIME type, like `application/json` or set a file extension like `.pdf`.
//Or set multiple file extensions, like this.
<input type="file" name="some file" accept=".jpg, .jpeg, .png">
```
<br>

## Buttons
<br>

The button input type can be used to add additional buttons to the form like a reset button to clear the input fields.

```html
<input type="reset">
```
<br>

## Radio buttons
<br>

Creates a set of choices. Use the checked attribute to pre-select a value.

```html
<input type="radio" name="color" value="yellow" checked>
<input type="radio" name="color" value="red">
<input type="radio" name="color" value="blue">
```
<br>

## Checkboxes
<br>

Allows for multiple values to be chosen. The checked attribute can also be used here to pre-select a value.

```html
<input type="checkbox" name="color" value="yellow" checked>
<input type="checkbox" name="color" value="red">
<input type="checkbox" name="color" value="blue">
```
<br>

## Date and time
<br>

We have a few options for date and time.

```html
//Shows a date picker
<input type="date" name="birthday">

//date picker
<input type="time" name="time-to-pickup">

//month picker
<input type="month" name="choose-release-month">

//week picker
<input type="week" name="choose-week">

//date and time picker
<input type="datetime-local" name="date-and-time">
```
<br>

## Color Picker
<br>

We can also add a color picker to our forms.

```html
<input type="color" name="car-color" value="#000000"
```
<br>

## Range selector
<br>

This input element shows a slider. You can use the step attribute here.

```html
<input type="range" step="10" min="1" max="100" name="bigstep"> 
<input type="range" step="1" min="1" max="100" name="littlestep"> 
```
<br>

## Telephone
<br>

Used to enter a phone number. This is very useful on mobile devices where the device can choose to show a nuberic keyboard.

```html
<input type="tel" pattern="[0-9]{3}-[0-9]{7}" name="telephone-num ber">
```
<br>

## Url
<br>

Used to enter a URL

```html
<input type="url" name="website" pattern="https://.*">
```
<br>

## Textarea
<br>

Allow for multiline text input. Needs a closing tag.

```html
<textarea name="message" rows="20" cols="10"></textarea>
```
<br>

## Select
<br>

This element creates a dropdown menu with options.

```html
<select	name="color">
    <option value="">None</option>
    <option value="red">Red</option>
    <option value="yellow">Yellow</option>
</select>
```
Groups can also be created.
```html
<select	name="color">
    <optgroup label="Primary">
        <option value="">None</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
    </optgroup>
    <optgroup label="Other">
        <option value="red">Green</option>
        <option value="yellow">Pink</option>
    </optgroup>
</select>
```