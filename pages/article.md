---
title: MultiClass Text Classification with Scikit-Learn
lang: en-US
published: 2019-09-19
meta:
  keywords:
    - TypeScript
    - JavaScript
    - Tutorial
  description:
    content: Article on TypeScript
---

# MultiClass Text Classification with Scikit-Learn
<br>
<hr>
<br>

Let's see the code
```js{2}
const newVar
newVar = [1,2,3,4,5]
console.log(newVar)
```

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

The Jupyter Notebook can be found here, [GitHub](https://github.com/snymanje/MultiClass-Text-Classification/blob/master/MultiClass_Text_Classification_with_Multiple_Estimators_and_Hyperparameter_Optimization.ipynb) 

