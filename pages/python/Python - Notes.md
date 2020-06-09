---
title: Python from the Beginning
excerpt: "All the Python basics"
date: 2019-12-29
tags: ["Python"]
keywords: "Python"
sidebar: auto
---

# Python from the Beginning

<br>
<hr>
<br>

- Everything in Python is considered an Object

<br>

## Data Types

```python
int
float
bool
str
list
tuple
set
dict
```

<br>

## Variables

```python
'''
This is a
multiline comment
or docstring (used to define a functions purpose)
can be single or double quotes
'''

"""
VARIABLE RULES:
  - Variable names are case sensitive
  - Must start with a letter or an underscore
  - Can have numbers but can not start with one
"""

# x = 1           # int
# y = 2.5         # float
# name = 'John'   # str
# is_cool = True  # bool

# Multiple assignment
x, y, name, is_cool = (1, 2.5, 'John', True)

# Basic math
a = x + y

# Casting
x = str(x)
y = int(y)
z = float(y)

print(type(z), z)
```

<br>

```python
# find type of object
print(type(5))          # <class 'int'>
print(type(5.4))        # <class 'float'>
print(type("strings"))  # <class 'str'>
print(type({}))         # <class 'dict'>
```

<br>

## Numbers

```python
print(5 - 5)  # 0
print(2 ** 3) # 8
print(5 * 5)  # 25
print(5 / 5 ) # 1.0
print(5 // 5) # 1

age = 25
print(age + 5)  # 30
print(age)      # 25
age += 5
print(age) # 30
```

<br>

## Strings

```python
print('hello')

# convert string to int
print(int('25')) # 25

# 2 ways to escape the '
print('Hes\'s a python developer')
print("Hes's a python developer")

# Get first char in string
greet = 'hello'
print(greet[0]) # h
# reverse
print(greet[-1]) # o

# Slice string
print(greet[0:3]) # hel

print(greet[0:-1]) # hell

print(greet[0::2]) # Hloo - Skips 2

cheeses = "brie chedder stilton"
print(cheeses[:])    # brie chedder stilton
print(cheeses[5:])   # chedder stilton
print(cheeses[:5])   # brie
print(cheeses[::-1]) # notlits reddehc eirb

# Concat 2 string
str2 = 'python'
print(greet + " " + str2) # hello python

print(greet * 5) # hellohellohellohellohello

# methods
print(greet.upper()) # HELLO

cheeses = "brie, chedder, stilton"
print(cheeses.split(',')) # ['brie', ' chedder', ' stilton']

# lenght of a string
print(len(greet)) # 5
```

<br>

## Lists

List are the same as arrays in other lanuages.

```python
cheeses = "brie chedder stilton"
print(cheeses.split(' '))

fib1 = [1,2,3,4,5,6,7,10,14]

# Select specific position in list
print(fib1[5])  # 6
print(fib1[-2]) # 10 second last item
print(fib1[2:8]) # [3, 4, 5, 6, 7, 10]

# Adding 2 lists
fib2 = [10,12,13,30,46]
print(fib1 + fib2) # [1, 2, 3, 4, 5, 6, 7, 10, 14, 10, 12, 13, 30, 46]

# change value
fib1[0] = 9

# copy list
amazon_cart = ['apples','pears','bananas']
new_cart = amazon_cart[:]
new_cart[0] = 'grapes'
print(amazon_cart)  # ['apples','pears','bananas']
print(new_cart)     # ['grapes','pears','bananas']

# insert
fib2 = [10,12,13,30,46]
fib2.insert(3, 100)
print(fib2)         # [10, 12, 13, 100, 30, 46]

# append value
fib1.append(89)
print(fib1)         # [9, 2, 3, 4, 5, 6, 7, 10, 14, 89]

# remove value
fib1.pop()
print(fib1)         # [9, 2, 3, 4, 5, 6, 7, 10, 14]

# using del function
fib1.append(89)
fib1.append(89)
print(fib1)
del(fib1[5])

# Clear
fib2.clear()
print(fib2)       # []

# Sorting
let = ['q','r','d','g','u','a','b','c','j']
let.sort()
print(let)          # ['a', 'b', 'c', 'd', 'g', 'j', 'q', 'r', 'u']
print(sorted(let))  # ['a', 'b', 'c', 'd', 'g', 'j', 'q', 'r', 'u']

# List in list
newList = [[1,2,3],[4,5,6]]
print(newList[0][1]) # 2

# List unpacking (Destructuring)
unpack = [1,2,3,4,5,6,7,8,9]
a,b,c, *other, d = unpack
print(a,b,c,other,d)    # 1 2 3 [4, 5, 6, 7, 8] 9
```

<br>

## Tuples

Tuples are like lists, but they can't be modified.  
Tuples have only 2 methods

```python
tup = (1,2,3,4,5,6,7,8,9)
print(tup[1:4])       # (2, 3, 4)
print(tup.count(4))   # 1
print(tup.index(3))   # 2
print(len(tup))       # 9
```

<br>

## Standard Input

```python
value = input('What\'s your name?  ')
age = input('What\'s your age?  ')
print(value, age)

# Calc the area of a circle
radius = input('Enter the radius of your circle (m): ')
area = 3.142 * int(radius)**2

print('The area of your circle is: ', area)
```

<br>

## String Formatting

```python
num1 = 10.3456
num2 = 20.5567

# Option 1
print('Num1 is: {0:.2f} and Num2: {1:.2f}'.format(num1,num2))

# Option 2
print(f'Num1 is: {num1:.2f} and num2: {num2:.2f}')
```

<br>

## IF Statements

Example 1

```python
age = 67

if age > 25 and age < 40:
    # code block
    print('You are still young.')
elif age > 40 and age < 65:
    print('You still have 25 years till retirement.')
else:
    print('You are oldish.')
```

<br>

Example 2

```python
meaty = input('Do you eat meat? (y/n)')

if meaty == 'y':
    print('here is the meaty menu')
else:
    print('here is the veggie menu')
```

<br>

## For Loops

<br>

Example 1

```python
ninjas = ['Jean', 'John', 'Shaun', 'Ken', 'Crystal']

for ninja in ninjas:
    print(ninja)

# Output
""" Jean
John
Shaun
Ken
Crystal """
```

<br>

Example 2

```python
ninjas = ['Jean', 'John', 'Shaun', 'Ken', 'Crystal']

for ninja in ninjas[1:3]:
    print(ninja)

# Output
""" John
Shaun """
```

<br>

Example 3

```python
ninjas = ['Jean', 'John', 'Shaun', 'Ken', 'Crystal']

for ninja in ninjas[1:3]:
    if ninja == 'Shaun':
        print(f'{ninja} - black belt')
    else:
        print(ninja)

# Output
""" John
Shaun - black belt """
```

<br>

## While Loops

```python
age = 25
num = 0

while num < age:
    if num % 2 == 0:
        print(num)
    if num > 10:
        break
    num += 1
```

<br>

## Ranges

```python
# range generates a list of numbers
for n in range(5):
    print(n)

# output
""" 0
1
2
3
4 """

# Add a start and end number
for n in range(3,10):
    print(n)

# output
""" 3
4
5
6
7
8
9 """

# with steps
for n in range(0,20,4):
    print(n)

# output
""" 0
4
8
12
16 """

burgers = ['beef', 'chicken', 'veg','supreme', 'double']

for n in range(len(burgers)):
    print(n, burgers[n])

# output
""" 0 beef
1 chicken
2 veg
3 supreme
4 double """

for n in range(len(burgers) -1 , -1, -1):
    print(n, burgers[n])

# output
""" 4 double
3 supreme
2 veg
1 chicken
0 beef """
```

<br>

## Functions

<br>

Example 1

```python
def greet(name='None', surname='None'):
    print(f'Hallo, {name} {surname}')

greet('jean', 'snyman') # Hallo, jean snyman

# default parameters
greet() # Hallo, None None
```

<br>

Example 2

```python
def area(radius):
    return 3.142 * radius * radius

def vol(area, length):
    print(area * length)

radius = int(input('Enter a radius: '))
length = int(input('enter a length: '))

vol(area(radius), length)

# Output
""" Enter a radius: 7
enter a length: 8
1231.664 """
```

<br>

## Variable Scope

<br>

```python
# Global scope variable
my_name = 'Jean'

def printName():
    # Overwriting the global variable in a function
    global my_name
    my_name = 'Ryan'
    # Local scope variable
    # my_name = 'John'
    print('The name inside the function is, ', my_name)


printName()

print('The name outside the function is, ', my_name)
```

<br>

## Dictionaries

<br>

A set of key value pairs similar to javascript object notation.
<br>

Example 1

```python
ninja_belts = {
    "crystal": "red",
    "Ryu": "black"
}

print(ninja_belts["crystal"])
print(ninja_belts["Ryu"])

# check if key is in dict.
if 'ryu' in ninja_belts:
    print(ninja_belts["Ryu"])


# alternative way to define a new dict.
person = dict(name="shaun", age="35")
```

<br>

Example 2

```python
def ninja_intro(dictionary):
    for key,val in dictionary.items():
        print(f'I am {key} and I am a {val} belt')

ninja_belts = {}

while True:
    ninja_name = input('enter a ninja name: ')
    ninja_belt = input('enter a ninja colour: ')
    ninja_belts[ninja_name] = ninja_belt

    another= input('add another? (y/n)')
    if another == 'y':
        continue
    else:
        break

ninja_intro(ninja_belts)
```

<br>

## Sorting and Sets

<br>

Example 1

```python
# sorting
nums = [1,4,6,3,8,9,2,3,4,7,4]
print(sorted(nums)) # [1, 2, 3, 3, 4, 4, 4, 6, 7, 8, 9]

names = ["Jean","Albert","Brian","Melanie","Adriaan","Wihan","Adriaan"]
print(sorted(names)) # ['Adriaan', 'Albert', 'Brian', 'Jean', 'Melanie', 'Wihan']

# Sets
# Sets don't allow duplicates

# In both cases duplicates are removed
print(set(nums))    # {1, 2, 3, 4, 6, 7, 8, 9}
print(set(names))   # {'Brian', 'Wihan', 'Melanie', 'Adriaan', 'Jean', 'Albert'}

# sorting a set
print(sorted(set(names)))

# Using set on a object
ninjas = {
    "crystal": "red",
    "Ryu": "black",
    "Brian": "black"
}

print(set(ninjas.values()))

```

<br>

## Classes

<br>

Example 1

```python
# Define a class
class Planet:

    # class level attributes
    shape = 'round'

    # constructor function- self is always required
    def __init__(self, name, radius, gravity, system):
        # instance attributes
        self.name = name
        self.radius = radius
        self.gravity = gravity
        self.system = system

    # instance methods
    def orbit(self):
        return f'{self.name} is orbiting the {self.system}'

    # class level mothods
    @classmethod
    def commons(cls):
        return f'All planets are {cls.shape} because of gravity'

    # static methods ONLY has access to the parameters passed into it.
    @staticmethod
    def spin(speed = '2000 miles per hour'):
        return f'The planet spins and spins at {speed}'


# create new instance of this class
hoth = Planet('Hoth', 20000, 5.5, 'Hoth System')

print(hoth.name);       # Hoth
print(hoth.radius);     # 200000
print(hoth.gravity);    # 5.5
print(hoth.system);     #Hoth System

print(hoth.orbit()) # Hoth is orbiting the Hoth System

# Calling the class level method
print(Planet.commons()) # All planets are round because of gravity

# Calling the  static method
print(Planet.spin())            # The planet spins and spins at 2000 miles per hour
print(Planet.spin('very fast')) # The planet spins and spins at very fast
```

<br>

## Modules and Packages

<br>

Example 1

```python
# importing packages
from package.planet import Planet
from package.clac import planet_mass, planet_vol

# create new instance of the Planet class
hoth = Planet('Hoth', 20000, 5.5, 'Hoth System')

hoth_mass = planet_mass(hoth.gravity, hoth.radius)
hoth_vol = planet_vol(hoth.radius)
```

<br>

## List Comprehension

<br>

Example 1

```python
# Without list comprehension
prizes = [5,10,50,100,1000]

dbl_prices = []

for prize in prizes:
    dbl_prices.append(prize * 2)

print(dbl_prices)


# List Comprehension method
dbl_prices = [ prize*2 for prize in prizes]

print(dbl_prices)
```

<br>

Example 2

```python
#squaring numbers
nums = [1,2,3,4,5,6,7,8,9]
squared_even_nums = []
for num in nums:
    if(num ** 2) % 2 == 0:
        squared_even_nums.append(num ** 2)

print(squared_even_nums)

# List Comprehension method
squared_even_nums = [num ** 2 for num in nums if (num ** 2) % 2 == 0]

print(squared_even_nums)
```

<br>

## Maps

<br>

```python
#map(function,data)
from random import shuffle

def jumble(word):
    anagram = list(word)
    shuffle(anagram)
    return ''.join(anagram)

words = ['beetroot', 'carrots', 'potatoes']
anagrams = []

# for loop way
for word in words:
    anagrams.append(jumble(word))

print(anagrams)

# map way
print(list(map(jumble, words)))

# List comprehenstion way
print([jumble(word) for word in words])
```

<br>

## Filter

<br>

```python
grades = ['A','B','C','D','F','A']

def remove_fails(grades):
    return grades !='F'

# filter way
print(list(filter(remove_fails, grades)));

# For loop way
filtered_grades = []
for grade in grades:
    if grade != 'F':
        filtered_grades.append(grade)
print(filtered_grades)

# List comprehension way
print([grade for grade in grades if grade != 'F'])
```

<br>

## Zip

```python
myList = [20,30,40]
yourList = [1,2,4]
theirList = [55,67,90]

print(list(zip(myList, yourList, theirList)))
# [(20, 1, 55), (30, 2, 67), (40, 4, 90)]
```

<br>

## Reduce

```python
from functools import reduce

myList = [20,30,40]

def accumulator(acc, item):
  return acc + item

print(reduce(accumulator, myList, 0))  # 90
```

<br>

## Lambdas

Inline anonymous functions

<br>

```python
nums = [1,2,3,4,5,6,7]

""" def square(n):
    return n * n """

print(list(map(lambda n: n * n, nums)))

from functools import reduce
myList = [20,30,45]

# lambda parm(s): action
print(reduce(lambda acc, item: acc + item , myList, 0))  # 95
```

<br>

## Decorators

<br>
Extends the functionality of a function without modifying the function.

```python
def cough_dec(func):
    def func_wrapper():
        # code before function
        print('*cough*')
        func()
        # code after function
        print('*cough*')
    return func_wrapper

@cough_dec
def question():
    print('Can you give me a discount on that?')


print(question())

# Output
""" *cough*
Can you give me a discount on that?
*cough* """
```

<br>

## Read files

<br>

Example 1

```python
ipsum_file = open('ipsum.txt')

for line in ipsum_file:
    print(line.rstrip())

# read file into list
ipsum_file.seek(0)
lines = ipsum_file.readlines()
print(lines)

# read from the 50th charater to the 100th character
ipsum_file.seek(50)
file_text = ipsum_file.read(100)
print(file_text)

# close file
ipsum_file.close()
```

<br>

Example 2 ( a better way)

```python
def sequence_filter(line):
    return '>' not in line

with open('dna_sequence.txt') as dna_file:
    lines = dna_file.readlines()
    print(list(filter(sequence_filter, lines)))
```

<br>

## Writing files

<br>

```python
with open('write.txt', 'w') as write_file:
    write_file.write('Hey there!')
    write_file.write('\nHey there again!')

# appending
with open('write.txt', 'a') as write_file:
     write_file.write('\nHey there again and again!!')

quotes = [
    '\nI can resist everything except temptation',
    '\nWe are all in the gutter, but some of us are looking at the stars',
    '\nAlways forgive your enemies - nothing annoys them so much'
]

# using a list
with open('write.txt', 'a') as write_file:
     write_file.writelines(quotes)
```

<br>

## Download Images

<br>

```python
import urllib.request

def dl_jpg(url, file_path, file_name):
    full_path = file_path + file_name + '.jpg'
    urllib.request.urlretrieve(url, full_path)

url = input('Enter image URL to download: ')
file_name = input('Enter file name to save as: ')

dl_jpg(url, 'images/', file_name)
```

<br>
<br>

[Python Cheat Sheat by Andrei Neagoie](https://github.com/aneagoie/ztm-python-cheat-sheet "Python Cheat Sheat by Andrei Neagoie")
