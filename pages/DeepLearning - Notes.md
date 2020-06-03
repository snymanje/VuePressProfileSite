---
title: Deep Learning Fundamentals
excerpt: "Deep Learning Fundamentals with Tensorflow"
date: 2020-06-02
tags: ["Deep Learning", "Tensorflow"]
keywords: "Deep Learning Fundamentals with tensorflow"
cover_image: ""
---

# Deep Learning Fundamentals

<br>
<hr>
<br>

## What Is Deep Learning?

Deep learning is a sub-field of machine learning that uses algorithms inspired by the structure and function of the brain's neural networks.  
The neural networks that we use in deep learning aren't actual biological neural networks.  
They simply share some characteristics with biological neural networks, and for this reason, we call them artificial neural networks (ANNs).

We often also use other terms to refer to ANNs. In the field of deep learning, the term artificial neural network (ANN) is used interchangeably with the following:

- net
- neural net
- model  
  <br>

## What Does Deep Mean In Deep Learning?

1. ANNs are built using what we call neurons.
2. Neurons in an ANN are organized into what we call layers.
3. Layers within an ANN (all but the input and output layers) are called hidden layers.
4. If an ANN has more than one hidden layer, the ANN is said to be a deep ANN.

![ANN](/assets/images/DeepLearning/ANN.jpg)

In summary, deep learning uses ANNs that have multiple hidden layers.

<br>

## What Is An Artificial Neural Network?

An artificial neural network is a computing system that is comprised of a collection of connected units called neurons that are organized into what we call layers.

The connected neural units form the so-called network. Each connection between neurons transmits a signal from one neuron to the other. The receiving neuron processes the signal and signals to downstream neurons connected to it within the network. Note that neurons are also commonly referred to as nodes.

Nodes are organized into what we call layers. At the highest level, there are three types of layers in every ANN:

- Input layer
- Hidden layers
- Output layer

<br>

## Visualizing An Artificial Neural Network

![ANN](/assets/images/DeepLearning/ANN2.jpg)
<br>

This ANN has three layers total. The layer on the left is the input layer. The layer on the right is the output layer, and the layer in the middle is the hidden layer. Remember that each layer is comprised of neurons or nodes. Here, the nodes are depicted with the circles, so let’s consider how many nodes are in each layer of this network.

Number of nodes in each layer:

1. Input layer (left): 2 nodes
2. Hidden layer (middle): 3 nodes
3. Output layer (right): 2 nodes  
   <br>

Since this network has two nodes in the input layer, this tells us that each input to this network must have two dimensions, like for example height and weight.

Since this network has two nodes in the output layer, this tells us that there are two possible outputs for every input that is passed forward (left to right) through the network. For example, overweight or underweight could be the two output classes. Note that the output classes are also known as the prediction classes.

## How do we implement this in Keras?

In Keras, we can build what is called a sequential model. Keras defines a sequential model as a sequential stack of linear layers.

```python
# import libraries
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense

# Set model equal to Sequential object with layers.
model = Sequential()
# We pass an array of Dense objects.
# Each of these objects called Dense are actually layers.
model.add(Dense(units=3, input_shape=(2,), activation='relu'))
model.add(Dense(units=2, activation='softmax'))
```

The word dense indicates that these layers are of type Dense.  
Dense is one particular type of layer, but there are many other types that we will see as we continue our deep learning journey.  
For now, just understand that dense is the most basic kind of layer in an ANN and that each output of a dense layer is computed using every input to the layer.

Looking at the arrows in our image (in the above section) coming from the hidden layer to the output layer, we can see that each node in the hidden layer is connected to all nodes in the output layer. This is how we know that the output layer in the image is a dense layer. This same logic applies to the hidden layer.

The first parameter passed to the Dense layer constructor in each layer tells us how many neurons it should have.

The input shape parameter input_shape=(2,) tells us how many neurons our input layer has, so in our case, we have two.

Lastly, we have a parameter for a so-called activation function.

1. activation='relu'
2. activation='softmax'  
   <br>

For now, just know that an activation function is a non-linear function that typically follows a dense layer.

## Layers Explained

There are different types of layers. Some examples include:

- Dense (or fully connected) layers
- Convolutional layers
- Pooling layers
- Recurrent layers
- Normalization layers

Different layers perform different transformations on their inputs, and some layers are better suited for some tasks than others.

For example, a convolutional layer is usually used in models that are doing work with image data. Recurrent layers are used in models that are doing work with time series data, and fully connected layers, as the name suggests, fully connects each input to each output within its layer.

## Example Artificial Neural Network

Let’s consider the following example ANN:  
![ANN](/assets/images/DeepLearning/ANN.jpg)

We can see that the first layer, the input layer, consists of eight nodes. Each of the eight nodes in this layer represents an individual feature from a given sample in our dataset.

This tells us that a single sample from our dataset consists of eight dimensions. When we choose a sample from our dataset and pass this sample to the model, each of the eight values contained in the sample will be provided to a corresponding node in the input layer.

We can see that each of the eight input nodes are connected to every node in the next layer.

Each connection between the first and second layers transfers the output from the previous node to the input of the receiving node (left to right). The two layers in the middle that have six nodes each are hidden layers simply because they are positioned between the input and output layers.

## Layer Weights

Each connection between two nodes has an associated weight, which is just a number.

Each weight represents the strength of the connection between the two nodes. When the network receives an input at a given node in the input layer, this input is passed to the next node via a connection, and the input will be multiplied by the weight assigned to that connection.

For each node in the second layer, a weighted sum is then computed with each of the incoming connections. This sum is then passed to an activation function, which performs some type of transformation on the given sum. For example, an activation function may transform the sum to be a number between zero and one. The actual transformation will vary depending on which activation function is used. More on activation functions later.

```python
node output = activation(weighted sum of inputs)**
```

<br>

## Forward Pass Through A Neural Network

Once we obtain the output for a given node, the obtained output is the value that is passed as input to the nodes in the next layer.

This process continues until the output layer is reached. The number of nodes in the output layer depends on the number of possible output or prediction classes we have. In our example, we have four possible prediction classes.

Suppose our model was tasked with classifying four types of animals. Each node in the output layer would represent one of four possibilities. For example, we could have cat, dog, llama or lizard. The categories or classes depend on how many classes are in our dataset.

For a given sample from the dataset, the entire process from input layer to output layer is called a forward pass through the network.

## Finding The Optimal Weights

As the model learns, the weights at all connections are updated and optimized so that the input data point maps to the correct output prediction class. More on this optimization process as we go deeper into deep learning.

## Defining The Neural Network In Code With Keras

```python
model = Sequential()
model.add(Dense(units=6, input_shape=(8,), activation='relu'))
model.add(Dense(units=6, activation='relu'))
model.add(Dense(units=4, activation='softmax'))
```

<br>

Notice how the first Dense object specified in the array is not the input layer. The first Dense object is the first hidden layer. The input layer is specified as a parameter to the first Dense object’s constructor.

Our input shape is eight. This is why our input shape is specified as input_shape=(8,). Our first hidden layer has six nodes as does our second hidden layer, and our output layer has four nodes.

For now, just note that we are using an activation function called relu activation='relu' for both of our hidden layers and an activation function called softmax activation='softmax' for our output layer. We’ll cover these functions in more detail in our next post on activation functions.

## Activation Functions

```python
In an artificial neural network, an activation function is a function that maps a node's inputs to its corresponding output.
```

We take the weighted sum of each incoming connection for each node in the layer, and pass that weighted sum to an activation function.  
The activation function does some type of operation to transform the sum to a number that is often times between some lower limit and some upper limit. This transformation is often a non-linear transformation.

## What Do Activation Functions Do?

Activation Functions are non-linear functions that allows our neural networks to compute arbitrarily complex functions.
Let's look at to activations functions Sigmoid and Relu

## Sigmoid Activation Function

Sigmoid takes in an input and does the following:

- For most negative inputs, sigmoid will transform the input to a number very close to 0.
- For most positive inputs, sigmoid will transform the input into a number very close to 1.
- For inputs relatively close to 0, sigmoid will transform the input into some number between 0 and 1.

<br>

With the Sigmoid activation function in an artificial neural network, we have seen that the neuron can be between 0 and 1, and the closer to 1, the more activated that neuron is while the closer to 0 the less activated that neuron is.

<br>

## Relu Activation Function

Now, it’s not always the case that our activation function is going to do a transformation on an input to be between 0 and 1.

In fact, one of the most widely used activation functions today called ReLU doesn’t do this. ReLU, which is short for rectified linear unit, transforms the input to the maximum of either 0 or the input itself.

So if the input is less than or equal to 0, then relu will output 0. If the input is greater than 0, relu will then just output the given input.

```javascript
// pseudocode
function relu(x) {
  if (x <= 0) {
    return 0;
  } else {
    return x;
  }
}
```

The idea here is, the more positive the neuron is, the more activated it is.  
Now, we’ve only talked about two activation functions here, sigmoid and relu, but there are other types of activation functions that do different types of transformations to their inputs.

## Training An Artificial Neural Network

When we train a model, we’re basically trying to solve an optimization problem.  
We’re trying to optimize the weights within the model. Our task is to find the weights that most accurately map our input data to the correct output class. This mapping is what the network must learn.

Each connection between nodes has an arbitrary weight assigned to it. During training, these weights are iteratively updated and moved towards their optimal values.

## Optimization Algorithm

The weights are optimized using what we call an optimization algorithm. The optimization process depends on the chosen optimization algorithm.  
We also use the term optimizer to refer to the chosen algorithm. The most widely known optimizer is called stochastic gradient descent, or more simply, SGD.

The objective of SGD is to minimize some given function that we call a loss function. So, SGD updates the model's weights in such a way as to make this loss function as close to its minimum value as possible.

## Loss Function

One common loss function is mean squared error (MSE), but there are several loss functions that we could use in its place. As deep learning practitioners, it's our job to decide which loss function to use. For now, let's just think of general loss functions, and later we'll look at specific loss functions in more detail.

Alright, but what is the actual loss we’re talking about? Well, during training, we supply our model with data and the corresponding labels to that data.

For example, suppose we have a model that we want to train to classify whether images are either images of cats or images of dogs. We will supply our model with images of cats and dogs along with the labels for these images that state whether each image is of a cat or of a dog.

Suppose we give one image of a cat to our model. Once the forward pass is complete and the cat image data has flowed through the network, the model is going to provide an output at the end. This will consist of what the model thinks the image is, either a cat or a dog.

In a literal sense, the output will consist of probabilities for cat or dog. For example, it may assign a 75% probability to the image being a cat, and a 25% probability to it being a dog. In this case, the model is assigning a higher likelihood to the image being of a cat than of a dog.

75% chance it's a cat
25% chance it's a dog
If we stop and think about it for a moment, this is very similar to how humans make decisions. Everything is a prediction!

The loss is the error or difference between what the network is predicting for the image versus the true label of the image, and SGD will to try to minimize this error to make our model as accurate as possible in its predictions.

After passing all of our data through our model, we’re going to continue passing the same data over and over again. This process of repeatedly sending the same data through the network is considered training. During this training process is when the model will actually learn. So, through this process that’s occurring with SGD iteratively, the model is able to learn from the data.

## How A Neural Network Learns

This pass through the network from input to output is called a forward pass, and the resulting output depends on the weights at each connection inside the network.

Once all of the data points in our dataset have been passed through the network, we say that an epoch is complete.  
An epoch refers to a single pass of the entire dataset to the network during training.

## What Does It Mean To Learn?

When the model is initialized, the network weights are set to arbitrary values. We have also seen that, at the end of the network, the model will provide the output for a given input.
Once the output is obtained, the loss (or the error) can be computed for that specific output by looking at what the model predicted versus the true label. The loss computation depends on the chosen loss function.

## Gradient Of The Loss Function

After the loss is calculated, the gradient of this loss function is computed with respect to each of the weights within the network. Note, gradient is just a word for the derivative of a function of several variables.

At this point, we’ve calculated the loss of a single output, and we calculate the gradient of that loss with respect to our single chosen weight. This calculation is done using a technique called backpropagation, discussed later.

Once we have the value for the gradient of the loss function, we can use this value to update the model’s weight. The gradient tells us which direction will move the loss towards the minimum, and our task is to move in a direction that lowers the loss and steps closer to this minimum value.

## Learning Rate

We then multiply the gradient value by something called a learning rate. A learning rate is a small number usually ranging between 0.01 and 0.0001, but the actual value can vary.

```python
The learning rate tells us how large of a step we should take in the direction of the minimum.
```

<br>

## Updating The Weights

Alright, so we multiply the gradient with the learning rate, and we subtract this product from the weight, which will give us the new updated value for this weight.

```python
new weight = old weight - (learning rate * gradient)
```

In this discussion, we just focused on one single weight to explain the concept, but this same process is going to happen with each of the weights in the model each time data passes through it.

The only difference is that when the gradient of the loss function is computed, the value for the gradient is going to be different for each weight because the gradient is being calculated with respect to each weight.

So now imagine all these weights being iteratively updated with each epoch. The weights are going to be incrementally getting closer and closer to their optimized values while SGD works to minimize the loss function.

## The Model Is Learning

This updating of the weights is essentially what we mean when we say that the model is learning. It’s learning what values to assign to each weight based on how those incremental changes are affecting the loss function. As the weights change, the network is getting smarter in terms of accurately mapping inputs to the correct output.

## Training In Code With Keras

```python
# import libraries
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense

# Next, we define our model:
model = Sequential()
model.add(Dense(units=16, input_shape=(1,), activation='relu'))
model.add(Dense(units=32, activation='relu'))
model.add(Dense(units=2, activation='sigmoid'))

# Before we can train our model, we must compile it like so:
model.compile(
    optimizer=Adam(learning_rate=0.0001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)
```

To the compile() function, we are passing the optimizer, the loss function, and the metrics that we would like to see. Notice that the optimizer we have specified is called Adam. Adam is just a variant of SGD. Inside the Adam constructor is where we specify the learning rate, and in this case Adam(learning_rate=.0001), we have chosen 0.0001.

Finally, we fit our model to the data. Fitting the model to the data means to train the model on the data. We do this with the following code:

```python
model.fit(
    x=scaled_train_samples,
    y=train_labels,
    batch_size=10,
    epochs=20,
    shuffle=True,
    verbose=2
)
```

**scaled_train_samples** is a numpy array consisting of the training samples.

**train_labels** is a numpy array consisting of the corresponding labels for the training samples.

**batch_size=10** specifies how many training samples should be sent to the model at once.

**epochs=20** means that the complete training set (all of the samples) will be passed to the model a total of 20 times.

**shuffle=True** indicates that the data should first be shuffled before being passed to the model.

**verbose=2** indicates how much logging we will see as the model trains.

Running this code gives us the following output:

```python
Epoch 1/20 0s - loss: 0.6400 - acc: 0.5576
Epoch 2/20 0s - loss: 0.6061 - acc: 0.6310
Epoch 3/20 0s - loss: 0.5748 - acc: 0.7010
Epoch 4/20 0s - loss: 0.5401 - acc: 0.7633
Epoch 5/20 0s - loss: 0.5050 - acc: 0.7990
Epoch 6/20 0s - loss: 0.4702 - acc: 0.8300
Epoch 7/20 0s - loss: 0.4366 - acc: 0.8495
Epoch 8/20 0s - loss: 0.4066 - acc: 0.8767
Epoch 9/20 0s - loss: 0.3808 - acc: 0.8814
Epoch 10/20 0s - loss: 0.3596 - acc: 0.8962
Epoch 11/20 0s - loss: 0.3420 - acc: 0.9043
Epoch 12/20 0s - loss: 0.3282 - acc: 0.9090
Epoch 13/20 0s - loss: 0.3170 - acc: 0.9129
Epoch 14/20 0s - loss: 0.3081 - acc: 0.9210
Epoch 15/20 0s - loss: 0.3014 - acc: 0.9190
Epoch 16/20 0s - loss: 0.2959 - acc: 0.9205
Epoch 17/20 0s - loss: 0.2916 - acc: 0.9238
Epoch 18/20 0s - loss: 0.2879 - acc: 0.9267
Epoch 19/20 0s - loss: 0.2848 - acc: 0.9252
Epoch 20/20 0s - loss: 0.2824 - acc: 0.9286
```

The output gives us the following values for each epoch:

1. Epoch number
2. Duration in seconds
3. Loss
4. Accuracy

What you will notice is that the loss is going down and the accuracy is going up as the epochs progress.

This is the general method for training models in Keras.

## Loss Functions In Neural Networks

The loss function is what SGD is attempting to minimize by iteratively updating the weights in the network.

At the end of each epoch during the training process, the loss will be calculated using the network’s output predictions and the true labels for the respective input.

Suppose our model is classifying images of cats and dogs, and assume that the label for cat is 0 and the label for dog is 1.

- cat: 0
- dog: 1
  Now suppose we pass an image of a cat to the model, and the provided output is 0.25. In this case, the difference between the model’s prediction and the true label is 0.25 - 0.00 = 0.25. This difference is also called the error.

```python
error = 0.25 - 0.00 = 0.25
```

This process is performed for every output. For each epoch, the error is accumulated across all the individual outputs.

If we passed our entire training set to the model at once (batch_size=1), then the process we just went over for calculating the loss will occur at the end of each epoch during training.

If we split our training set into batches, and passed batches one at a time to our model, then the loss would be calculated on each batch.

Some of the loss functions in Keras\Tensorflow is:

- mean_squared_error
- mean_absolute_error
- mean_absolute_percentage_error
- mean_squared_logarithmic_error
- squared_hinge
- hinge
- categorical_hinge
- logcosh
- categorical_crossentropy
- sparse_categorical_crossentropy
- binary_crossentropy
- kullback_leibler_divergence
- poisson
- cosine_proximity

<br>

## The Learning Rate

Recall that we start the training process with arbitrarily set weights, and then we incrementally update these weights as we move closer and closer to the minimized loss.

Now, the size of these steps we’re taking to reach our minimized loss is going to depend on the learning rate. Conceptually, we can think of the learning rate of our model as the step size.

We know that during training, after the loss is calculated for our inputs, the gradient of that loss is then calculated with respect to each of the weights in our model.

Once we have the value of these gradients, this is where the idea of our learning rate comes in. The gradients will then get multiplied by the learning rate.

```python
gradients * learning rate
```

This learning rate is a small number usually ranging between 0.01 and 0.0001, but the actual value can vary, and any value we get for the gradient is going to become pretty small once we multiply it by the learning rate.

Alright, so we get the value of this product for each gradient multiplied by the learning rate, and we then take each of these values and update the respective weights by subtracting this value from them.

```python
new weight = old weight - (learning rate * gradient)
```

We ditch the previous weights that were set on each connection and update them with these new values.

A typical guideline is to set it somewhere between 0.01 and 0.0001.

When setting the learning rate to a number on the higher side of this range, we risk the possibility of overshooting. This occurs when we take a step that’s too large in the direction of the minimized loss function and shoot past this minimum and miss it.

To avoid this, we can set the learning rate to a number on the lower side of this range. With this option, since our steps will be really small, it will take us a lot longer to reach the point of minimized loss.

## Learning Rates In Code

```python
# Now to our optimizer, we can optionally pass our learning rate by specifying the lr parameter.
# We can see that here we’re specifying 0.0001 as the learning rate.
model.compile(
    optimizer=Adam(learning_rate=0.0001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)
```

<br>

## Datasets For Deep Learning

For training and testing purposes for our model, we should have our data broken down into three distinct datasets. These datasets will consist of the following:

- Training set
- Validation set
- Test set

### Training

The training set is what it sounds like. It’s the set of data used to train the model. During each epoch, our model will be trained over and over again on this same data in our training set, and it will continue to learn about the features of this data.

### Validation

The validation set is a set of data, separate from the training set, that is used to validate our model during training. This validation process helps give information that may assist us with adjusting our hyperparameters.

During training, the model will be classifying each input from the validation set as well. It will be doing this classification based only on what it’s learned about the data it’s being trained on in the training set. The weights will not be updated in the model based on the loss calculated from our validation data.

Remember, the data in the validation set is separate from the data in the training set. So when the model is validating on this data, this data does not consist of samples that the model already is familiar with from training.

```python
The validation set allows us to see how well the model is generalizing during training.
```

### Testing

The test set is a set of data that is used to test the model after the model has already been trained. The test set is separate from both the training set and validation set.

After our model has been trained and validated using our training and validation sets, we will then use our model to predict the output of the unlabeled data in the test set.

## Predicting

we discussed what it means to train a neural network. After this training has completed, if we’re happy with the metrics that the model gave us for our training and validation data, then the next step would be to have our model predict on the data in our test set.

For predicting, essentially what we’re doing is passing our unlabeled test data to the model and having the model predict on what it thinks about each sample in our test data.

```python
Predictions are based on what the model learned during training.
```

<br>

## Predicting in Keras

```python
predictions = model.predict(
    x=scaled_test_samples,
    batch_size=10,
    verbose=0
)
```

The first item we have here is a variable we’ve called predictions. We’re assuming that we already have our model built and trained. Our model in this example is the object called model. We’re setting predictions equal to model.predict().  
We set our batch_size here arbitrarily to 10. We set the verbosity, which is how much we want to see printed to the screen when we run these predictions, to 0 here to show nothing.

Ok, so we ran our predictions. Now let’s look at our output.

```python
for p in predictions:
    print(p)

[ 0.7410683  0.2589317]
[ 0.14958295  0.85041702]
...
[ 0.87152088  0.12847912]
[ 0.04943148  0.95056852]
```

<br>

## Overfitting

Overfitting occurs when our model becomes really good at being able to classify or predict on data that was included in the training set, but is not as good at classifying data that it wasn’t trained on. So essentially, the model has overfit the data in the training set.

If the validation metrics are considerably worse than the training metrics, then that is indication that our model is overfitting.

The concept of overfitting boils down to the fact that the model is unable to generalize well. It has learned the features of the training set extremely well, but if we give the model any data that slightly deviates from the exact data used during training, it’s unable to generalize and accurately predict the output.

### Reducing Overfitting

- Add more data
- Data Augmentation ( rotating images )
- Reduce the complexity of the model
- Use Dropout

### Underfitting

Underfitting is on the opposite end of the spectrum. A model is said to be underfitting when it’s not even able to classify the data it was trained on, let alone data it hasn’t seen before.

We can tell that a model is underfitting when the metrics given for the training data are poor, meaning that the training accuracy of the model is low and/or the training loss is high.

### Reducing Underfitting

- Increase the complexity of the Model
- Add more features
- Reduce dropout

### Supervised vs Unsupervised vs Semi-Supervised Learning

- In Supervised learning labels are used to supervise or guide the learning process.
- Unsupervised learning occurs with unlabeled data. ( Using Clustering Algorithms like Autoencoders)
- Semi-supervised learning uses a combination of supervised and unsupervised learning techniques, and that’s because, in a scenario where we’d make use of semi-supervised learning, we would have a combination of both labeled and unlabeled data.

## Data Augmentation

Data augmentation occurs when we create new data based on modifications of our existing data. Essentially, we’re creating new, augmented data by making reasonable modifications to data in our training set.  
For example, we could augment image data by flipping the images, either horizontally or vertically. We could rotate the images, zoom in or out, crop, or even vary the color of the images.

Data Augmentation is generally used to create more data and reduce overfitting.
