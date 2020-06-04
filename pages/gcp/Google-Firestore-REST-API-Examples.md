---
title: Google Firestore REST API Examples
excerpt: "In this post I'm documenting a few examples using the Firestore REST API"
date: 2019-07-03
tags: ["Firestore", "JavaScript"]
keywords: "Cloud Firestore"
sidebar: auto
---

# Google Firestore REST API examples

<br>
<hr>
<br>

In this post I'm documenting a few examples using the Firestore REST API.
Most of the examples on Googles Firestore database will guide you to installing the sdk via npm,
that is what I also did in my latest project, it works great. Firestore\Firebase is fantastic, especially for quick prototyping.

When I finally had my project ready to be deployed to the web I realized that my bundle size was huge, like > 2MB.
Firestore was the biggest contributor to this size, so I started to look for ways to reduce the bundle size.

Unfortunately I was already using it in the best way possible. Something like this.

```javascript
import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "xxxxxxxxxxxx",
});

export const db = firebaseApp.firestore();
```

I then decided to try the REST API instead of the sdk.
The only problem I had was that the documentation on using the REST API was hard to find. ( This might have change by the time you read this )

So here goes a few examples.

## Get all documents in a collection

This is one of the simplest examples, it's a normal Get request to your collection.

This is assuming you have no authorization set on read operations. If you do you will have to add an authorization header with a Bearer token.

```javascript
axios
  .get(
    `https://firestore.googleapis.com/v1/projects/<PROJECTIDHERE>/databases/(default)/documents/<COLLECTIONNAME>`
  )
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
```

## Get document by id

Here we are just adding the document id to the end of the URL, to return this one document only.

```javascript
axios
  .get(
    `https://firestore.googleapis.com/v1/projects/<PROJECTIDHERE>/  databases/(default)/documents/<COLLECTIONNAME>/<DOCID>`
  )
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
```

## Get selected fields in a document that meets specific requirements, limit it to 4 results and order by created date.

In this example we are sending a post request with the structuredQuery object and this will run a query on Firestore and return only the data we are interested in.

```javascript
axios
  .post(
    "https://firestore.googleapis.com/v1/projects/<PROJECTIDHERE>/databases/(default)/documents:runQuery",
    {
      structuredQuery: {
        from: [{ collectionId: "posts" }],
        orderBy: [{ field: { fieldPath: "created" }, direction: "DESCENDING" }],
        select: {
          fields: [
            { fieldPath: "title" },
            { fieldPath: "summary" },
            { fieldPath: "category" },
            { fieldPath: "created" },
          ],
        },
        where: {
          compositeFilter: {
            filters: [
              {
                fieldFilter: {
                  field: {
                    fieldPath: "published",
                  },
                  op: "EQUAL",
                  value: {
                    booleanValue: true,
                  },
                },
              },
            ],
            op: "AND",
          },
        },
        limit: 4,
      },
    }
  )
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
```

## Create Document ( Post requests )

Here you just need to pay attention to the format of the object you are sending to Firestore.

```javascript
axios
  .post(
    "https://firestore.googleapis.com/v1/projects/<PROJECTIDHERE>/databases/(default)/documents/<COLLECTIONNAME>",
    {
      fields: {
        title: { stringValue: this.title },
        category: { stringValue: this.category },
        post: { stringValue: this.post },
        summary: { stringValue: this.description },
        published: { booleanValue: this.published },
        created: { timestampValue: new Date() },
        modified: { timestampValue: new Date() },
      },
    }
  )
  .then((res) => {
    console.log("Post created");
  });
```

## Patch only specific fields

This was the toughest part to figure out, after a lot of googling someone guided me in the right direction and I finally got it right.
Apart from passing the object in the same way we did for the Post request you also specify the field to update in the URL query params.

```javascript
axios
  .patch(
    `https://firestore.googleapis.com/v1/projects/<PROJECTIDHERE>/databases/(default)/documents/<COLLECTIONNAME>/<DOCID>?updateMask.fieldPaths=title&updateMask.fieldPaths=post&updateMask.fieldPaths=summary&updateMask.fieldPaths=category &updateMask.fieldPaths=published&updateMask.fieldPaths=modified`,
    {
      fields: {
        title: { stringValue: this.post.title },
        post: { stringValue: this.post.post },
        summary: { stringValue: this.post.description },
        category: { stringValue: this.post.category },
        published: { booleanValue: this.post.published },
        modified: { timestampValue: new Date() },
      },
    }
  )
  .then((doc) => {
    console.log("Document successfully updated!");
  });
```

## Delete

This is a easy one, pass in your project id, collection name and doc id.

```javascript
axios
  .delete(
    `https://firestore.googleapis.com/v1/projects/<PROJECTIDHERE>/databases/(default)/documents/<COLLECTIONNAME>/<DOCIDHERE>`
  )
  .then((doc) => {
    console.log("Document successfully deleted!");
  });
```

## Conclusion

I hope this is helpful for someone else who also wants to use these APIs.
Using REST instead of the sdk worked out well for me, I had a huge reduction in my bundle size.

Thanks for reading!
