var Node = function(object){
    for (var key in object){
        this[key] = object[key];
    }
}

Node.prototype.measureDistances = function(areaRangeObject, roomsRangeObject){
    var roomsRange = roomsRangeObject.max - roomsRangeObject.min;
    var areaRange = areaRangeObject.max - areaRangeObject.min;

    for(var i in this.neighbors){
        var neighbor = this.neighbors[i]
        var deltaRooms = neighbor.rooms - this.rooms;
        var deltaArea = neighbor.area - this.area;

        //Normalize
        deltaRooms = (deltaRooms)/roomsRange;
        deltaArea = (deltaArea)/areaRange;

        neighbor.distance = Math.sqrt(deltaRooms*deltaRooms + deltaArea*deltaArea);
    }
}

Node.prototype.sortNeighborsByDistance = function(){
    this.neighbors.sort(function(a,b){
        return a.distance - b.distance;
    });
}

Node.prototype.guessType = function(k){
    var types = {};
    //Slice the first k nodes off the sorted neighbors by distance
    var kNeighbors = this.neighbors.slice(0, k);

    //Count types
    for(var i in kNeighbors){
        var type = kNeighbors[i].type;
        if(types[type] !== undefined){
            types[type] += 1;
        }
        else{
            types[type] = 1;
        }
    }
    //Find which type is the most common amongst the k nearest neighbors
    var guess = {type: '', count: 0};
    for(var key in types){
        if(types.hasOwnProperty(key)){
            if(types[key] > guess.count){
                guess.type = key;
                guess.count = types[key];
            }
        }
    }
    this.guess = guess;
    console.log('Unknown Node:', {'rooms': this.rooms, 'area': this.area, 'guess': this.guess});
    return types;
}

module.exports = Node;
