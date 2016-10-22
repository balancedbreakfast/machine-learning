var Node = require('./node');

var NodeList = function(k){
    this.nodes = [];
    this.k = k;
}

NodeList.prototype.add = function(node){
    this.nodes.push(node);
}

//Normalize Data
NodeList.prototype.calculateRanges = function(){
    this.areas = {min: Number.MAX_VALUE, max: Number.MIN_VALUE};
    this.rooms = {min: Number.MAX_VALUE, max: Number.MIN_VALUE};
    for (var i in this.nodes){
        if (this.nodes[i].rooms < this.rooms.min){
            this.rooms.min = this.nodes[i].rooms;
        }
        if (this.nodes[i].rooms > this.rooms.max){
            this.rooms.max = this.nodes[i].rooms;
        }
        if (this.nodes[i].area < this.areas.min){
            this.areas.min = this.nodes[i].area;
        }
        if (this.nodes[i].area > this.areas.max){
            this.areas.max = this.nodes[i].area;
        }
    }
}

NodeList.prototype.determineUnknown = function(){
    this.calculateRanges();

    for(var i in this.nodes){
        if(this.nodes[i].type === undefined){

            //Clone nodes into unknown node
            this.nodes[i].neighbors = [];
            for(var j in this.nodes){
                if(this.nodes[j].type !== undefined){
                    this.nodes[i].neighbors.push(new Node(this.nodes[j]));
                }
            }

            this.nodes[i].measureDistances(this.areas, this.rooms);
            this.nodes[i].sortNeighborsByDistance();
            this.nodes[i].guessType(this.k);

        }
    }
}

module.exports = NodeList;
