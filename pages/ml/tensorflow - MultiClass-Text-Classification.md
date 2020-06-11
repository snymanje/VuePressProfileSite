---
title: MultiClass Text Classification with Tensorflow
excerpt: "MultiClass Text Classification with Tensorflow using a Consumer Complaints dataset"
date: 2020-06-05
tags: ["Machine Learning"]
keywords: "machine learning with Scikit-Learn"
sidebar: auto
---

# MultiClass Text Classification with Tensorflow using a Consumer Complaints dataset

<br>
<hr>
<br>

## Import the libraries and check Tensorflow version

```python
import numpy as np
import pandas as pd

import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Flatten, Dense, Embedding, Conv1D, GlobalMaxPooling1D, Dropout
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau

from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report
from mlxtend.plotting import plot_confusion_matrix
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split

from nltk.stem import PorterStemmer
import re
import nltk
nltk.download('stopwords')
nltk.download('punkt')
from nltk.corpus import stopwords

import matplotlib.pyplot as plt
import seaborn as sns

print(tf.__version__)

# 2.2.0
```

<br>

## Set Hyperparameters

```python
# The maximum number of words to be used. (most frequent)
vocab_size = 50000

# Dimension of the dense embedding.
embedding_dim = 128

# Max number of words in each complaint.
max_length = 200

# Truncate and padding options
trunc_type = 'post'
padding_type = 'post'
oov_tok = '<OOV>'
```

<br>

## Text Preprocessing

```python
# Import the datatset
dataset = pd.read_csv('drive/My Drive/Colab Notebooks/Multiclass-CustComp-Tensorflow/Consumer_Complaints.csv')

# Select only the Product and Consumer Complaint columns
col = ['Product', 'Consumer Complaint']
dataset= dataset[col]

# Drop rows with missing labels
dataset.dropna(subset=["Consumer Complaint"], inplace=True)

# Rename column
dataset.columns=['Product', 'ConsumerComplaint']

# Only include the following products
dataset=dataset[dataset['Product'].isin(['Credit reporting',
                                         'Debt collection',
                                         'Mortgage',
                                         'Credit Card',
                                         'Student loan',
                                         'Bank account or service'])]

# Print the top
dataset.head()
```

![datset1](/assets/images/Tensorflow/dataset1.jpg)
<br>

## How clean is the text now?

```python
# Print the first 5 lines
print(dataset["ConsumerComplaint"].to_list()[:5])

# Store original text for later use
original_text = dataset["ConsumerComplaint"].to_list()[:30]
```

['I have outdated information on my credit report that I have previously disputed that has yet to be removed this information is more then seven years old and does not meet credit reporting requirements', 'An account on my credit report has a mistaken date. I mailed in a debt validation letter to allow XXXX to correct the information. I received a letter in the mail, stating that Experian received my correspondence and found it to be " suspicious \'\' and that " I did n\'t write it \'\'. Experian \'s letter is worded to imply that I am incapable of writing my own letter. I was deeply offended by this implication. \nI called Experian to figure out why my letter was so suspicious. I spoke to a representative who was incredibly unhelpful, She did not effectively answer any questions I asked of her, and she kept ignoring what I was saying regarding the offensive letter and my dispute process. I feel the representative did what she wanted to do, and I am not satisfied. It is STILL not clear to me why I received this letter. I typed this letter, I signed this letter, and I paid to mail this letter, yet Experian willfully disregarded my lawful request. \nI am disgusted with this entire situation, and I would like for my dispute to be handled appropriately, and I would like for an Experian representative to contact me and give me a real explanation for this letter.', 'This company refuses to provide me verification and validation of debt per my right under the FDCPA. I do not believe this debt is mine.']

From the above we can see that we need to convert everything to lowercase, and remove numbers and thinks like \n

Let's create a function to do most of this.

## Run data through cleanup function

```python
# Lets do some text cleanup
stemmer = PorterStemmer()

REPLACE_BY_SPACE_RE = re.compile('[/(){}\[\]\|@,;]')
BAD_SYMBOLS_RE = re.compile('[^0-9a-z #+_]')
REMOVE_NUM = re.compile('[\d+]')
STOPWORDS = set(stopwords.words('english'))

def clean_text(text):
    """
    text: a string
    return: modified initial string
    """
    # lowercase text
    text = text.lower()

    # replace REPLACE_BY_SPACE_RE symbols by space in text
    text = REPLACE_BY_SPACE_RE.sub(' ', text)

    # Remove the XXXX values
    text = text.replace('x', '')

    # Remove white space
    text = REMOVE_NUM.sub('', text)

    #  delete symbols which are in BAD_SYMBOLS_RE from text
    text = BAD_SYMBOLS_RE.sub('', text)

    # delete stopwords from text
    text = ' '.join(word for word in text.split() if word not in STOPWORDS)

    # removes any words composed of less than 2 or more than 21 letters
    text = ' '.join(word for word in text.split() if (len(word) >= 2 and len(word) <= 21))

    # Stemming the words
    text = ' '.join([stemmer.stem(word) for word in text.split()])

    return text
```

<br>

## What does the data look like now?

```python
dataset["ConsumerComplaint"] = dataset["ConsumerComplaint"].apply(clean_text)
dataset["ConsumerComplaint"]
```

['outdat inform credit report previous disput yet remov inform seven year old meet credit report requir',
'account credit report mistaken date mail debt valid letter allow correct inform receiv letter mail state eperian receiv correspond found suspici nt write eperian letter word impli incap write letter deepli offend implic call eperian figur letter suspici spoke repres incred unhelp effect answer question ask kept ignor say regard offens letter disput process feel repres want satisfi still clear receiv letter type letter sign letter paid mail letter yet eperian will disregard law request disgust entir situat would like disput handl appropri would like eperian repres contact give real eplan letter',
'compani refus provid verif valid debt per right fdcpa believ debt mine']

Great!  
<br>

## Shuffel the dataset

```python
# Shuffel the dataset to make sure we get an equal distribution of the data before splitting into train and test sets
dataset = dataset.sample(frac=1)
```

<br>

## Plot the data

```python
sns.set_style('whitegrid')
plt.figure(figsize=(6, 5))
ax = sns.countplot(x='Product', data=dataset)
ax.set_xticklabels(ax.get_xticklabels(), rotation=40, ha="right")
plt.tight_layout()
```

![plot1](/assets/images/Tensorflow/plot1.jpg)

<br>

## Split the data into training and test sets

```python
complaints = dataset["ConsumerComplaint"].values
labels = dataset[["Product"]].values

X_train, y_train, X_test, y_test = train_test_split(complaints,labels, test_size = 0.20, random_state = 42)
print(X_train.shape,X_test.shape)
print(y_train.shape,y_test.shape)

"""
(1320,) (1320, 1)
(331,) (331, 1)
"""
```

<br>

## Vectorize the Text Corpus

1. **fit_on_texts** Updates internal vocabulary based on a list of texts. This method creates the vocabulary index based on word frequency. So if you give it something like, "The cat sat on the mat." It will create a dictionary s.t. word_index["the"] = 1; word_index["cat"] = 2 it is word -> index dictionary so every word gets a unique integer value. 0 is reserved for padding. So lower integer means more frequent word (often the first few are stop words because they appear a lot).
2. **texts_to_sequences** Transforms each text in texts to a sequence of integers. So it basically takes each word in the text and replaces it with its corresponding integer value from the word_index dictionary. Nothing more, nothing less, certainly no magic involved.

Why don't combine them? Because you almost always fit once and convert to sequences many times. You will fit on your training corpus once and use that exact same word_index dictionary at train / eval / testing / prediction time to convert actual text into sequences to feed them to the network. So it makes sense to keep those methods separate

```python
tokenizer = Tokenizer(num_words=vocab_size, oov_token='<OOV>')
tokenizer.fit_on_texts(X_train)
word_index = tokenizer.word_index
print('Found %s unique tokens.' % len(word_index))
dict(list(word_index.items())[0:10])

"""
Found 5047 unique tokens.
{'<OOV>': 1,
 'account': 2,
 'call': 7,
 'credit': 3,
 'debt': 9,
 'inform': 8,
 'loan': 6,
 'payment': 5,
 'receiv': 10,
 'report': 4}
"""

train_seq = tokenizer.texts_to_sequences(X_train)
train_padded = pad_sequences(train_seq, maxlen=max_length, padding=padding_type, truncating=trunc_type)

validation_seq = tokenizer.texts_to_sequences(y_train)
validation_padded = pad_sequences(validation_seq, maxlen=max_length, padding=padding_type, truncating=trunc_type)
print('Shape of data tensor:', train_padded.shape)
print('Shape of data tensor:', validation_padded.shape)

"""
Shape of data tensor: (1320, 200)
Shape of data tensor: (331, 200)
"""
```

<br>

## One Hot Encode the labals

```python
encode = OneHotEncoder()

training_labels = encode.fit_transform(X_test)
validation_labels = encode.transform(y_test)
```

<br>

## Check the shape of the data

```python
print(train_padded.shape)
print(validation_labels.shape)
print(validation_padded.shape)
print(training_labels.shape)
print(type(train_padded))
print(type(validation_padded))
print(type(training_labels))
print(type(validation_labels))

"""
(1320, 200)
(331, 5)
(331, 200)
(1320, 5)
<class 'numpy.ndarray'>
<class 'numpy.ndarray'>
<class 'scipy.sparse.csr.csr_matrix'>
<class 'scipy.sparse.csr.csr_matrix'>
"""

# The labels must be converted to arrays
# Convert the labels to arrays
training_labels = training_labels.toarray()
validation_labels = validation_labels.toarray()

print(type(training_labels))
print(type(validation_labels))
"""
<class 'numpy.ndarray'>
<class 'numpy.ndarray'>
"""
```

<br>

## Build the Model

```python
model = Sequential()
model.add(Embedding(vocab_size, embedding_dim, input_length=train_padded.shape[1]))

model.add(Conv1D(48, 5, activation='relu', padding='valid'))
model.add(GlobalMaxPooling1D())
model.add(Dropout(0.5))

model.add(Flatten())
model.add(Dropout(0.5))

model.add(Dense(5, activation='softmax'))
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

epochs = 100
batch_size = 32

history = model.fit(train_padded, training_labels, shuffle=True ,
                    epochs=epochs, batch_size=batch_size,
                    validation_split=0.2,
                    callbacks=[ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=5, min_lr=0.0001),
                               EarlyStopping(monitor='val_loss', mode='min', patience=2, verbose=1),
                               EarlyStopping(monitor='val_accuracy', mode='max', patience=5, verbose=1)])
```

<br>

## Plot the Model Loss and Accuracy for each epoch

```python
plt.title('Loss')
plt.plot(history.history['loss'], label='train')
plt.plot(history.history['val_loss'], label='test')
plt.legend()
plt.show();
```

![plot1](/assets/images/Tensorflow/plot2.jpg)
<br>

```python
plt.title('Accuracy')
plt.plot(history.history['accuracy'], label='train')
plt.plot(history.history['val_accuracy'], label='test')
plt.legend()
plt.show();
```

![plot1](/assets/images/Tensorflow/plot3.jpg)

<br>

## Evaluating the model and make predictions

```python
# First we create an evaluation function to output all the needs metrics

def evaluate_preds(y_true, y_preds):
    """
    Performs evaluation comparison on y_true labels vs. y_pred labels
    on a classification.
    """
    accuracy = accuracy_score(y_true, y_preds)
    precision = precision_score(y_true, y_preds, average='micro')
    recall = recall_score(y_true, y_preds, average='micro')
    f1 = f1_score(y_true, y_preds, average='micro')
    metric_dict = {"accuracy": round(accuracy, 2),
                   "precision": round(precision, 2),
                   "recall": round(recall, 2),
                   "f1": round(f1, 2)}
    print(f"Acc: {accuracy * 100:.2f}%")
    print(f"Precision: {precision:.2f}")
    print(f"Recall: {recall:.2f}")
    print(f"F1 score: {f1:.2f}")

    return metric_dict
```

<br>

## Make Predictions

```python
# Now we make predictions using the test data to see how the model performs

predicted = model.predict(validation_padded)
evaluate_preds(np.argmax(validation_labels, axis=1), np.argmax(predicted, axis=1))
"""
Acc: 88.52%
Precision: 0.89
Recall: 0.89
F1 score: 0.89
"""
```

<br>

## Create a Classification Report

```python
print(metrics.classification_report(np.argmax(validation_labels, axis=1), np.argmax(predicted, axis=1),
                                    target_names=dataset['Product'].unique()))
"""
                            precision   recall  f1-score   support

               Mortgage      0.94       0.74    0.83       39
       Credit reporting      0.92       0.78    0.84       76
        Debt collection      0.82       0.97    0.89       99
Bank account or service      0.90       0.98    0.94       84
           Student loan      0.96       0.82    0.89       33

               accuracy                         0.89       331
              macro avg       0.91      0.86    0.88       331
           weighted avg       0.89      0.89    0.88       331
"""
```

<br>

## Create a Confusion Matrix

```python
conf_mat = confusion_matrix(np.argmax(validation_labels, axis=1), np.argmax(predicted, axis=1))
fig, ax = plt.subplots(figsize=(8,6))
sns.heatmap(conf_mat, annot=True, fmt='d',
            xticklabels=dataset.Product.unique(), yticklabels=dataset.Product.unique())
plt.ylabel('Actual')
plt.xlabel('Predicted')
plt.show()
```

![plot1](/assets/images/Tensorflow/plot4.jpg)

<br>

## Test Model

```python
complaint = original_text[18]
new_complaint = [clean_text(complaint)]
print(complaint)
print(new_complaint)
seq = tokenizer.texts_to_sequences(new_complaint)
padded = pad_sequences(seq, maxlen=max_length, padding=padding_type, truncating=trunc_type)
pred = model.predict(padded)
acc = model.predict_proba(padded)
predicted_label = encode.inverse_transform(pred)
print('')
print(f'Product category id: {np.argmax(pred[0])}')
print(f'Predicted label is: {predicted_label[0]}')
print(f'Accuracy score: { acc.max() * 100}')
```

My identity was stolen. I filed a complaint, police report, affidavit, etc. I contacted the original company, and the collection agency to resolve this debt. Both of them keep sending me to each other, and neither will help in resolving this issue. I have spoken to supervisors at each company and still get the same answer- contact the other company. I want this debt removed from my credit, as it was fraudulent. The collection agency even offered to settle for {\$300.00}! I am not paying a dime to a company I never had an account with!
['ident stolen file complaint polic report affidavit etc contact origin compani collect agenc resolv debt keep send neither help resolv issu spoken supervisor compani still get answer contact compani want debt remov credit fraudul collect agenc even offer settl pay dime compani never account']

**Product category id**: 2  
**Predicted label is**: ['Debt collection']  
**Accuracy score**: 97.91606068611145

<br>

The Jupyter Notebook can be found here, [GitHub](https://github.com/snymanje/MultiClass-Text-Classification-with-Tensorflow/blob/master/MultiClass_Text_Classification_with_Tensorflow.ipynb)
