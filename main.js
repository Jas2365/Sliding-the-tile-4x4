var tileNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var turns = document.getElementById("result");
var indexGlobal = 0;
var t = 0;
var emptyTile;

var box = [];

var row = 4;
var col = 4;
 
startGame();
  
function startGame() {
  loadGame();

  jumbleTiles();

  allocateEmptyClass();

  assignTileNum();
 
}
function logSeq(){
  
  let board = document.getElementById("board");
  let tile = board.children;
  for(let index = 0; index <= tileNum.length; index++){
   box.push(parseInt(tile[index].innerText));
  }
  if(Number.isNaN(box[box.length -1])){
  box = box.filter(n => !Number.isNaN(n));
}
  let winning = checkWin(box, nums);
  if(winning){
    turns.innerText ="Well Done!";
  }
  box = [];
}
function checkWin(curr, win){
  for (let i = 0; i < curr.length; i++) {
     if(curr[i] !== win[i]) return false;
  }
  return true;
}

function reset(){
  turns.innerText = 0;

  t= 0;
  let board = document.getElementById("board");
  let tile = board.children;

  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      let index = r * col + c;
      let tiles = tile[index];
      tiles.id = r.toString() + "-" + c.toString();
      tiles.classList = "tile";
    }
  }
  jumbleTiles();

  allocateEmptyClass();

  assignTileNum();

}

// no of turns 
function noOfTurns(){
  t++;
  turns.innerText = t;  
  logSeq();
}
// to load the game
function loadGame() {
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      let tiles = document.createElement("button");
      document.getElementById("board").append(tiles);

      tiles.id = r.toString() + "-" + c.toString();
      tiles.classList = "tile";
    }
  }

  this.currentTile();
}

// an empty tile
function allocateEmptyClass() {
  let eR = Math.floor(Math.random() * row);
  let eC = Math.floor(Math.random() * col);
  emptyTile = document.getElementById(eR.toString() + "-" + eC.toString());
  emptyTile.classList = "empty";
}

// jumbling the tiles at the start of the game
function jumbleTiles() {
  tileNum.sort(() => Math.random() - 0.5);
}
// a 2d array of all tile coords / ids
function toLoopOverBoard() {
  let allIds = [];
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      let tileId = r.toString() + "-" + c.toString();
      allIds.push(tileId);
    }
  }
  return allIds; // returns a 2d array
}

// assing each tile a number
function assignTileNum() {
  toLoopOverBoard().forEach((i) => {
    tiles = document.getElementById(i);
    
    if (tiles.classList == "empty") {
      tiles.innerText = " ";
    }
    
    if (tiles.classList == "tile") {
      tiles.innerText = tileNum[indexGlobal];
      indexGlobal++;
    }
    if(indexGlobal > 14) {
      indexGlobal = 0;
    }
    
  });
}
// fucntion to check the cliked tile
function currentTile() {
  toLoopOverBoard().forEach((i) => {
    let tiles = document.getElementById(i);
    if (tiles.className == "tile") {
      tiles.addEventListener("click", tileClicked);
    }
  });
}

//a function to get the coords of tile clicked
function tileClicked() {
  let tileId = this.id.split("-");
  let r1 = parseInt(tileId[0]);
  let c1 = parseInt(tileId[1]);

  tilesIds(r1, c1);
}

// function to get current tile and adjacent tiles
function tilesIds(r, c) {
  var currTile = document.getElementById(r.toString() + "-" + c.toString());

  checkempty(currTile, r,c);
}
function checkempty(currTile, r,c) {
  checkLeft(currTile, r, c);
  checkRight(currTile, r, c);
  checkTop(currTile, r, c);
  checkBottom(currTile, r, c);
}
// look left
function checkLeft(currTile, r, c) {
  if ((c > 0 || c <= col) && c >= 1) {
    let leftTile = document.getElementById(
      r.toString() + "-" + (c - 1).toString()
    );
    if (leftTile.className == "empty") {
      slideLeft(currTile, leftTile);
    }

  }
}
// look right
function checkRight(currTile, r, c) {
  if (c < col - 1 && c >= 0) {
    var rightTile = document.getElementById(
      r.toString() + "-" + (c + 1).toString()
    );
    if (rightTile.className == "empty") {
      slideRight(currTile, rightTile);
    }
  }
}
// look up
function checkTop(currTile, r, c) {
  if (r >= 1 && r <= row) {
    let topTile = document.getElementById(
      (r - 1).toString() + "-" + c.toString()
    );
    if (topTile.className == "empty") {
      slideRight(currTile, topTile);
    }
   }
  }
// look down
function checkBottom(currTile, r, c) {
  if (r >= 0 && r < row - 1) {
    let bottomTile = document.getElementById(
      (r + 1).toString() + "-" + c.toString()
    );

    if (bottomTile.className == "empty") {
      slideRight(currTile, bottomTile);
    }
  }
  }
// the SLIDEEE LEFTTT
function slideLeft(currTile, leftTile) {
  leftTile.classList = "tile";
  currTile.classList = "empty";

  let tempLeft = leftTile.innerText;
  let tempCurr = currTile.innerText;

  currTile.innerText = tempLeft;
  leftTile.innerText = tempCurr;

  noOfTurns();
}
// the SLIDEEE  RIGHTTT
function slideRight(currTile, rightTile) {
  rightTile.classList = "tile";
  currTile.classList = "empty";

  let tempRight = rightTile.innerText;
  let tempCurr = currTile.innerText;

  currTile.innerText = tempRight;
  rightTile.innerText = tempCurr;

  noOfTurns();
}
// the SLIDEEE TOPPP
function slideUp(currTile, topTile) {
  topTile.classList = "tile";
  currTile.classList = "empty";

  let tempTop = topTile.innerText;
  let tempCurr = currTile.innerText;

  currTile.innerText = tempTop;
  topTile.innerText = tempCurr;

  noOfTurns();
}
// the SLIDEEE BOTTOMMM
function slideDown(currTile, bottomTile) {
  bottomTile.classList = "tile";
  currTile.classList = "empty";

  let tempBottom = bottomTile.innerText;
  let tempCurr = currTile.innerText;

  currTile.innerText = tempBottom;
  bottomTile.innerText = tempCurr;

  noOfTurns();
}
