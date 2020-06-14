---
title: Seaborn Tutorial
excerpt: "A Quick Introduction to Plotting and Data Visualization with Seaborn and Python"
date: 2020-05-16
tags: ["Machine Learning", "seaborn"]
keywords: "plotting with seaborn"
sidebar: auto
---

# Seaborn Tutorial

<br>
<hr>
<br>

## What is Seaborn?

<br>
Seaborn is a Python data visualization library based on matplotlib.  
It provides a high-level interface for drawing attractive and informative statistical graphics.

<br>
<br>

## Import Seaborn and Dataset

```python
import seaborn as sns
%matplotlib inline
import matplotlib.pyplot as plt # required to change the plot styles

plt.style.use('ggplot')

# import build-in seaborn dataset
tips = sns.load_dataset('tips')
tips.head()

"""
	total_bill	tip	    sex	    smoker	day	time	size
0	16.99	    1.01	Female	No	    Sun	Dinner	2
1	10.34	    1.66	Male	No	    Sun	Dinner	3
2	21.01	    3.50	Male	No	    Sun	Dinner	3
3	23.68	    3.31	Male	No	    Sun	Dinner	2
4	24.59	    3.61	Female	No	    Sun	Dinner	4
"""
```

<br>

## Distribution Plots

```python
sns.distplot(tips["total_bill"])
```

![distplot](/assets/images/Seaborn/distplot.jpg)
<br>

```python
# jointplot() allows you to basically match up two distplots for bivariate data.
# With your choice of what kind parameter to compare with:
# "scatter”, “reg”, “resid”, “kde”, “hex”
sns.jointplot(x='total_bill', y='tip', data=tips)
```

![jointplot](/assets/images/Seaborn/jointplot.jpg)
<br>

```python
# pairplot will plot pairwise relationships across an entire dataframe
# (for the numerical columns) and supports a color hue argument (for categorical columns).
sns.pairplot(tips, hue='sex')
```

![pairplot](/assets/images/Seaborn/pairplot.jpg)
<br>

```python
# Rug and kde on one plot
sns.kdeplot(tips['tip'])
sns.rugplot(tips['tip'])
```

![rug_kde](/assets/images/Seaborn/rug_kde.jpg)
<br>

## Categorical Plots

<br>

```python
# barplot is a general plot that allows you to aggregate the
# categorical data based off some function, by default the mean:
sns.barplot(x='sex',y='total_bill',data=tips)
```

![barplot](/assets/images/Seaborn/barplot.jpg)
<br>

```python
# countplot
# This is essentially the same as barplot except the estimator
# is explicitly counting the number of occurrences.
# Which is why we only pass the x value:
sns.countplot(x='sex',data=tips)
```

![countplot](/assets/images/Seaborn/countplot.jpg)
<br>

### boxplot and violinplot

<br>
boxplots and violinplots are used to shown the distribution of categorical data. A box plot (or box-and-whisker plot) shows the distribution of quantitative data in a way that facilitates comparisons between variables or across levels of a categorical variable. The box shows the quartiles of the dataset while the whiskers extend to show the rest of the distribution, except for points that are determined to be “outliers” using a method that is a function of the inter-quartile range.

```python
sns.boxplot(x="day", y="total_bill", data=tips,palette='rainbow')
```

![boxplot](/assets/images/Seaborn/boxplot.jpg)
<br>

```python
sns.boxplot(x="day", y="total_bill", hue="smoker",data=tips, palette="coolwarm")
```

![boxplot2](/assets/images/Seaborn/boxplot2.jpg)
<br>

```python
sns.violinplot(x="day", y="total_bill", data=tips,palette='rainbow')
```

![violinplot](/assets/images/Seaborn/violinplot1.jpg)
<br>

```python
sns.violinplot(x="day", y="total_bill", data=tips,hue='sex',palette='Set1')
```

![violinplot](/assets/images/Seaborn/violinplot2.jpg)
<br>

### stripplot and swarmplot

<br>

The stripplot will draw a scatterplot where one variable is categorical. A strip plot can be drawn on its own, but it is also a good complement to a box or violin plot in cases where you want to show all observations along with some representation of the underlying distribution.

The swarmplot is similar to stripplot(), but the points are adjusted (only along the categorical axis) so that they don’t overlap. This gives a better representation of the distribution of values, although it does not scale as well to large numbers of observations (both in terms of the ability to show all the points and in terms of the computation needed to arrange them).

```python
sns.stripplot(x="day", y="total_bill", data=tips)
```

![stripplot1](/assets/images/Seaborn/stripplot1.jpg)
<br>

```python
sns.stripplot(x="day", y="total_bill", data=tips,jitter=True,hue='sex',palette='Set1',split=True)
```

![stripplot2](/assets/images/Seaborn/stripplot2.jpg)
<br>

```python
sns.swarmplot(x="day", y="total_bill", data=tips)
```

![swarmplot](/assets/images/Seaborn/swarmplot.jpg)
<br>

### Combining Categorical Plots

```python
sns.violinplot(x='day', y='total_bill', data=tips)
sns.swarmplot(x='day', y='total_bill', data=tips, color='black')
```

![combinedplots](/assets/images/Seaborn/combinedplots.jpg)
<br>

### Factorplot

<br>

factorplot is the most general form of a categorical plot. It can take in a kind parameter to adjust the plot type:

```python
sns.factorplot(x='sex',y='total_bill',data=tips,kind='bar')
```

![factorplot](/assets/images/Seaborn/factorplot.jpg)
<br>

## Matric Plots

Matrix plots allow you to plot data as color-encoded matrices and can also be used to indicate clusters within the data.

```python
import seaborn as sns
%matplotlib inline

# Import the build-in flights dataset
flights = sns.load_dataset('flights')
flights = sns.load_dataset('flights')
flights.head()

"""
    year	month	    passengers
0	1949	January	    112
1	1949	February	118
2	1949	March	    132
3	1949	April	    129
4	1949	May	        121
"""
```

<br>

### Heatmap

<br>

In order for a heatmap to work properly, your data should already be in a matrix form, the sns.heatmap function basically just colors it in for you.

```python
flights.pivot_table(values='passengers',index='month',columns='year')
```

![pivittable](/assets/images/Seaborn/pivittable.jpg)
<br>

```python
pvflights = flights.pivot_table(values='passengers',index='month',columns='year')
sns.heatmap(pvflights)
```

![heatmap](/assets/images/Seaborn/heatmap1.jpg)
<br>

```python
sns.heatmap(pvflights,cmap='magma',linecolor='white',linewidths=1)
```

![heatmap](/assets/images/Seaborn/heatmap2.jpg)
<br>

### Clustermap

<br>

The clustermap uses hierarchal clustering to produce a clustered version of the heatmap. For example:

```python
sns.clustermap(pvflights)
```

![clustermap](/assets/images/Seaborn/clustermap.jpg)
<br>
