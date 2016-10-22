##k-nearest-neighbor
A machine learning algorithm that can classify unknown data points by looking at the 'k' number of nearest neighbors.


##ELI5
There is a field where 3 kinds of plants can grow.
The top side of the field gets a lot of sun and can grow avocados.
Towards the left doesn't get a lot of sun but it's good for herbs.
Towards the right it gets a lot of water so it's great for melons.
- - - - - - - - - - - 
|                   |
|      avocados     |
|-------------------|
|         |         |
|  herbs  |  melon  |
|         |         |
|         |         |
|-------------------|

A sprout grows in this field, but you are not quite sure what it is.
But you can make a pretty good guess just based on where it is in the field because if you know most of the plants closest to it are melons, the unknown sprout is probably a melon plant.


##How this is implemented
1. Classified/Known data points are graphed based on a numeric representation of their values/properties. This serves as the training data used to identify unknown points.
    - These values/properties may need to be normalized so they are not under or over represented by converting them to a value between 0 - 1
    - Although sometimes you may purposefully want to weigh one property more than another. There are algorithms to help identify ideal feature weights.
2. Unknown nodes are plotted on this graph and their distances to known nodes are measured.
3. Assume the classification of the unknown node based on what the 'k' (2, 5, 1000.. any number of) nearest neighbor's are.


##Things to watch out for
1. k-nearest-neighbor works best when the initial training data is nicely grouped. This algorithm doesn't work well if the initial data is all over the place.
2. Without optimization there will be performance issues calculating distances if you have tens of thousands of data points. One way to optimize would be to filter nodes outside of a certain distance or based on some property range.
