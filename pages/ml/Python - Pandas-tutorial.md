---
title: Pandas Tutorial
excerpt: "A Quick Introduction to Data Analysis and Manipulation with Python and Pandas"
date: 2020-05-01
tags: ["Machine Learning", "pandas"]
keywords: "pandas data analysis, manipulating data with pandas"
sidebar: auto
---

# Pandas Tutorial

<br>
<hr>
<br>

## What is pandas?

If you're getting into machine learning and data science and you're using Python, you're going to use pandas.  
Pandas is an open source library which helps you analyse and manipulate data.

Pandas provides a simple to use but very capable set of functions you can use on your data.

It's integrated with many other data science and machine learning tools which use Python so having an understanding of it will be helpful throughout your journey.

One of the main use cases you'll come across is using pandas to transform your data in a way which makes it usable with machine learning algorithms.

<br>

## Importing pandas

To get started using pandas, the first step is to import it.  
The most common way (and method you should use) is to import pandas as the abbreviation pd.

```python
import pandas as pd
```

<br>

## Datatypes

Pandas has **_two_** main datatypes, **_Series_** and **_DataFrame_**.

- Series - a 1-dimensional column of data.
- DataFrame (most common) - a 2-dimesional table of data with rows and columns.

<br>

You can **_create a Series_** using **_pd.Series()_** and passing it a **_Python list_**.

```python
# Creating a series of car types
cars = pd.Series(["BMW", "Toyota", "Honda"])
cars

"""
0    BMW
1    Toyota
2    Honda
dtype: object
"""

# Creating a series of colours
colours = pd.Series(["Blue", "Red", "White"])
colours

"""
0    Blue
1    Red
2    White
dtype: object
"""
```

<br>

You can **_create a DataFrame_** by using **_pd.DataFrame()_** and passing it a **_Python dictionary_**.  
Let's use our two Series as the values.

```python
# Creating a DataFrame of cars and colours
car_data = pd.DataFrame({"Car type": cars,
                         "Colour": colours})
car_data

"""
0	BMW	    Blue
1	Toyota	Red
2	Honda	White
"""
```

<br>

## Anatomy of a DataFrame

Different functions use different labels for different things. This graphic sums up some of the main components of DataFrame's and their different names.  
![PandasDataframeAnatomy](/assets/images/Numpy/PandasDataframeAnatomy.png)

<br>

## Importing data

Creating Series and DataFrame's from scratch is nice but what you'll usually be doing is importing your data in the form of a .csv (comma separated value) or spreadsheet file.

Pandas allows for easy importing of data like this through functions such as pd.read_csv() and pd.read_excel() (for Microsoft Excel files).

```python
# Import the car sales data and save it to df
df = pd.read_csv("../data/car-sales.csv")
df

"""

Make	Colour	Odometer (KM)	Doors	Price
Toyota	White	150043	        4	    $4,000.00
Toyota	Blue	32549	        3	    $7,000.00
Nissan	White	213095	        4	    $3,500.00
"""
```

<br>

## Exporting data

After you've made a few changes to your data, you might want to export it and save it so someone else can access the changes.  
Pandas allows you to export DataFrame's to .csv format using .to_csv() or spreadsheet format using .to_excel().

```python
# Export the car sales DataFrame to csv
car_sales.to_csv("../data/exported-car-sales.csv")
```

<br>

## Describing data

One of the first things you'll want to do after you import some data into a pandas DataFrame is to start exploring it.

Pandas has many built in functions which allow you to quickly get information about a DataFrame.

Let's explore some using the car_sales DataFrame.

```python
# .dtypes shows us what datatype each column contains.
car_sales.dtypes

"""
Make         object
Colour       object
Odometer     int64
Doors        int64
Price        object
dtype: object
"""

# .describe() gives you a quick statistical overview of the numerical columns.
car_sales.describe()

"""
	    Odometer	    Doors
count	10.000000	    10.000000
mean	78601.400000	4.000000
std	    61983.471735	0.471405
min	    11179.000000	3.000000
25%	    35836.250000	4.000000
50%	    57369.000000	4.000000
75%	    96384.500000	4.000000
max	    213095.000000	5.000000
"""

# .info() shows a handful of useful information about a DataFrame such as:

# How many entries (rows) there are
# Whether there are missing values
# (if a columns non-null value is less than the number of entries, it has missing values)
# The datatypes of each column

car_sales.info()

"""
RangeIndex:     10 entries, 0 to 9
Data columns    (total 5 columns):
Make            10 non-null object
Colour          10 non-null object
Odometer        10 non-null int64
Doors           10 non-null int64
Price           10 non-null object
dtypes: int64(2), object(3)
"""

# Calling .mean() on a DataFrame
car_sales.mean()
"""
dometer    78601.4
Doors           4.0
dtype: float64
"""

# Calling .mean() on a Series
car_prices = pd.Series([3000, 3500, 11250])
car_prices.mean()
# 5916.666666666667

# Calling .sum() on a DataFrame
car_sales.sum()
"""
Make            ToyotaHondaToyotaBMWNissanToyotaHondaHondaToyo...
Colour          WhiteRedBlueBlackWhiteGreenBlueBlueWhiteWhite
Odometer                                               786014
Doors                                                      40
Price           $4,000$5,000$7,000$22,000$3,500$4,500$7,500$7,...
dtype: object
"""

# Calling .sum() on a Series
car_prices.sum()
# 17750

# Calling these on a whole DataFrame may not be as helpful as targeting an individual column.
# But it's helpful to know they're there.
# .columns will show you all the columns of a DataFrame.
car_sales.columns
# Index(['Make', 'Colour', 'Odometer', 'Doors', 'Price'], dtype='object')

# Convert df to lsit
list(car_sales.columns)
# ['Make', 'Colour', 'Odometer', 'Doors', 'Price']

# Show the length of a DataFrame
len(car_sales)
# 10
```

<br>

## Deleting a column

```python
dataset.drop('GroupId', axis=1, inplace=True)
```

<br>

## Viewing and selecting data

<br>

- head()
- tail()
- loc
- iloc
- columns - df['A']
- boolean indexing - df[df['A'] > 5]
- crosstab()
- .plot()
- hist()

```python
# Show the first 5 rows of car_sales
car_sales.head()

"""
	Make	Colour	Odometer	Doors	Price
0	Toyota	White	150043	    4	    $4,000
2	Toyota	Blue	32549	    3	    $7,000
4	Nissan	White	213095	    4	    $3,500
"""

# Show the first 7 rows of car_sales
car_sales.head(7)

# Show bottom 5 rows of car_sales
car_sales.tail()

# You can use .loc[] and .iloc[] to select data from your Series and DataFrame's.
animals = pd.Series(["cat", "dog", "bird", "snake", "ox", "lion"],
                   index=[0, 3, 9, 8, 67, 3])
animals
"""
0       cat
3       dog
9      bird
8     snake
67       ox
3      lion
dtype: object
"""

# .loc[] takes an integer as input.
# And it chooses from your Series or DataFrame whichever index matches the number.
animals.loc[3]
"""
3     dog
3    lion
dtype: object
"""

# iloc[] does a similar thing but works with exact positions.
animals.iloc[3]
# snake

# Get all rows up to position 3
animals.iloc[:3]
"""
0     cat
3     dog
9    bird
dtype: object
"""

# Get all rows up to (and including) index 3
car_sales.loc[:3]
"""
Make	Colour	Odometer (KM)	Doors	Price
0	    Toyota	White	150043	4	    $4,000.00
1	    Honda	Red	    87899	4	    $5,000.00
2	    Toyota	Blue	32549	3	    $7,000.00
3	    BMW	    Black	11179	5	    $22,000.00
"""

# When should you use .loc[] or .iloc[]?
# Use .loc[] when you're referring to indexes.
# Use .iloc[] when you're referring to positions in the DataFrame (index is out of order).

# Select Make column
car_sales['Make']
"""
0    Toyota
1     Honda
2    Toyota
3       BMW
Name: Make, dtype: object
"""

# Select cars with over 100,000 on the Odometer
car_sales[car_sales["Odometer (KM)"] > 100000]

# Select cars which are made by Toyota
car_sales[car_sales["Make"] == "Toyota"]

# pd.crosstab() is a great way to view two different columns together and compare them.
# Compare car Make with number of Doors
pd.crosstab(car_sales["Make"], car_sales["Doors"])

"""
Doors	3	4	5
Make
BMW	    0	0	1
Honda	0	3	0
Nissan	0	2	0
Toyota	1	3	0
"""

# If you want to compare more columns in the context of another column, you can use .groupby().
# Group by the Make column and find the mean of the other columns
car_sales.groupby(["Make"]).mean()

```

<br>

## Plotting with Pandas

<br>

Pandas even allows for quick plotting of columns so you can see your data visualling.  
To plot, you'll have to import matplotlib. If your plots aren't showing, try running the two lines of code below.

%matplotlib inline is a special command which tells Jupyter to show your plots.  
Commands with % at the front are called magic commands.

```python
# Import matplotlib and tell Jupyter to show plots
import matplotlib.pyplot as plt
%matplotlib inline

# You can visualize a column by calling .plot() on it.
car_sales["Odometer (KM)"].plot()
```

![odometer](/assets/images/Numpy/odometer.jpg)
<br>

```python
# You can see the distribution of a column by calling .hist() on you.
# The distribution of something is a way of describing the spread of different values.
car_sales["Odometer (KM)"].hist()
```

![bar](/assets/images/Numpy/bar.jpg)
<br>

```python
# Change Price column to integers
car_sales["Price"] = car_sales["Price"].str.replace('[\$\,\.]', '').astype(int)
car_sales["Price"].plot()
```

![price](/assets/images/Numpy/price.jpg)
<br>

## Manipulating data

<br>

You've seen an example of one way to manipulate data but pandas has many more. How many more? Put it this way, if you can imagine it, chances are, pandas can do it.

Let's start with string methods. Because pandas is based on Python, however you can manipulate strings in Python, you can do the same in pandas.

You can access the string value of a column using .str. Knowing this, how do you think you'd set a column to lowercase?

```python
# Lower the Make column
car_sales["Make"].str.lower()
"""
0    toyota
1     honda
2    toyota
3       bmw
4    nissan
5    toyota
6     honda
7     honda
8    toyota
9    nissan
"""

# Set Make column to be lowered
car_sales["Make"] = car_sales["Make"].str.lower()
car_sales.head()

"""
	Make	Colour	Odometer	Doors	Price
0	toyota	White	150043	    4	    4000
1	honda	Red	    87899	    4	    5000
2	toyota	Blue	32549	    3	    7000
3	bmw	    Black	11179	    5	    22000
4	nissan	White	213095	    4	    3500
"""

# Fill the Odometer missing values with the mean and with inplace=True ( No need to reassign car_sales )
"""
	Make	Colour	Odometer	Doors	Price
0	toyota	White	150043	    4	    4000
1	honda	Red	    87899	    4	    5000
2	toyota	Blue	NaN	    3	    7000
"""
car_sales["Odometer"].fillna(car_sales["Odometer"].mean(),
                                     inplace=True)

"""
	Make	Colour	Odometer	Doors	Price
0	toyota	White	150043	    4	    4000
1	honda	Red	    87899	    4	    5000
2	toyota	Blue	92302	    3	    7000
"""

# Remove missing data
# The following two lines do the same thing
car_sales.dropna(inplace=True) # Operation happens inplace without reassignment
car_sales = car_sales.dropna() # car_sales gets reassigned to same DataFrame but with dropped values

# Adding new columns
# Create a column from a pandas Series
seats_column = pd.Series([5, 5, 5, 5, 5, 5, 5, 5, 5, 5])
car_sales["Seats"] = seats_column

# Create a column from a Python list
engine_sizes = [1.3, 2.0, 3.0, 4.2, 1.6, 1, 2.0, 2.3, 2.0, 3.0]
car_sales["Engine Size"] = engine_sizes

# Column from other columns
car_sales["Price per KM"] = car_sales["Price"] / car_sales["Odometer"]

# You can also create a new column setting all values to a one standard value.
# Column to all 1 value (number of wheels)
car_sales["Number of wheels"] = 4

# Removing columns
# You can remove a column using .drop('COLUMN_NAME', axis=1).
# Drop the Price per KM column
car_sales = car_sales.drop("Price per KM", axis=1)

# Why axis=1? Because that's the axis columns live on. Rows live on axis=0.
# Let's say you wanted to shuffle the order of your DataFrame so
# you could split it into train, validation and test sets.
# And even though the order of your samples was random, you wanted to make sure.
# To do so you could use .sample(frac=1).
# .sample() randomly samples different rows from a DataFrame.
# The frac parameter dictates the fraction, where 1 = 100% of rows, 0.5 = 50% of rows, 0.01 = 1% of rows.

# Sample car_sales
car_sales_sampled = car_sales.sample(frac=1)

# What if you wanted to get the indexes back in order?
# You could do so using .reset_index().
# Reset the indexes of car_sales_sampled
car_sales_sampled.reset_index()

# Finally, what if you wanted to apply a function to a column.
# Such as, converting the Odometer column from kilometers to miles.
# You can do so using the .apply() function and passing it a lambda function.
# We know there's about 1.6 kilometers in a mile, so if you divide the value
# in the Odometer column by 1.6, it should convert it to miles.

# Change the Odometer values from kilometres to miles
car_sales["Odometer"] = car_sales["Odometer"].apply(lambda x: x / 1.6)

# If you've never seen a lambda function they can be tricky. What the line above is saying is "take the value in the Odometer (KM) column (x) and set it to be itself divided by 1.6".
```
