const startClass = 'start'
const endClass = 'end'
const closedClass = 'closed'
const pathClass = 'path'
const order = ['start', 'end', 'closed']
const classes = ['start', 'end', 'closed', 'visited', 'path']
const cellElements = document.querySelectorAll('[data-cell]')
let first;
let end;
//let visited = [];
let track = 0;
let tot_col_length = 14;
let tot_row_length = 20;
let method = '';
console.log(Math.abs(-3));

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

class PriorityQueue{
    constructor(){
        this.elements = [];
    }
    enqueue(e){
        if(this.elements.length == 0){
            this.elements.push(e);
        }
        for(var i = 0; i < this.elements.length; i++){
            console.log(i)
            console.log(this.elements.length);
            //goes until finds a place where f_score is less than already in queue
            if(e.f_score < this.elements[i].f_score){
                console.log('insert');
                this.elements.splice(i, 0, e);
                return;
            } else if(i == (this.elements.length - 1)){
                console.log('push');
                this.elements.push(e);
                return;
            }
        }
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
        this.g_score = 99; 
        this.f_score = 99;
    }

    update_neighbors(grid){
        this.neighbors = [];
        if (this.row < this.total_rows - 1 && grid[this.row + 1][this.col].isClosed == false){
            this.neighbors.push(grid[this.row + 1][this.col]);
        }
        if (this.row > 0 && grid[this.row - 1][this.col].isClosed == false){
            this.neighbors.push(grid[this.row - 1][this.col])
        }
        if (this.col < this.total_col - 1 && grid[this.row][this.col + 1].isClosed == false){
            this.neighbors.push(grid[this.row][this.col + 1])
        }
        if (this.col > 0 && grid[this.row][this.col - 1].isClosed == false){
            this.neighbors.push(grid[this.row][this.col - 1])
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


start()

function start() {
    parents = [];
    // for(var i = 0; i < tot_row_length; i++){
    //     for(var j = 0; j < tot_col_length; j++){
    //         grid[i][j] = new Node(i, j, tot_row_length, tot_col_length, isClosed = false, isVisited = false, null);
    //     }
    // }
    
    cellElements.forEach(cell => {
        for(var i = 0; i < classes.length; i++){
            cell.classList.remove(classes[i]);
        }
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    console.log(cellElements);
}

function handleClick(e){
    const cell = e.target
    setCoordinates(cell);
    var index = Array.prototype.indexOf.call(cellElements, e.target);
    var y = index%20;
    var x = (index - y)/20;
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
    var visited = [];
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
            break;
        }
        current.update_neighbors(grid);
        for(var i = 0; i < current.neighbors.length; i++){
            current.neighbors[i].parent = current;
            q.enqueue(current.neighbors[i]);
        }
    }
    var parents = [];
    getParents(first, end, parents);
    animate(visited, parents);
}


function astar(first, end){
    var temp_g_score = 0;
    var visited = [];
    first.g_score = 0;
    first.f_score = h(first);

    q = new PriorityQueue();
    sNode = first;
    var current = sNode;
    console.log(current);
    q.enqueue(sNode);
    console.log(q);
    console.log(q);
    while (!(q.isEmpty())){
        console.log('here');
        current = q.peek();
        temp_g_score = current.g_score + 1;
        console.log(temp_g_score);
        q.pop();
        current.isClosed = true;
        visited.push(current);
        //addClass(current, 'visited');
        if(current == end){
            break;
        }
        current.update_neighbors(grid);
        for(var i = 0; i < current.neighbors.length; i++){
            if(temp_g_score < current.neighbors[i].g_score){
                console.log('here');
                current.neighbors[i].parent = current;
                set_g(current.neighbors[i], temp_g_score);
                set_f(current.neighbors[i], temp_g_score + h(current.neighbors[i]));
                if(!checkIn(current.neighbors[i], q)){
                    q.enqueue(current.neighbors[i]);
                }  
            }           
        }
    }
    console.log('found');
    
    var parents = [];
    getParents(first, end, parents);
    animate(visited, parents);
}

function checkIn(node, q){
    for(var i = 0; i < q.length; i++){
        if(q[i] == node){
            return true;
        }
    }
    return false;
}

function get_g(node){
    var score = g_score[node.row][node.col];
    return score;
}

function set_g(node, val){
    node.g_score = val;
}

function set_f(node, val){
    node.f_score = val;
}

function h(node){
    var num = Math.abs(end.row - node.row);
    num = num + Math.abs(end.col - node.col);
    return num;
}

function getParents(start, end, parents){
    var current = end;
    console.log(parents);
    while(current != start){
        parents.push(current);
        current = current.parent;
    }
    return parent;
}

function animate(visited, parents){
    var i = 0;
    
    window.setInterval(() =>{
        if(i === visited.length){
            console.log('here');
            var j = parents.length - 1;
    
            window.setInterval(() =>{
                if(j == 0){
                    return true;                    
                }
                removeClass(parents[j], 'visited');
                addClass(parents[j], 'path');
                j--;
            }, 100);
        } else {
            removeClass(visited[i], 'path');
            addClass(visited[i], 'visited');
            i++;
        }
    }, 10);
}

function callbackTest(animate, visited){
    animate(visited);
}

function removeClass(node, currentClass){
    index = node.col * 20 + node.row;
    cellElements[index].classList.remove(currentClass);
}

function addClass(node, currentClass){
    index = node.col * 20 + node.row;
    if(cellElements[index].classList.contains('start') || cellElements[index].classList.contains('end')){
        return;
    }
    cellElements[index].classList.add(currentClass);
}

document.getElementById("start").removeEventListener('click', function(){
    console.log(document.getElementById('method').value);
    method(first, end);
});

document.getElementById("start").addEventListener('click', function(){
    console.log(document.getElementById('method').value);
    method(first, end);
});


document.getElementById("restart").removeEventListener('click', function(){
    start();
});
document.getElementById("restart").addEventListener('click', function(){
    for(var i = 0; i < tot_row_length; i++){
        for(var j = 0; j < tot_col_length; j++){
            resetTo(grid[i][j]);
        }
    }
    cellElements.forEach(cell => {
        cell.classList.remove('path');
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    parents = [];
});

function resetTo(node){
    node.isClosed = false;
    node.isVisited = false;
    node.parent = null;
    node.g_score = 99;
    node.f_score = 99;
}


function setValD(){
    method = UCS;
}

function setValA(){
    method = astar;
}