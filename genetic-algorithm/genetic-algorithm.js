var Chromosome = function(code){
    if(code){
        this.code = code;
    }
    this.cost = 9999;
}

Chromosome.prototype.code = '';

Chromosome.prototype.generateRandomChromosome = function(length){
    while(length--){
        this.code += String.fromCharCode(Math.floor(Math.random()*255));
    }
}

Chromosome.prototype.mate = function(chromosome){
    var pivot = Math.round(this.code.length / 2) - 1;
    var child1 = this.code.substr(0, pivot) + chromosome.code.substr(pivot, chromosome.code.length);
    var child2 = chromosome.code.substr(0, pivot) + this.code.substr(pivot, this.code.length);

    return [new Chromosome(child1), new Chromosome(child2)];

}
Chromosome.prototype.mutate = function(chance){
    if(Math.random() > chance){
        return;
    }
    var index = Math.floor(Math.random() * this.code.length);
    var mutateBy = Math.random() <= 0.5 ? -1 : 1;
    var mutatedChar = String.fromCharCode(this.code.charCodeAt(index) + mutateBy)

    var mutatedString = '';
    for (i = 0; i < this.code.length; i++) {
        if (i == index) mutatedString += mutatedChar;
        else mutatedString += this.code[i];
    }
    // var mutatedString = this.code.substr(0, index) + mutatedChar + this.code.substr(index+1, this.code.length);
    // console.log(mutatedString.length)

    this.code = mutatedString;

}
Chromosome.prototype.calculateCost = function(compareTo){
    var total = 0;
    for(var i = 0; i < this.code.length; i++){
        total+= (this.code.charCodeAt(i) - compareTo.charCodeAt(i)) * (this.code.charCodeAt(i) - compareTo.charCodeAt(i));
    }
    this.cost = total;
}

var Population = function(goal, size){
    this.members = [];
    this.goal = goal;
    this.generationCount = 0;
    while(size--){
        var chromosome = new Chromosome();
        chromosome.generateRandomChromosome(this.goal.length)
        this.members.push(chromosome);
    }
}

Population.prototype.sort = function() {
    this.members.sort(function(a, b) {
        return a.cost - b.cost;
    });
}

Population.prototype.display = function(n){
    console.log('Generation:', this.generationCount);
    while(n--){
        console.log(n, this.members[n]);
    }
}

Population.prototype.generation = function(){
    for(var i = 0; i < this.members.length; i++){
        this.members[i].calculateCost(this.goal);
    }
    this.sort();
    //Mate the first two
    var children = this.members[0].mate(this.members[1]);
    this.members.splice(this.members.length - 2, 2, children[0],children[1]);

    for(var i = 0; i < this.members.length; i++){
        this.members[i].mutate(0.5);
        this.members[i].calculateCost(this.goal);
        if(this.members[i].code === this.goal){
            this.sort();
            this.display(this.members.length);
            return true;
        }
    }
    this.display(5);
    this.generationCount++;
    var scope = this;
    setTimeout(function(){scope.generation();}, 20);
}

var pop = new Population('Hello World', 20);
pop.generation();
