---
title: Regression with Scikit-Learn
excerpt: "Random Forest Regressor Workflow for Predicting House Prices"
date: 2020-05-19
tags: ["python", "ml"]
keywords: "machine learning with Scikit-Learn"
cover_image: ""
---

# Regression with Scikit-Learn

<br>
<hr>
<br>

## Get the data ready

As an example dataset, we'll import Consumer_Complaints.csv.

```python
# Import packages
import pandas as pd
import numpy as np

# Import the Boston housing dataset
from sklearn.datasets import load_boston
boston = load_boston()
boston # imports as dictionary

# Since it's in a dictionary, let's turn it into a DataFrame so we can inspect it better.
boston_df = pd.DataFrame(boston["data"], columns=boston["feature_names"])
boston_df["target"] = pd.Series(boston["target"])
boston_df.head()
```

![datset5](/assets/images/BinaryClass/dataset5.jpg)

<br>
Beautiful, our goal here is to use the feature columns, such as CRIM, which is the per capita crime rate by town, AGE, the proportion of owner-occupied units built prior to 1940 and more to predict the target column.

Where the target column is the median house prices.

In essence, each row is a different town in Boston (the data) and we're trying to build a model to predict the median house price (the label) of a town given a series of attributes about the town.

Since we have data and labels, this is a supervised learning problem. And since we're trying to predict a number, it's a regression problem.

<br>

## Build the Model

```python
# Import the RandomForestRegressor model class from the ensemble module
from sklearn.ensemble import RandomForestRegressor

# Setup random seed
np.random.seed(42)

# Create the data
X = boston_df.drop("target", axis=1)
y = boston_df["target"]

# Split into train and test sets
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Institate and fit the model (on the training set)
model = RandomForestRegressor()
model.fit(X_train, y_train)

# Check the score of the model (on the test set)
model.score(X_test, y_test)
# 0.873969014117403
```

<br>

```python
# Make predictions
y_preds = model.predict(X_test)

# Compare the predictions to the truth
from sklearn.metrics import mean_absolute_error
mean_absolute_error(y_test, y_preds)
# 2.1226372549019623
```

<br>

Our model achieves an MAE of 2.122. This means, on average our models predictions are 2.122 units away from the actual value.  
Let's make it a little more visual.

```python
df = pd.DataFrame(data={"actual values": y_test,
                   "predictions": y_preds})

df
```

![plot5](/assets/images/BinaryClass/plot5.jpg)

<br>

## Regression model evaluation metrics

Similar to classification, there are several metrics you can use to evaluate your regression models.

We'll check out the following.

- **R^2 (pronounced r-squared)** or coefficient of determination - Compares your models predictions to the mean of the targets. Values can range from negative infinity (a very poor model) to 1. For example, if all your model does is predict the mean of the targets, its R^2 value would be 0. And if your model perfectly predicts a range of numbers it's R^2 value would be 1.
- **Mean absolute error (MAE)** - The average of the absolute differences between predictions and actual values. It gives you an idea of how wrong your predictions were.
- **Mean squared error (MSE)** - The average squared differences between predictions and actual values. Squaring the errors removes negative errors. It also amplifies outliers (samples which have larger errors).

```python
# Evaluate the model

from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error

print("Regression model metrics on the test set:")
print(f"R^2: {r2_score(y_test, y_preds):.2f}")
print(f"MAE: {mean_absolute_error(y_test, y_preds):.2f}")
print(f"MSE: {mean_squared_error(y_test, y_preds):.2f}")

"""
Regression model metrics on the test set:
R^2: 0.87
MAE: 2.12
MSE: 9.24
"""
```

<br>

MSE will always be higher than MAE because is squares the errors rather than only taking the absolute difference into account.

Now you might be thinking, which regression evaluation metric should you use?

- **R^2** is similar to accuracy. It gives you a quick indication of how well your model might be doing. Generally, the closer your R^2 value is to 1.0, the better the model. But it doesn't really tell exactly how wrong your model is in terms of how far off each prediction is.
- **MAE** gives a better indication of how far off each of your model's predictions are on average.
- As for **MAE** or **MSE**, because of the way MSE is calculated, squaring the differences between predicted values and actual values, it amplifies larger differences.

<br>

## Hyperparameter tuning with RandomizedSearchCV

Scikit-Learn's RandomizedSearchCV allows us to randomly search across different hyperparameters to see which work best.  
It also stores details about the ones which work best!

Let's see it in action.  
First, we create a grid (dictionary) of hyperparameters we'd like to search over.

```python
# Hyperparameter grid RandomizedSearchCV will search over
grid = {"n_estimators": [10, 100, 200, 500, 1000, 1200],
        "max_depth": [None, 5, 10, 20, 30],
        "max_features": ["auto", "sqrt"],
        "min_samples_split": [2, 4, 6],
        "min_samples_leaf": [1, 2, 4]}
```

<br>

RandomizedSearchCV try n_iter combinations of different values. Where as, GridSearchCV will try every single possible combination.

And if you remember from before when we did the calculation: max_depth has 4, max_features has 2, min_samples_leaf has 3, min_samples_split has 3, n_estimators has 5.

That's 4x2x3x3x5 = 360 models!

This could take a long time depending on the power of the computer you're using, the amount of data you have and the complexity of the hyperparamters (usually higher values means a more complex model).

In our case, the data we're using is relatively small (only ~300 samples).

Since we've already tried to find some ideal hyperparameters using RandomizedSearchCV, we'll create another hyperparameter grid based on the best*params* of rs_model\* with less options and then try to use GridSearchCV to find a more ideal set.

Note: Based on the best*params* of rs_clf implies the next set of hyperparameters we'll try are roughly in the same range of the best set found by RandomizedSearchCV.

```python
# Setup RandomizedSearchCV
from sklearn.model_selection import RandomizedSearchCV

rs_model = RandomizedSearchCV(estimator=model,
                            param_distributions=grid,
                            n_iter=20, # try 20 models total
                            cv=5, # 5-fold cross-validation
                            verbose=2) # print out results

# Fit the RandomizedSearchCV version of clf
rs_model.fit(X_train, y_train)
```

<br>

```python
# Find the best hyperparameters found by RandomizedSearchCV
rs_model.best_params_

"""
{'max_depth': 10,
 'max_features': 'sqrt',
 'min_samples_leaf': 1,
 'min_samples_split': 2,
 'n_estimators': 500}
"""
```

## Evaluating the model and make predictions

```python
# Make predictions with the best hyperparameters
rs_y_preds = model.predict(X_test)

# Evaluate the model

from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error

print("Regression model metrics on the test set:")
print(f"R^2: {r2_score(y_test, rs_y_preds):.2f}")
print(f"MAE: {mean_absolute_error(y_test, rs_y_preds):.2f}")
print(f"MSE: {mean_squared_error(y_test, rs_y_preds):.2f}")

"""
Regression model metrics on the test set:
R^2: 0.87
MAE: 2.12
MSE: 9.24
"""
```

<br>

## Setup GridSearchCV

```python
grid_2 = {'n_estimators': [1200, 1500, 2000],
          'max_depth': [None, 5, 10],
          'max_features': ['auto', 'sqrt'],
          'min_samples_split': [4, 6],
          'min_samples_leaf': [1, 2]}

# Setup GridSearchCV
from sklearn.model_selection import GridSearchCV

gs_model = GridSearchCV(estimator=model,
                      param_grid=grid_2,
                      cv=5, # 5-fold cross-validation
                      verbose=2) # print out progress

# Fit the RandomizedSearchCV version of clf
gs_model.fit(X_train, y_train);
```

<br>
<br>

The Jupyter Notebook can be found here, [GitHub](https://github.com/snymanje/Scikit-Learn-Regression/blob/master/Random_Forest_Regressor_Workflow_for_Predicting_House_Prices.ipynb)
