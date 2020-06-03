---
title: MultiClass Text Classification with Scikit-Learn
excerpt: "Multiple Estimators and Hyperparameter Optimization using a Customer Complaints dataset"
date: 2020-05-19
tags: ["python", "ml"]
keywords: "machine learning with Scikit-Learn"
cover_image: ""
---

# MultiClass Text Classification with Scikit-Learn

<br>
<hr>
<br>

This blog covers multiclass classification on a customer complaints dataset.  
After preprocessing the data we will build multiple models with different estimator and different hyperparemeters to find the best performing model.

<br>

## Get the data ready

As an example dataset, we'll import Consumer_Complaints.csv.

```python
# Import data and filter only on the needed features an labels
import pandas as pd
import numpy as np

dataset = pd.read_csv('drive/My Drive/Colab Notebooks/Consumer_Complaints.csv')

# Select only the Product and Consumer Complaint columns
col = ['Product', 'Consumer Complaint']
dataset= dataset[col]

# Drop rows with missing labels
dataset.dropna(subset=["Consumer Complaint"], inplace=True)

# Rename column
dataset.columns=['Product', 'ConsumerComplaint']

# Convert the label (Product) to numeric using the pd factorize function
dataset['category_id'] = dataset['Product'].factorize()[0]

# Only include the following products
dataset=dataset[dataset['Product'].isin(['Credit reporting',
                                         'Debt collection',
                                         'Mortgage',
                                         'Credit Card',
                                         'Student loan',
                                         'Bank account or service'])]

# Print the top 5 rows
dataset.head()
```

![datset1](/assets/images/MultiClassText/dataset1.jpg)
<br>

## How clean is the text?

```python
dataset["ConsumerComplaint"].to_list()[:2]
```

['I have outdated information on my credit report that I have previously disputed that has yet to be removed this information is more then seven years old and does not meet credit reporting requirements',

'An account on my credit report has a mistaken date. I mailed in a debt validation letter to allow XXXX to correct the information. I received a letter in the mail, stating that Experian received my correspondence and found it to be " suspicious \'\' and that " I did n\'t write it \'\'. Experian \'s letter is worded to imply that I am incapable of writing my own letter. I was deeply offended by this implication. \nI called Experian to figure out why my letter was so suspicious. I spoke to a representative who was incredibly unhelpful, She did not effectively answer any questions I asked of her, and she kept ignoring what I was saying regarding the offensive letter and my dispute process. I feel the representative did what she wanted to do, and I am not satisfied. It is STILL not clear to me why I received this letter. I typed this letter, I signed this letter, and I paid to mail this letter, yet Experian willfully disregarded my lawful request. \nI am disgusted with this entire situation, and I would like for my dispute to be handled appropriately, and I would like for an Experian representative to contact me and give me a real explanation for this letter.'
]

<br>

## Run data through cleanup function

```python
import re
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords

# Lets do some text cleanup
REPLACE_BY_SPACE_RE = re.compile('[/(){}\[\]\|@,;]')
BAD_SYMBOLS_RE = re.compile('[^0-9a-z #+_]')
REMOVE_NUM = re.compile('[\d+]')
STOPWORDS = set(stopwords.words('english'))

def clean_text(text):
    """
    text: a string
    return: modified initial string
    """
    text = text.lower() # lowercase text
    text = REPLACE_BY_SPACE_RE.sub(' ', text) # replace REPLACE_BY_SPACE_RE symbols by space in text
    text = text.replace('x', '') # Remove the XXXX values
    text = REMOVE_NUM.sub('', text)
    text = BAD_SYMBOLS_RE.sub('', text) # delete symbols which are in BAD_SYMBOLS_RE from text
    text = ' '.join(word for word in text.split() if word not in STOPWORDS) # delete stopwords from text
    return text

dataset["ConsumerComplaint"] = dataset["ConsumerComplaint"].apply(clean_text)
```

<br>

## How clean is the text now?

```python
dataset["ConsumerComplaint"].to_list()[:5]
```

[
'outdated information credit report previously disputed yet removed information seven years old meet credit reporting requirements',

'account credit report mistaken date mailed debt validation letter allow correct information received letter mail stating eperian received correspondence found suspicious nt write eperian letter worded imply incapable writing letter deeply offended implication called eperian figure letter suspicious spoke representative incredibly unhelpful effectively answer questions asked kept ignoring saying regarding offensive letter dispute process feel representative wanted satisfied still clear received letter typed letter signed letter paid mail letter yet eperian willfully disregarded lawful request disgusted entire situation would like dispute handled appropriately would like eperian representative contact give real eplanation letter',

'company refuses provide verification validation debt per right fdcpa believe debt mine',

'complaint regards square two financial refer cfpb case number regarding cach l l c square two financial utilized entire social security number include date birth pfd document listed complaint initial complaint cach l l c square two financial breach following identity theft assumption deterrence act privacy act social security privacy actwhich carries maimum fine calendar cap year breach title solution cach llc handle correction square two financial two square financial submitted subscriber name form listed cfpb case # rendered liable matter addition account number associated universal data form could use account number instead ssn dob also includes removal form cfpb case # listed pdf document attached case number square two financial contacted email regards matter addition information sale distribution via fa fascanned copied stored retrieval system recorded transmitted digitally electronically without epressed written consent information protected copyright publishing laws information protected freedom speech include uniform commercial codes rights reserved world wide',

'started refinance home mortgage process cash option necessary documents submitted initial review got good faith estimate loan amount closing cost based estimate deposit made towards appraisal appraisal came lesser amount agreed reduce loan amount etent however got revised estimate less additional closing cost towards points etc got numerous revised estimates different loan amounts closing cost took months reach definite closing document hence want get back deposit'  
]

<br>

## Plotting the data

```python
import seaborn as sns
import matplotlib.pyplot as plt

sns.set_style('whitegrid')
plt.figure(figsize=(8, 5))
ax = sns.countplot(x='Product', data=dataset)
ax.set_xticklabels(ax.get_xticklabels(), rotation=40, ha="right")
plt.tight_layout()
```

![plot1](/assets/images/MultiClassText/plot1.jpg)

<br>

## Shuffel the dataset

```python
# Shuffel the dataset to make sure we get an equal distribution of the data before splitting into train and test sets
dataset = dataset.sample(frac=1)
dataset.head()
```

<br>

## Split the data into training and test sets

```python
# Split into X/y
from sklearn.model_selection import train_test_split, cross_val_score

x = dataset["ConsumerComplaint"]
y = dataset["category_id"]

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0)
```

<br>

## Convert text features to numeric

The classifiers and learning algorithms can not directly process the text documents in their original form, as most of them expect numerical feature vectors with a fixed size rather than the raw text documents with variable length. Therefore, during the preprocessing step, the texts are converted to a more manageable representation.

One common approach for extracting features from text is to use the bag of words model: a model where for each document, a complaint narrative in our case, the presence (and often the frequency) of words is taken into consideration, but the order in which they occur is ignored.

Specifically, for each term in our dataset, we will calculate a measure called Term Frequency, Inverse Document Frequency, abbreviated to tf-idf. We will use sklearn.feature_extraction.text.TfidfVectorizer to calculate a tf-idf vector for each of consumer complaint narratives

```python
from sklearn.feature_extraction.text import TfidfVectorizer
# sublinear_df is set to True to use a logarithmic form for frequency
# min_df is the minimum numbers of documents a word must be present in to be kept
# norm is set to l2, to ensure all our feature vectors have a euclidian norm of 1
# ngram_range is set to (1, 2) to indicate that we want to consider both unigrams and bigrams
# stop_words is set to "english" to remove all common pronouns ("a", "the", ...) to reduce the number of noisy features
cv2 = TfidfVectorizer(sublinear_tf= True, min_df=10, norm='l2', ngram_range=(1, 2), stop_words='english')

X_traincv = cv2.fit_transform(x_train)
x_testcv = cv2.transform(x_test)
print(X_traincv.toarray())

"""
[[0.         0.         0.         ... 0.         0.         0.        ]
 [0.         0.         0.         ... 0.         0.         0.        ]
 [0.         0.         0.         ... 0.         0.         0.        ]
 ...
 [0.         0.         0.         ... 0.         0.         0.        ]
 [0.         0.         0.         ... 0.         0.         0.        ]
 [0.         0.16996648 0.         ... 0.         0.         0.        ]]
"""
```

<br>

## Build the model with the best estimator

```python
# Hyperparameter grid RandomizedSearchCV will search over

from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import LinearSVC
from sklearn import svm
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import SGDClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier

from sklearn.metrics import accuracy_score
from sklearn.model_selection import GridSearchCV

# ignore ConvergenceWarnings
from  warnings import simplefilter
from sklearn.exceptions import ConvergenceWarning
simplefilter("ignore", category=ConvergenceWarning)

models = [
    { "estimater": KNeighborsClassifier(),
      "params": {
          "n_neighbors": [25,30,35,45],
          "weights": ['uniform','distance'],
          "leaf_size": [25,30,35]
        }
    },
    { "estimater": DecisionTreeClassifier(),
      "params": {
          "criterion": ['gini','entropy'],
          "splitter": ['best','random'],
          "max_depth": [None,90,95,100],
          "max_features": [None, "auto","sqrt","log2"],
          "random_state": [42]
      }
    },
    { "estimater": MultinomialNB(),
      "params": {
          "fit_prior": [True, False]
      }
    },
    { "estimater": LinearSVC(),
      "params": {
          "loss": ['hinge','squared_hinge'],
          "multi_class": ['ovr', 'crammer_singer'],
          "fit_intercept": [True, False],
          "random_state": [42],
          "max_iter": [900, 1000, 1100]
      }
    },
    { "estimater": svm.SVC(),
      "params": {
          'C': [0.1,1, 10, 100, 1000], 'gamma': [1,0.1,0.01,0.001,0.0001], 'kernel': ['rbf']
      }
    },
    { "estimater": RandomForestClassifier(),
      "params": {
      "criterion": ['gini','entropy'],
      "bootstrap": [True, False],
      "max_depth": [85,90,95,100],
      "max_features": ['sqrt','log2'],
      "n_estimators": [60, 80, 90],
      "random_state": [42]
      }
    },
    { "estimater": SGDClassifier(),
      "params": {
          "loss": ['hinge','log','perceptron'],
          "penalty": ['l2', 'l1'],
          "alpha": [0.0001, 0.0003, 0.0010],
          "early_stopping": [True],
          "max_iter": [1000, 1500],
          "random_state": [42]
      }
    }
]

column_names = ["KNeighbors", "DecisionTree", "MultiNB", "SVC", "SVM", "RFC", "SGDClassifier"]
entries = []

highest_acc = 0
best_model = None

for model in models:
  print(model["estimater"])

  # Create a based model
  clf = model["estimater"]
  # Instantiate the grid search model
  grid_search = GridSearchCV(estimator = clf, param_grid = model["params"],
                            cv = 3, n_jobs = 1)
  # Fit the model
  grid_search.fit(X_traincv, y_train);

  # Make a prediction on the test split to find model accuracy
  predicted = grid_search.predict(x_testcv)
  acc = accuracy_score(predicted, y_test)
  entries.append(acc)

  print(grid_search.best_params_)

  # If model have the highest accuracy, it's out best model
  if acc > highest_acc:
    highest_acc = acc
    best_model = grid_search
```

<br>

## Plotting each models performance

```python
import seaborn as sns
import matplotlib.pyplot as plt
plt.style.use('ggplot')
plt.figure(figsize=(8, 5))

df = pd.DataFrame({"Estimater": column_names,
                   "Accuracy": entries
                  })

sns.barplot(x='Estimater', y='Accuracy', data=df)

print(df)
```

![plot2](/assets/images/MultiClassText/plot2.jpg)

<br>

## Evaluating the model and make predictions

First we create an evaluation function to output all the needs metrics

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.metrics import classification_report

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

Now we make predictions using the test data to see how the model performs

```python
predicted = best_model.predict(x_testcv)
evaluate_preds(y_test, predicted)

"""
Acc: 88.82%
Precision: 0.89
Recall: 0.89
F1 score: 0.89
"""
```

<br>

Let's create a Classification report

```python
from sklearn import metrics
print(metrics.classification_report(y_test, predicted,
                                    target_names=dataset['Product'].unique()))

"""
                          precision    recall     f1-score   support

        Debt collection       0.84      0.90      0.87        73
Bank account or service       0.88      0.90      0.89       110
       Credit reporting       0.90      0.96      0.93        79
               Mortgage       0.95      0.84      0.89        43
           Student loan       0.94      0.65      0.77        26

               accuracy                           0.89       331
              macro avg       0.90      0.85      0.87       331
           weighted avg       0.89      0.89      0.89       331
"""
```

- **Accuracy** is a good measure to start with if all classes are balanced (e.g. same amount of samples which are labelled with 0 or 1).
- **Precision** and recall become more important when classes are imbalanced. If false positive predictions are worse than false negatives, aim for higher precision. If false negative predictions are worse than false positives, aim for higher recall.
- **F1-score** is a combination of precision and recall.

<br>

And finally a Confusion Matrix

```python
from sklearn.metrics import confusion_matrix

conf_mat = confusion_matrix(y_test, predicted)
fig, ax = plt.subplots(figsize=(8,6))
sns.heatmap(conf_mat, annot=True, fmt='d',
            xticklabels=dataset.Product.unique(), yticklabels=dataset.Product.unique())
plt.ylabel('Actual')
plt.xlabel('Predicted')
plt.show()
```

![plot3](/assets/images/MultiClassText/plot3.jpg)

<br>

## Let's make a prediction

Display the unique products and there category ids

```python
uniques = dataset.drop('ConsumerComplaint', axis=1)
unique_labels = uniques.drop_duplicates()
unique_labels
```

![datset2](/assets/images/MultiClassText/dataset2.jpg)

```python
inputStr = cv2.transform(["I need to finance my student loan please"])
results = best_model.predict(inputStr )

print(f'Product category id: {results[0]}')
print(f'Product Name: { np.asarray(unique_labels[unique_labels.category_id.eq(results[0])])[0][0] }')
print(f'Accuracy score: { acc.max() * 100}')

"""
Product category id: 7
Product Name: Student loan
Accuracy score: 87.00906344410876
"""
```

<br>
<br>

The Jupyter Notebook can be found here, [GitHub](https://github.com/snymanje/MultiClass-Text-Classification/blob/master/MultiClass_Text_Classification_with_Multiple_Estimators_and_Hyperparameter_Optimization.ipynb)
