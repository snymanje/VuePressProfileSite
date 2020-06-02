---
title: Uipath Throwing exceptions
excerpt: "This is the code to throw exceptions manually when an business or system exception occured."
date: 2019-07-23
tags: ["UiPath"]
keywords: "uipath, uipath studio throw exception, uipath exceptions"
cover_image: ""
---

# Uipath Throwing exceptions
<hr>
<br >

## Business Exceptions
<br >

Business Rule Exception or BRE: An exception manually triggered by the developer using the “Throw” activity. 
The basic syntax of the activity’s input is:

<br >

```csharp
new UiPath.Core.BusinessRuleException(“this is my reason message”)
```
<br >

The developer should throw BREs when he needs particular information to be available in order to continue the process, but, upon testing, discovers it is not available.

<br >

## Application Exceptions

<br >

An exception that is triggered automatically by activities that fail, or manually by the developer when a condition pertaining to the application environment is not as was expected (for example, inputting data into a program we always expect success if we have the data needed in a correct format, but upon submitting the data we receive an error. We can capture the message and issue an application exception if retrying may solve the problem). 
The basic syntax of the throw activity is 

<br >

```csharp
new System.Exception(“this is my reason message”)
```
<br >

There are many types of exceptions.
