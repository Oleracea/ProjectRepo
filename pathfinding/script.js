const startClass = 'start'
const endClass = 'end'
const closedClass = 'closed'
const pathClass = 'path'
const order = ['start', 'end', 'closed']
const cellElements = document.querySelectorAll('[data-cell]')
let first;
let end;
console.log(cellElements);
let visited = [];
let track = 0;
let tot_col_length = 15;
let tot_row_length = 20;
let parents = [];
class Queue{
    constructor(){
        this.elements = [];
    }
    enqueue(e){
        this.elements.push(e);
    }
    pop(){
        return this.elements.shift();
    }
    peek(){
        return this.elements[0];
    }
    isEmpty(){
        return (this.elements.length == 0);
    }
}

class Node{
    constructor(row, col, total_rows, total_col, isClosed, isVisited, parent){
        this.row = row;
        this.col = col;
        this.total_rows = total_rows;
        this.total_col = total_col;
        this.neighbors = [];
        this.isClosed = isClosed;
        this.isVisited = isVisited;
        this.parent = parent;
    }

    update_neighbors(grid){
        this.neighbors = [];
        console.log(this);
        console.log('here');
        if (this.row < this.total_rows - 1 && grid[this.row + 1][this.col].isClosed == false){
            console.log('here');
            this.neighbors.push(grid[this.row + 1][this.col]);
            (grid[this.row + 1][this.col]).parent = grid[this.row][this.col];
        }
        if (this.row > 0 && grid[this.row - 1][this.col].isClosed == false){
            this.neighbors.push(grid[this.row - 1][this.col])
            grid[this.row - 1][this.col].parent = grid[this.row][this.col];
        }
        if (this.col < this.total_col - 1 && grid[this.row][this.col + 1].isClosed == false){
            this.neighbors.push(grid[this.row][this.col + 1])
            grid[this.row][this.col + 1].parent = grid[this.row][this.col];
        }
        if (this.col > 0 && grid[this.row][this.col - 1].isClosed == false){
            this.neighbors.push(grid[this.row][this.col - 1])
            grid[this.row][this.col - 1].parent = grid[this.row][this.col];
        }
    }
}




let grid = new Array(tot_row_length)
for(var i = 0; i < tot_row_length; i++){
    grid[i] = new Array(tot_col_length);
}
for(var i = 0; i < tot_row_length; i++){
    for(var j = 0; j < tot_col_length; j++){
        grid[i][j] = new Node(i, j, tot_row_length, tot_col_length, isClosed = false, isVisited = false, null);
    }
}

console.log(grid);


start()

function start() {
    cellElements.forEach(cell => {
        for(var i = 0; i < order.length; i++){
            cell.classList.remove(order[i]);
        }
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    // for(var i = 0; i < 10; i++){
    //     cellElements[i].classList.add(pathClass);
    // }
}

function handleClick(e){
    const cell = e.target
    setCoordinates(cell);
    let index = Array.prototype.indexOf.call(cellElements, e.target);
    let y = index%20;
    let x = (index - y)/20;
    console.log(y);
    console.log(x);
    //console.log(cellElements.indexOf(e.target));
    placeMark(cell, order[track])
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
    if(track != 2){
        track++;
    }
}

function setCoordinates(cell){
    var index = Array.prototype.indexOf.call(cellElements, cell);
    var x = index%20;
    var y = (index - x)/20;
    if(track == 0){
        first = grid[x][y]
    }
    if (track == 1){
        end = grid[x][y]
    }
    if (track ==2){
        grid[x][y].isClosed = true;
    }
}

function UCS(first, end){
    q = new Queue();
    sNode = first;
    var current = sNode;
    q.enqueue(sNode);
    while (!(q.isEmpty())){
        current = q.peek();
        q.pop();
        current.isClosed = true;
        visited.push(current);
        //addClass(current, 'visited');
        if(current == end){
            console.log('FOUND');
            break;
        }
        current.update_neighbors(grid);
        console.log(current.neighbors);
        for(var i = 0; i < current.neighbors.length; i++){
            q.enqueue(current.neighbors[i]);
        }
        console.log(q.elements.length);
    }
    console.log('visited');
    console.log(visited);
    animate(visited);
    makeRoute(first, end);
}

function UCS_animate(first, end){
    q = new Queue();
    sNode = first;
    var current = sNode;
    q.enqueue(sNode);
    window.setInterval(() => {
        if(q.isEmpty){
            return;
        }
            current = q.peek();
            q.pop();
            current.isClosed = true;
            visited.push(current);
            //addClass(current, 'visited');
            if(current == end){
                console.log('FOUND');
                return;
            }
            current.update_neighbors(grid);
            console.log(current.neighbors);
            for(var i = 0; i < current.neighbors.length; i++){
                q.enqueue(current.neighbors[i]);
            }
            console.log(q.elements.length);
    }, 30);
    console.log('visited');
    console.log(visited);
    animate(visited);
    makeRoute_animate(first, end);
}

function makeRoute(start, end, grid){
    var current = end;
    var parents = [];
    while(current != start){
        removeClass(current, 'visited');
        addClass(current, 'path');
        current = current.parent;
        parents.push(current);
    }
    console.log(parents);
}

function makeRoute_animate(start, end){
    var current = end;
    var parents = [];
    var i = 0;
    while(current != start){
        // removeClass(current, 'visited');
        // addClass(current, 'path');
        current = current.parent;
        parents.push(current);
    }
    window.setInterval(() =>{
        if(i === parents.length){
            return;
        }
        removeClass(parents[i], 'visited');
        addClass(parents[i], 'path');
        i++;
    }, 100)
}

function animate(visited){
    console.log(visited);
    var i = 0;
    
    window.setInterval(() =>{
        if(i === visited.length){
            return;
        }
        removeClass(visited[i], 'path');
        addClass(visited[i], 'visited');
        i++;
    }, 10);
    
}
function removeClass(node, currentClass){
    index = node.col * 20 + node.row;
    cellElements[index].classList.remove(currentClass);
}

function addClass(node, currentClass){
    index = node.col * 20 + node.row;
    cellElements[index].classList.add(currentClass);
}


document.getElementById("start").addEventListener('click', function(){
    UCS(first, end);
    //makeRoute(first, end);
});