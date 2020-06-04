---
title: Numpy Tutorial
excerpt: "A Quick Introduction to Numerical Data Manipulation with Python and NumPy"
date: 2020-05-10
tags: ["python", "numpy", "ml"]
keywords: "numpy data manipulation, manipulating data with numpy"
sidebar: auto
---

# Numpy Tutorial

<br>
<hr>
<br>

## What is Numpy?

<br>

NumPy stands for numerical Python. It's the backbone of all kinds of scientific and numerical computing in Python.  
And since machine learning is all about turning data into numbers and then figuring out the patterns, NumPy often comes into play.

You can do numerical calculations using pure Python. In the beginning, you might think Python is fast but once your data gets large, you'll start to notice slow downs.

One of the main reasons you use NumPy is because it's fast. Behind the scenes, the code has been optimized to run using C. Which is another programming language, which can do things much faster than Python.

<br>

## Importing NumPy

<br>

```python
import numpy as np
```

<br>

## DataTypes and attributes

<br>

**NOTE:** It's important to remember the **_main type_** in NumPy is **_ndarray_**, even seemingly different kinds of arrays are still ndarray's. This means an operation you do on one array, will work on another.

```python
# 1-dimensonal array, also referred to as a vector
a1 = np.array([1, 2, 3])

# 2-dimensional array, also referred to as matrix
a2 = np.array(
    [
     [1, 2.0, 3.3],
     [4, 5, 6.5]
    ]
)

# 3-dimensional array, also referred to as a matrix
a3 = np.array(
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      [
        [10, 11, 12],
        [13, 14, 15],
        [16, 17, 18]
      ]
    ]
)

a1.shape, a1.ndim, a1.dtype, a1.size, type(a1)
# ((3,), 1, dtype('int64'), 3, numpy.ndarray)

a2.shape, a2.ndim, a2.dtype, a2.size, type(a2)
# ((2, 3), 2, dtype('float64'), 6, numpy.ndarray)

a3.shape, a3.ndim, a3.dtype, a3.size, type(a3)
# ((2, 3, 3), 3, dtype('int64'), 18, numpy.ndarray)

```

<br>

![NumpyArrayAnatomy.png](/assets/images/Numpy/NumpyArrayAnatomy.png)

<br>

Key terms:

- **Array** - A list of numbers, can be multi-dimensional.
- **Scalar** - A single number (e.g. 7).
- **Vector** - A list of numbers with 1-dimesion (e.g. np.array([1, 2, 3])).
- **Matrix** - A (usually) multi-deminsional list of numbers (e.g. np.array([[1, 2, 3], [4, 5, 6]])).

<br>

## Creating a Pandas DataFrame out of NumPy arrays

<br>

This is to examplify how NumPy is the backbone of many other libraries.

```python
import pandas as pd
df = pd.DataFrame(np.random.randint(10, size=(5, 3)),
                                    columns=['a', 'b', 'c'])
df

"""
    a	b	c
0	9	0	6
1	8	4	4
2	2	4	7
3	2	8	1
4	1	5	2
"""

a2 = np.array(
    [
     [1, 2.0, 3.3],
     [4, 5, 6.5]
    ]
)

df = pd.DataFrame(a2)
df

"""
    0	1	2
0	1.0	2.0	3.3
1	4.0	5.0	6.5
"""
```

<br>

## Creating arrays

<br>

- np.array()
- np.ones()
- np.zeros()
- np.random.rand(5, 3)
- np.random.randint(10, size=5)
- np.random.seed() - pseudo random numbers

<br>

```python
# Create a simple array
simple_array = np.array([1, 2, 3])
simple_array # array([1, 2, 3])

# Create an array of ones
ones = np.ones((10, 2))
ones

"""
array([[1., 1.],
       [1., 1.],
       [1., 1.],
       [1., 1.],
       [1., 1.],
       [1., 1.],
       [1., 1.],
       [1., 1.],
       [1., 1.],
       [1., 1.]])
"""

# The default datatype is 'float64'
ones.dtype  # dtype('float64')

# You can change the datatype with .astype()
ones.astype(int)

"""
array([[1, 1],
       [1, 1],
       [1, 1],
       [1, 1],
       [1, 1],
       [1, 1],
       [1, 1],
       [1, 1],
       [1, 1],
       [1, 1]])
"""

# Create an array within a range of values
range_array = np.arange(0, 10)
range_array # array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

range_array = np.arange(0, 10, 2) # skip by 2
range_array # array([0, 2, 4, 6, 8])

# Random array
random_array = np.random.randint(10, size=(5, 3))
random_array

"""
array([[3, 2, 4],
       [0, 9, 0],
       [6, 7, 5],
       [0, 1, 9],
       [5, 3, 1]])
"""


# Random array of floats (between 0 & 1)
np.random.random((5, 3))

"""
array([[0.20153841, 0.37582038, 0.60296171],
       [0.78922978, 0.61651979, 0.39181855],
       [0.21325988, 0.53159683, 0.97521884],
       [0.12675152, 0.34538155, 0.60466876],
       [0.66714451, 0.92307148, 0.85628976]])
"""


# Random 5x3 array of floats (between 0 & 1), similar to above
np.random.rand(5, 3)

"""
array([[0.66962815, 0.70759503, 0.81030571],
       [0.45215695, 0.00173544, 0.71588354],
       [0.30440026, 0.97664503, 0.07787752],
       [0.49839944, 0.2900812 , 0.83955077],
       [0.06752272, 0.73464427, 0.0827841 ]])
"""
```

<br>

NumPy uses pseudo-random numbers, which means, the numbers look random but aren't really, they're predetermined.

For consistency, you might want to keep the random numbers you generate similar throughout experiments.

To do this, you can use **np.random.seed()**.

What this does is it tells NumPy, "Hey, I want you to create random numbers but keep them aligned with the seed."

Let's see it.

```python
np.random.seed(42)

# Make 'random' numbers
np.random.randint(10, size=(5, 3))

"""
array([[6, 3, 7],
       [4, 6, 9],
       [2, 6, 7],
       [4, 3, 7],
       [7, 2, 5]])
"""
# Running it again gives us the same numbers
np.random.seed(42)
np.random.randint(10, size=(5, 3))

"""
array([[6, 3, 7],
       [4, 6, 9],
       [2, 6, 7],
       [4, 3, 7],
       [7, 2, 5]])
"""
```

<br>

Because **np.random.seed()** is set to 0, the random numbers are the same as the cell with np.random.seed() set to 0 as well.

Setting np.random.seed() is not 100% necessary but it's helpful to keep numbers the same throughout your experiments.

For example, say you wanted to split your data randomly into training and test sets.

Every time you randomly split, you might get different rows in each set.

If you shared your work with someone else, they'd get different rows in each set too.

Setting np.random.seed() ensures there's still randomness, it just makes the randomness repeatable. Hence the 'pseudo-random' numbers.

<br>

## Find the unique values in array

<br>

```python
# We can use the unique method
np.random.seed(42)
arr = np.random.randint(10, size=(5, 3))

print(arr)
"""
[[6 3 7]
 [4 6 9]
 [2 6 7]
 [4 3 7]
 [7 2 5]]
"""

print(np.unique(arr))
# [2 3 4 5 6 7 9]
```

<br>

## Viewing arrays and matrices (indexing)

<br>

Remember, because arrays and matrices are both ndarray's, they can be viewed in similar ways.

NumPy arrays get printed from outside to inside. This means the number at the end of the shape comes first, and the number at the start of the shape comes last.

```python
# 2-dimensional array, also referred to as matrix
a2 = np.array(
    [
     [1, 2.0, 3.3],
     [4, 5, 6.5]
    ]
)

# 3-dimensional array, also referred to as a matrix
a3 = np.array(
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      [
        [10, 11, 12],
        [13, 14, 15],
        [16, 17, 18]
      ]
    ]
)

# Get 2nd row (index 1) of a2
a2[1]
"""
array([4. , 5. , 6.5])
"""

# Get the first 2 values of the first 2 rows of both arrays
a3[:2, :2, :2]
"""
array([[[ 1,  2],
        [ 4,  5]],

       [[10, 11],
        [13, 14]]])
"""
```

<br>

## Manipulating and comparying arrays

<br>

- Arithmetic
  - +, -, \*, /, //, \*\*, %
  - np.exp()
  - np.log()
  - Dot product - np.dot()
  - Broadcasting
- Aggregation
  - np.sum() - faster than .sum(), make demo, np is really fast
  - np.mean()
  - np.std()
  - np.var()
  - np.min()
  - np.max()
  - np.argmin() - find index of minimum value
  - np.argmax() - find index of maximum value
  - These work on all ndarray's
    - a4.min(axis=0) -- you can use axis as well
- Reshaping
  - np.reshape()
  - Transposing
  - a3.T
- Comparison operators
  - \>
  - <
  - <=
  - \>=
  - x != 3
  - x == 3
  - np.sum(x > 3)

<br>

### Arithmetic

<br>

```python
a1
# array([1, 2, 3])

ones = np.ones(3)
ones
# array([1., 1., 1.])

# Add two arrays
a1 + ones
# array([2., 3., 4.])

# Subtract two arrays
a1 - ones
#array([0., 1., 2.])

# Multiply two arrays
a1 * ones
# array([1., 2., 3.])

# Multiply two arrays
a1 * a2
"""
array([[ 1. ,  4. ,  9.9],
       [ 4. , 10. , 19.5]])
"""

a1.shape, a2.shape
# ((3,), (2, 3))

# Divide two arrays
a1 / ones

# Divide using floor division
a2 // a1

# Take an array to a power
a1 ** 2

# You can also use np.square()
np.square(a1)

# Modulus divide (what's the remainder)
a1 % 2
# You can also find the log or exponential of an array using np.log() and np.exp().

# Find the log of an array
np.log(a1)

# Find the exponential of an array
np.exp(a1)
```

<br>

### Aggregation

<br>

Aggregation - bringing things together, doing a similar thing on a number of things.

```python
# Find the mean
np.mean(a2)

# Find the max
np.max(a2)

# Find the min
np.min(a2)

# Find the standard deviation
np.std(a2)

# Find the variance
np.var(a2)

# The standard deviation is the square root of the variance
np.sqrt(np.var(a2))
```

<br>

### What's mean?

Mean is the same as average. You can find the average of a set of numbers by adding them up and dividing them by how many there are.

### What's standard deviation?

Standard deviation is a measure of how spread out numbers are.

### What's variance?

The variance is the averaged squared differences of the mean.

To work it out, you:

- Work out the mean
- For each number, subtract the mean and square the result
- Find the average of the squared differences

<br>

```python
# Demo of variance
high_var_array = np.array([1, 100, 200, 300, 4000, 5000])
low_var_array = np.array([2, 4, 6, 8, 10])

np.var(high_var_array), np.var(low_var_array)
# (4296133.472222221, 8.0)

np.std(high_var_array), np.std(low_var_array)
# (2072.711623024829, 2.8284271247461903)

# The standard deviation is the square root of the variance
print(np.sqrt(np.var(high_var_array)))
print(np.sqrt(np.var(low_var_array)))

"""
2072.711623024829
2.8284271247461903
"""
```

<br>

### Reshaping

```python

a2 = np.array(
    [
     [1, 2.0, 3.3],
     [4, 5, 6.5]
    ]
)

a3 = np.array(
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      [
        [10, 11, 12],
        [13, 14, 15],
        [16, 17, 18]
      ]
    ]
)

a2.shape, a3.shape
# ((2, 3), (2, 3, 3))

a2 + a3
# ValueError: operands could not be broadcast together with shapes (2,3) (2,3,3)

a2 = a2.reshape(2, 3, 1)
a2.shape, a3.shape
# ((2, 3, 1), (2, 3, 3))

a2 + a3
"""
array([[[ 2. ,  3. ,  4. ],
        [ 6. ,  7. ,  8. ],
        [10.3, 11.3, 12.3]],

       [[14. , 15. , 16. ],
        [18. , 19. , 20. ],
        [22.5, 23.5, 24.5]]])
"""
```

<br>

### Transpose

<br>

The transpose of a matrix is obtained by moving the rows data to the column and columns data to the rows.  
If we have an array of shape (X, Y) then the transpose of the array will have the shape (Y, X).

```python
matrix = np.random.random(size=(5,3,3))
matrix

"""
array([[[5.64115790e-02, 7.21998772e-01, 9.38552709e-01],
        [7.78765841e-04, 9.92211559e-01, 6.17481510e-01],
        [6.11653160e-01, 7.06630522e-03, 2.30624250e-02]],

       [[5.24774660e-01, 3.99860972e-01, 4.66656632e-02],
        [9.73755519e-01, 2.32771340e-01, 9.06064345e-02],
        [6.18386009e-01, 3.82461991e-01, 9.83230886e-01]],

       [[4.66762893e-01, 8.59940407e-01, 6.80307539e-01],
        [4.50499252e-01, 1.32649612e-02, 9.42201756e-01],
        [5.63288218e-01, 3.85416503e-01, 1.59662522e-02]],

       [[2.30893826e-01, 2.41025466e-01, 6.83263519e-01],
        [6.09996658e-01, 8.33194912e-01, 1.73364654e-01],
        [3.91060608e-01, 1.82236088e-01, 7.55361410e-01]],

       [[4.25155874e-01, 2.07941663e-01, 5.67700328e-01],
        [3.13132925e-02, 8.42284775e-01, 4.49754133e-01],
        [3.95150236e-01, 9.26658866e-01, 7.27271996e-01]]])
"""

matrix.shape
# (5, 3, 3)

matrix.T

"""
array([[[5.64115790e-02, 5.24774660e-01, 4.66762893e-01, 2.30893826e-01,
         4.25155874e-01],
        [7.78765841e-04, 9.73755519e-01, 4.50499252e-01, 6.09996658e-01,
         3.13132925e-02],
        [6.11653160e-01, 6.18386009e-01, 5.63288218e-01, 3.91060608e-01,
         3.95150236e-01]],

       [[7.21998772e-01, 3.99860972e-01, 8.59940407e-01, 2.41025466e-01,
         2.07941663e-01],
        [9.92211559e-01, 2.32771340e-01, 1.32649612e-02, 8.33194912e-01,
         8.42284775e-01],
        [7.06630522e-03, 3.82461991e-01, 3.85416503e-01, 1.82236088e-01,
         9.26658866e-01]],

       [[9.38552709e-01, 4.66656632e-02, 6.80307539e-01, 6.83263519e-01,
         5.67700328e-01],
        [6.17481510e-01, 9.06064345e-02, 9.42201756e-01, 1.73364654e-01,
         4.49754133e-01],
        [2.30624250e-02, 9.83230886e-01, 1.59662522e-02, 7.55361410e-01,
         7.27271996e-01]]])
"""

matrix.T.shape
# (3, 3, 5)
```

<br>

### Dot product practical example, nut butter sales

<br>

```python
np.random.seed(0)
sales_amounts = np.random.randint(20, size=(5, 3))
sales_amounts

"""
array([[12, 15,  0],
       [ 3,  3,  7],
       [ 9, 19, 18],
       [ 4,  6, 12],
       [ 1,  6,  7]])
"""

weekly_sales = pd.DataFrame(sales_amounts,
                            index=["Mon", "Tues", "Wed", "Thurs", "Fri"],
                            columns=["Almond butter", "Peanut butter", "Cashew butter"])
weekly_sales

"""
	    Almond butter	Peanut butter	Cashew butter
Mon	    12	            15	            0
Tues	3	            3	            7
Wed	    9	            19	            18
Thurs	4	            6	            12
Fri	    1	            6	            7
"""

prices = np.array([10, 8, 12])
prices
# array([10,  8, 12])

butter_prices = pd.DataFrame(prices.reshape(1, 3),
                             index=["Price"],
                             columns=["Almond butter", "Peanut butter", "Cashew butter"])
butter_prices.shape
# (1, 3)

butter_prices

"""
        Almond butter	Peanut butter	Cashew butter
Price	10	            8	            12
"""

weekly_sales.shape
# (5, 3)

# Find the total amount of sales for a whole day
total_sales = prices.dot(sales_amounts)
total_sales
# ValueError: shapes (3,) and (5,3) not aligned: 3 (dim 0) != 5 (dim 0)
# The shapes aren't aligned, we need the middle two numbers to be the same.

prices
# array([10,  8, 12])

sales_amounts.T.shape
# (3, 5)

# To make the middle numbers the same, we can transpose
total_sales = prices.dot(sales_amounts.T)
total_sales
# array([240, 138, 458, 232, 142])

butter_prices.shape, weekly_sales.shape
# ((1, 3), (5, 3))

daily_sales = butter_prices.dot(weekly_sales.T)
daily_sales

"""
	    Mon	    Tues	Wed	    Thurs	Fri
Price	240	    138	    458	    232	    142
"""

# Need to transpose again
weekly_sales["Total"] = daily_sales.T
weekly_sales

"""
        Almond butter	Peanut butter	Cashew butter	Total
Mon	    12	            15	            0	            240
Tues	3	            3	            7	            138
Wed	    9	            19	            18	            458
Thurs	4	            6	            12	            232
Fri	    1	            6	            7	            142
"""
```

<br>

### Comparison operators

```python
a1 > a2

"""
array([[[False,  True,  True],
        [False, False,  True],
        [False, False, False]],

       [[False, False, False],
        [False, False, False],
        [False, False, False]]])
"""

a1 >= a2

"""
array([[[ True,  True,  True],
        [False,  True,  True],
        [False, False, False]],

       [[False, False, False],
        [False, False, False],
        [False, False, False]]])
"""

a1 == a1

"""
array([[[ True],
        [ True],
        [ True]],

       [[ True],
        [ True],
        [ True]]])
"""
```

<br>

## Sorting arrays

<br>

- np.sort()
- np.argsort()
- np.argmax()
- np.argmin()

<br>

```python
# Random array
random_array = np.random.randint(10, size=(5, 3))
random_array

"""
array([[7, 8, 1],
       [5, 9, 8],
       [9, 4, 3],
       [0, 3, 5],
       [0, 2, 3]])
"""

np.sort(random_array)

"""
array([[1, 7, 8],
       [5, 8, 9],
       [3, 4, 9],
       [0, 3, 5],
       [0, 2, 3]])
"""

np.argsort(random_array)

"""
array([[2, 0, 1],
       [0, 2, 1],
       [2, 1, 0],
       [0, 1, 2],
       [0, 1, 2]])
"""

a1
# array([1, 2, 3])

# Return the indices that would sort an array
np.argsort(a1)
# array([0, 1, 2])

# No axis
np.argmin(a1)
# 0

# Down the vertical
np.argmax(random_array, axis=1)
# array([1, 1, 0, 2, 2])

# Across the horizontal
np.argmin(random_array, axis=0)
# array([3, 4, 0])
```

<br>

## Turning an image of a panda into numbers

<br>

![numpypanda](/assets/images/Numpy/numpypanda.png)

```python
from matplotlib.image import imread

panda = imread('../images/numpy-panda.png')
print(type(panda))
# <class 'numpy.ndarray'>

panda.shape
# (2330, 3500, 3)

panda

"""
array([[[0.05490196, 0.10588235, 0.06666667],
        [0.05490196, 0.10588235, 0.06666667],
        [0.05490196, 0.10588235, 0.06666667],
        ...,
        [0.16470589, 0.12941177, 0.09411765],
        [0.16470589, 0.12941177, 0.09411765],
        [0.16470589, 0.12941177, 0.09411765]],

       [[0.05490196, 0.10588235, 0.06666667],
        [0.05490196, 0.10588235, 0.06666667],
        [0.05490196, 0.10588235, 0.06666667],
        ...,
        [0.16470589, 0.12941177, 0.09411765],
        [0.16470589, 0.12941177, 0.09411765],
        [0.16470589, 0.12941177, 0.09411765]],

       [[0.05490196, 0.10588235, 0.06666667],
        [0.05490196, 0.10588235, 0.06666667],
        [0.05490196, 0.10588235, 0.06666667],
        ...,
        [0.16470589, 0.12941177, 0.09411765],
        [0.16470589, 0.12941177, 0.09411765],
        [0.16470589, 0.12941177, 0.09411765]],

       ...,

       [[0.13333334, 0.07450981, 0.05490196],
        [0.12156863, 0.0627451 , 0.04313726],
        [0.10980392, 0.05098039, 0.03137255],
        ...,
        [0.02745098, 0.02745098, 0.03529412],
        [0.02745098, 0.02745098, 0.03529412],
        [0.02745098, 0.02745098, 0.03529412]],

       [[0.13333334, 0.07450981, 0.05490196],
        [0.12156863, 0.0627451 , 0.04313726],
        [0.12156863, 0.0627451 , 0.04313726],
        ...,
        [0.02352941, 0.02352941, 0.03137255],
        [0.02352941, 0.02352941, 0.03137255],
        [0.02352941, 0.02352941, 0.03137255]],

       [[0.13333334, 0.07450981, 0.05490196],
        [0.12156863, 0.0627451 , 0.04313726],
        [0.12156863, 0.0627451 , 0.04313726],
        ...,
        [0.02352941, 0.02352941, 0.03137255],
        [0.02352941, 0.02352941, 0.03137255],
        [0.02352941, 0.02352941, 0.03137255]]], dtype=float32)
"""
```
