##k-means-clustering
A machine learning algorithm that can find 'k' groups of similar data among a given dataset.

##ELI5
There are moles, groundhogs, and gopher holes in a large field.
You know these animals each tend to group their nests together with their own species, and they don't like to be too close to other species either.
There are 3 people each with a whistle that makes all nearby ground animals pop out of their holes briefly.
They scatter out into the field with the goal of finding where these groups of moles/groundhogs/gophers are.
Each person blows the whistle, and walk towards the nearest area where they see the most ground animals pop out.
They keep doing this and eventually they'll each find themselves in the middle of a mole/groundhog/gopher nest.

##How this is implemented
1. Plot data points from a set of data that you want to find similar groups in.
2. Plot 'k' number of additional points randomly on the graph. These will be you 'cluster centers'.
3. Repeat the following steps:
    - Assign each data point on the graph to the 'cluster center' closest to it.
    - Move the 'cluster center' to the average position of all the points that belong to it.
    - If any of the 'cluster centers' moved in the above step, repeat. Otherwise you are done.

##Things to watch out for
1. You'll need to know how many clusters are in your data because all this algorithm does is try to organize your data into 'k' number of clusters. (There are algorithms that can help identify k).
2. The 'cluster center' might get stuck in a local valley where it's not in the 'center' of a global group of data, but it won't move much because it is nicely surrounded by a local group of data points. This is called local optima.
    - This problem commonly occurs in algorithms that start with random seeds.
    - There are a few ways to address this problem of local optima:
        1. Introduce some mutation: If the center doesn't move after an iteration, give it a small nudge in a random direction. Not too big where it could reset progress but enough to kick it out of a local valley.
        2. Committee of Machines: Run the algorithm in parallel or multiple different times and choose the solution that returned most often.
