class Pathfinding {

  constructor(grid, start) {
    this.start = start;
    this.grid = grid;

    this.noth = "Up";
    this.east = "Right";
    this.west = "Left";
    this.south = "Down";

    this.directions = [this.noth, this.east, this.south, this.west];

    this.target = 9;

    this.walkable = 1;
    this.blocked = 0;

    this.processed = 'P';
    this.invalid = 'I';
    this.valid = 'V';

    this.location = {
      distanceFromTop: this.start[0],
      distanceFromLeft: this.start[1],
      path: [],
      status: this.start
    };

    this.queue = [this.location];
  }

  findShortestPath() { 
    while (this.queue.length > 0) {
      var currentLocation = this.queue.shift();
    
      for(var dir in this.directions){
        var newLocation = this.exploreInDirection(currentLocation, this.directions[dir]);
        if (newLocation.status === this.target) {
          return newLocation.path;
        } else if (newLocation.status === this.valid) {
          this.queue.push(newLocation);
        }
      }
    }
      return false;
  };

  exploreInDirection(currentLocation, direction) {
    var newPath = currentLocation.path.slice();
    newPath.push(direction);
  
    var dft = currentLocation.distanceFromTop;
    var dfl = currentLocation.distanceFromLeft;  

    if (direction === this.noth) {
      dft -= 1;
    } else if (direction === this.east) {
      dfl += 1;
    } else if (direction === this.south) {
      dft += 1;
    } else if (direction === this.west) {
      dfl -= 1;
    }
  
    var newLocation = {
      distanceFromTop: dft,
      distanceFromLeft: dfl,
      path: newPath,
      status: ''
    };

    newLocation.status = this.locationStatus(newLocation);
  
    if (newLocation.status === this.valid) {
      this.grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = this.processed;
    }
  
    return newLocation;
  };

  locationStatus(location) {
    var gridSize = this.grid.length;
    var dft = location.distanceFromTop;
    var dfl = location.distanceFromLeft;
  
    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize
        ) {

      return this.invalid;
    } else if (this.grid[dft][dfl] === this.target) {
      return this.target;
    } else if (this.grid[dft][dfl] !== this.walkable) {
      return this.blocked;
    } else {
      return this.valid;
    }
  };
  
}