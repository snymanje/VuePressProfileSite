---
title: Unsupervised Text Clustering with K-Means
excerpt: "Using K-Means Clustering to group consumer complaints"
date: 2020-05-23
tags: ["Machine Learning"]
keywords: "Unsupervised machine learning with Scikit-Learn"
sidebar: auto
---

# Unsupervised Text Clustering with K-Means

<br>
<hr>
<br>

So what exactly is K-means? Well, it is an unsupervised learning algorithm (meaning there are no target labels) that allows you to identify similar groups or clusters of data points within your data.

In this example we do have the labels but we will only us it to see how well the model performed.

## Import and Munipulate the data

```python
import pandas as pd
import numpy as np

# Import the Consumer Complaints dataset
dataset = pd.read_csv('drive/My Drive/Colab Notebooks/Consumer_Complaints.csv')

# Only select the Product and Consumer complaint columns
col = ['Product', 'Consumer Complaint']
dataset= dataset[col]

# Drop rows with missing labels
dataset.dropna(subset=["Consumer Complaint"], inplace=True)

# Rename the Consumer Complaint column to ConsumerComplaint
dataset.columns=['Product', 'ConsumerComplaint']

# Select only only these products
dataset=dataset[dataset['Product'].isin(['Credit reporting',
                                         'Debt collection',
                                         'Mortgage',
                                         'Credit card',
                                         'Student loan',
                                         'Bank account or service',
                                         'Consumer Loan'])]

# Shuffel the dataset to make sure we get an equal distribution of the data before splitting into train and test sets
dataset = dataset.sample(frac=1)
dataset.head()
```

![datset10](/assets/images/BinaryClass/dataset10.jpg)

<br>

## Plot the data

```python
import seaborn as sns
import matplotlib.pyplot as plt

sns.set_style('whitegrid')
plt.figure(figsize=(8, 6))
ax = sns.countplot(x='Product', data=dataset)
ax.set_xticklabels(ax.get_xticklabels(), rotation=40, ha="right")
plt.tight_layout()
```

![plot10](/assets/images/BinaryClass/plot10.jpg)

<br>

## Clean the data

We need to remove stop words, numbers, unnecessary white space or any other characters that can badly effect the outcome.

And lastly we will stem the data

```python
# What does the data look like now?
dataset["ConsumerComplaint"]
```

![datset11](/assets/images/BinaryClass/dataset11.jpg)

From the above we can see that we need to convert everything to lowercase, and remove numbers and thinks like \n

Let's create a function to do most of this.

```python
from nltk.stem import PorterStemmer
stemmer = PorterStemmer()
import re
import nltk
nltk.download('stopwords')
nltk.download('punkt')
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

```python
# What does the data look like now?
dataset["ConsumerComplaint"] = dataset["ConsumerComplaint"].apply(clean_text)
dataset["ConsumerComplaint"]
```

![datset12](/assets/images/BinaryClass/dataset12.jpg)

This looks much better!

<br>

## Run TF IDF Vectorizer on the text data

Convert text features to numeric The classifiers and learning algorithms can not directly process the text documents in their original form, as most of them expect numerical feature vectors with a fixed size rather than the raw text documents with variable length. Therefore, during the preprocessing step, the texts are converted to a more manageable representation.

One common approach for extracting features from text is to use the bag of words model: a model where for each document, a complaint narrative in our case, the presence (and often the frequency) of words is taken into consideration, but the order in which they occur is ignored.

Specifically, for each term in our dataset, we will calculate a measure called Term Frequency, Inverse Document Frequency, abbreviated to tf-idf. We will use sklearn.feature_extraction.text.TfidfVectorizer to calculate a tf-idf vector for each of consumer complaint narratives

```python
# Run TF IDF Vectorizer on the text data
from sklearn.feature_extraction.text import TfidfVectorizer

# sublinear_df is set to True to use a logarithmic form for frequency
# min_df is the minimum numbers of documents a word must be present in to be kept
# norm is set to l2, to ensure all our feature vectors have a euclidian norm of 1
# ngram_range is set to (1, 2) to indicate that we want to consider both unigrams and bigrams
# stop_words is set to "english" to remove all common pronouns ("a", "the", ...) to reduce the number of noisy features
vectorizer = TfidfVectorizer(sublinear_tf= True, min_df=10, norm='l2', ngram_range=(1, 2), stop_words='english')
X_train_vc = vectorizer.fit_transform(dataset["ConsumerComplaint"])

pd.DataFrame(X_train_vc.toarray(), columns=vectorizer.get_feature_names()).head()
```

![datset13](/assets/images/BinaryClass/dataset13.jpg)

<br>

### Elbow method to select number of clusters

This method looks at the percentage of variance explained as a function of the number of clusters: One should choose a number of clusters so that adding another cluster doesn't give much better modeling of the data. More precisely, if one plots the percentage of variance explained by the clusters against the number of clusters, the first clusters will add much information (explain a lot of variance), but at some point the marginal gain will drop, giving an angle in the graph. The number of clusters is chosen at this point, hence the "elbow criterion". This "elbow" cannot always be unambiguously identified. Percentage of variance explained is the ratio of the between-group variance to the total variance, also known as an F-test. A slight variation of this method plots the curvature of the within group variance.

### Basically, number of clusters = the x-axis value of the point that is the corner of the "elbow"(the plot looks often looks like an elbow)

```python
# set clusters to 10 ( To start with as a test )
k_clusters = 10
```

```python
from sklearn.cluster import KMeans

score = []
for i in range(1,k_clusters + 1):
    kmeans = KMeans(n_clusters=i,init='k-means++',max_iter=300,n_init=5,random_state=0)
    kmeans.fit(X_train_vc)
    score.append(kmeans.inertia_)
plt.plot(range(1,k_clusters + 1 ),score)
plt.title('The Elbow Method')
plt.xlabel('Number of clusters')
plt.ylabel('Score')
plt.savefig('elbow.png')
plt.show()
```

![plot11](/assets/images/BinaryClass/plot11.jpg)

<br>

## Train the model to find 6 clusters

We will use 6 cluster because we already know we have 6 categories, but normally you wont know this.

```python
k_clusters = 7

model = KMeans(n_clusters=k_clusters, init='k-means++', n_init=10, max_iter=600, tol=0.000001, random_state=0)
model.fit(X_train_vc)
```

<br>

## Make predictions and display the results

```python
clusters = model.predict(X_train_vc)
```

```python
# Create a new column to display the predicted result
dataset["ClusterName"] = clusters
dataset.head(20)
```

![datset14](/assets/images/BinaryClass/dataset14.jpg)

<br>

## View top terms per cluster

```python
def get_top_features_cluster(tf_idf_array, prediction, n_feats):
    labels = np.unique(prediction)
    dfs = []
    for label in labels:
        id_temp = np.where(prediction==label) # indices for each cluster
        x_means = np.mean(tf_idf_array[id_temp], axis = 0) # returns average score across cluster
        sorted_means = np.argsort(x_means)[::-1][:n_feats] # indices with top 20 scores
        features = vectorizer.get_feature_names()
        best_features = [(features[i], x_means[i]) for i in sorted_means]
        df = pd.DataFrame(best_features, columns = ['features', 'score'])
        dfs.append(df)
    return dfs


def plotWords(dfs, n_feats):
    for i in range(0, len(dfs)):
        plt.figure(figsize=(8, 2))
        plt.title(("Most Common Words in Cluster {}".format(i)), fontsize=10, fontweight='bold')
        sns.barplot(x = 'score' , y = 'features', orient = 'h' , data = dfs[i][:n_feats])

dfs = get_top_features_cluster(X_train_vc.toarray(), prediction, 4)
plotWords(dfs, 4)
```

![plot13](/assets/images/BinaryClass/plot13.jpg)

![plot14](/assets/images/BinaryClass/plot14.jpg)

![plot15](/assets/images/BinaryClass/plot15.jpg)

<br>

## Plot the clusters in a scatter plot

```python
from sklearn.decomposition import PCA

sklearn_pca = PCA(n_components = 2)
Y_sklearn = sklearn_pca.fit_transform(X_train_vc.toarray())
kmeans = KMeans(n_clusters=k_clusters, max_iter=600, algorithm = 'auto')
fitted = kmeans.fit(Y_sklearn)
prediction = kmeans.predict(Y_sklearn)

plt.figure(figsize=(14, 7))
plt.scatter(Y_sklearn[:, 0], Y_sklearn[:, 1], c=prediction, s=40, cmap='viridis', linewidths=5)

centers = fitted.cluster_centers_
plt.scatter(centers[:, 0], centers[:, 1],c='black', s=200, alpha=0.6);
```

![plot12](/assets/images/BinaryClass/plot12.jpg)

<br>

## Make new predications

```python
cleaned_data = ["I would like to change my mortgage debit order",
                "Please send me my latest credit card statement",
                "I would like to apply for a student loan"]
cleaned_data = pd.DataFrame(cleaned_data, columns=["ConsumerComplaints"])
cleaned_data = cleaned_data["ConsumerComplaints"].apply(clean_text)
predicted = model.predict(vectorizer.transform(cleaned_data))
predicted
# array([6, 1, 0], dtype=int32)
```

<br>

View top words 7 words for each cluster

```python
# Just print it to the screen
order_centroids = model.cluster_centers_.argsort()[:, ::-1]

terms = vectorizer.get_feature_names()
for i in range(k_clusters):
    top_ten_words = [terms[ind] for ind in order_centroids[i, :k_clusters]]
    print("Cluster {}: {}".format(i, ' '.join(top_ten_words)))

"""
Cluster 0: payment loan pay month make late year
Cluster 1: card credit card credit charg use account balanc
Cluster 2: account bank check money deposit check account open
Cluster 3: report disput account credit inform equifa verifi
Cluster 4: report credit credit report remov inquiri account inform
Cluster 5: debt collect compani phone receiv number ask
Cluster 6: mortgag loan home modif payment foreclosur properti
"""
```

<br>
<br>

## Conclusion

This dataset is not that great, we need a larger dataset, but the principals and code stays the same.

The Jupyter Notebook can be found here, [GitHub](https://github.com/snymanje/MultiClass-Text-Classification-Unsupervised/blob/master/Unsupervised_Text_Clustering_with_K_Means.ipynb)
