---
title: Matplotlib Tutorial
excerpt: "A Quick Introduction to Plotting and Data Visualization with Matplotlib and Python"
date: 2020-05-15
tags: ["python", "matplotlib", "ml"]
keywords: "plotting with matplotlib"
cover_image: ""
---

# Matplotlib Tutorial

<br>
<hr>
<br>

## Why Matplotlib?

<br>

- Built on Numpy arrays (and Python)
- Integrates directly with Pandas
- Can create basic or Advanced plots
- Simple to use interface

<br>

![matplotlib_workflow](/assets/images/Numpy/matplotlib_workflow.jpg)  
<br>

A simple matplotlib workflow example

```python
# 0. Import and get matplotlib ready
%matplotlib inline
import matplotlib.pyplot as plt

# 1. Prepare data
x = [1, 2, 3, 4]
y = [11, 52, 133, 244]

# 2. Setup plot
fig, ax = plt.subplots(figsize=(5,3))

# 3. Plot data
ax.plot(y, x)

# 4. Customize plot
ax.set(title="Sample Simple Plot", xlabel="x-axis", ylabel="y-axis");
# 5. Save & show
fig.savefig("../images/simple-plot.png")
```

![simple_example](/assets/images/Matplotlib/simple_example.jpg)
<br>

## Making the most common type of plots using NumPy arrays

<br>

Line plot ( also the default )

```python
# Create an array
x = np.linspace(0, 10, 100)
x[:10]

# The default plot is line
fig, ax = plt.subplots()
ax.plot(x, x**2);
```

![line_plot](/assets/images/Matplotlib/line_plot.jpg)
<br>

Scatter plot

```python
# Need to recreate our figure and axis instances when we want a new figure
fig, ax = plt.subplots()
ax.scatter(x, np.exp(x));
```

![scatter_plot](/assets/images/Matplotlib/scatter_plot.jpg)
<br>

Bar plot

```python
# You can make plots from a dictionary (Vertical)
nut_butter_prices = {"Almond butter": 10,
                     "Peanut butter": 8,
                     "Cashew butter": 12}
fig, ax = plt.subplots()
ax.bar(nut_butter_prices.keys(), nut_butter_prices.values())
ax.set(title="Dan's Nut Butter Store", ylabel="Price ($)");

# Horizontal
fig, ax = plt.subplots()
ax.barh(list(nut_butter_prices.keys()), list(nut_butter_prices.values()));
```

![bar_plot_v](/assets/images/Matplotlib/bar_plot_v.jpg)

![bar_plot_h](/assets/images/Matplotlib/bar_plot_h.jpg)
<br>

Histogram (hist)

```python
# Make some data from a normal distribution
x = np.random.randn(1000) # pulls data from a normal distribution

fig, ax = plt.subplots()
ax.hist(x);
```

![hist_plot](/assets/images/Matplotlib/hist_plot.jpg)
<br>

## Plotting with pandas using the OO method

<br>

```python
heart_disease = pd.read_csv("drive/heart-disease.csv")
heart_disease.head()
"""
    age	sex	cp	trestbps	chol	fbs	restecg	thalach	exang	oldpeak	slope	ca	thal	target
0	63	1	3	145	        233	    1	0	    150	    0	    2.3	    0	    0	1	    1
1	37	1	2	130	        250	    0	1	    187	    0	    3.5	    0	    0	2	    1
2	41	0	1	130	        204	    0	0	    172	    0	    1.4	    2	    0	2	    1
3	56	1	1	120	        236	    0	1	    178	    0	    0.8	    2	    0	2	    1
4	57	0	0	120	        354	    0	1	    163	    1	    0.6	    2	    0	2	    1
"""

# Perform data analysis on patients over 50
over_50 = heart_disease[heart_disease["age"] > 50]

# create scatter plot comparing age and chol.
fig, ax = plt.subplots(figsize=(10, 6))
over_50.plot(kind='scatter',
             x="age",
             y="chol",
             c='target',
             ax=ax);
ax.set_xlim([45, 100]);
```

![pandas_scatter_plot_age_v_chol](/assets/images/Matplotlib/pandas_scatter_plot_age_v_chol.jpg)
<br>

```python
# Make a bit more of a complicated plot

# Create the plot
fig, ax = plt.subplots(figsize=(10, 6))

# Plot the data
scatter = ax.scatter(over_50["age"],
                     over_50["chol"],
                     c=over_50["target"])

# Customize the plot
ax.set(title="Heart Disease and Cholesterol Levels",
       xlabel="Age",
       ylabel="Cholesterol");
ax.legend(*scatter.legend_elements(), title="Target");
```

![pandas_scatter_plot_age_v_chol](/assets/images/Matplotlib/pandas_scatter_plot_age_v_chol_2.jpg)
<br>

What if we wanted a horizontal line going across with the mean of heart_disease["chol"]?

```python
# Create the plot
fig, ax = plt.subplots(figsize=(10, 6))

# Plot the data
scatter = ax.scatter(over_50["age"],
                     over_50["chol"],
                     c=over_50["target"])

# Customize the plot
ax.set(title="Heart Disease and Cholesterol Levels",
       xlabel="Age",
       ylabel="Cholesterol");
ax.legend(*scatter.legend_elements(), title="Target")

# Add a meanline
ax.axhline(over_50["chol"].mean(),
           linestyle="--");
```

![pandas_scatter_plot_age_v_chol](/assets/images/Matplotlib/pandas_scatter_plot_age_v_chol_3.jpg)
<br>

## Saving plots

```python
# Check the supported filetypes
fig.canvas.get_supported_filetypes()
"""
{'eps': 'Encapsulated Postscript',
 'jpeg': 'Joint Photographic Experts Group',
 'jpg': 'Joint Photographic Experts Group',
 'pdf': 'Portable Document Format',
 'pgf': 'PGF code for LaTeX',
 'png': 'Portable Network Graphics',
 'ps': 'Postscript',
 'raw': 'Raw RGBA bitmap',
 'rgba': 'Raw RGBA bitmap',
 'svg': 'Scalable Vector Graphics',
 'svgz': 'Scalable Vector Graphics',
 'tif': 'Tagged Image File Format',
 'tiff': 'Tagged Image File Format'}
"""

# Save the file
fig.savefig("../images/heart-disease-analysis.png")
```
