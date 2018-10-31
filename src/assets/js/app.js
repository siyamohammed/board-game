/**
 * Main javascript file
 * Date: 2018-10-31
 */
const FunctionInit = (function() {
    /*  ----------------------------- Explanation ----------------------------------------
     * All functions used in the page are assiged to 'FunctionInit' object as prototype.
     */
    "use strict";
    return {
      init: function(options) {
        this.boardWrapper = document.querySelector(options.boardWrapper);
        this.colCount = options.rowCols;
        this.drawBoard();
        this.boardCols = this.boardWrapper.querySelectorAll('.m-board__col');
        this.placeDiamonds();
        document.documentElement.style.setProperty(`--colCount`, options.rowCols);
        document.documentElement.style.setProperty(`--gridColor`, options.gridColor);
        this.maxScore = (this.colCount * this.colCount) - this.colCount;
        this.revealedItems = 0;
      },
      /**
          Function used for draw the board with provided row & column numbers
        * Created html fragment inserted in to the container div for the board
        * @returns null.
        */
      drawBoard: function() {
        let html = '',
          count = 1;
        for (let i = 1; i <= this.colCount; i++) {
          for (let j = 1; j <= this.colCount; j++) {
            html += `<div class='unknown m-board__col' id="col-${count}"></div>`;
            count++;
          }
        }
        this.boardWrapper.innerHTML = html;
      },
      /**
          Function used for placing diamonds in the board
        * @returns null.
        */
      placeDiamonds: function() {
        let posArray = [],
          boardColumns = FunctionInit.boardCols;
        while (posArray.length < this.colCount) {
          var random = Math.floor(Math.random() * (this.colCount * this.colCount)) + 1;
          if (posArray.indexOf(random) > -1) continue;
          posArray[posArray.length] = random;
        }
        posArray.forEach(function(val, index) {
          boardColumns[val].classList.add('diamond');
        });
  
        // console.log("pa= " + posArray);
        boardColumns.forEach(column => column.addEventListener('click', this.onColumnClick));
      },
      /**
          Function used for handling the column click.
        * @returns null.
        */
      onColumnClick: function() {
        let boardColumns = FunctionInit.boardCols,
          itemsArray = Array.from(boardColumns),
          colCount = FunctionInit.colCount;
        if (this.classList.contains('diamond')) {
          this.classList.remove('unknown')
          if (!this.classList.contains('reveal')) {
            this.classList.add('reveal');
  
            // Clear stale arrows
            boardColumns.forEach(column => column.classList.remove("up", "down", "left", "right"));
            FunctionInit.revealedItems += 1;
            if (FunctionInit.revealedItems === colCount) {
              document.querySelector('.m-board__score').innerHTML = `<h3>Your score</h3><span>${FunctionInit.maxScore}</span>`;
              document.querySelector('.m-board__template').classList.add('show');
            }
          }
          return;
        } else if (!this.classList.contains('unknown')) {
          return;
        } else {
          this.classList.remove('unknown');
          var thisColIndex = itemsArray.indexOf(this);
          var row = Math.floor(thisColIndex / colCount);
          var col = thisColIndex % colCount;
  
          // Initialize to seed values
          var minDistance = colCount
          var curDirection = "dont-know"
  
          // Go over every box and figure out nearest box with unrevealed diamond
          for (var i = 0; i < colCount; i++) {
            for (var j = 0; j < colCount; j++) {
              var curIndex = i * colCount + j;
              var curBox = itemsArray[curIndex];
  
              // Clear stale arrows if present
              curBox.classList.remove("up", "down", "left", "right")
  
              if (curBox.classList.contains("diamond") && !curBox.classList.contains("reveal")) {
                var curXDistance = i - row;
                var curYDistance = j - col;
  
                // Calculate current distance
                var curDistance = Math.sqrt(curXDistance * curXDistance + curYDistance * curYDistance)
  
                // Check if current distance is lesser than current minimum, if so, update
                if (curDistance < minDistance) {
                  minDistance = curDistance
  
                  // Find out which way to go
                  // If x-co-ordinate or y-co-ordinate is same, make sure we we show the direction in terms of the other co-ordinate
                  if (Math.abs(curXDistance) < Math.abs(curYDistance)) {
                    // Negative yDistance means left, otherwise right
                    if (curYDistance < 0) {
                      curDirection = "left";
                    } else {
                      curDirection = "right";
                    }
                  } else {
                    // Negative xDistance means up, otherwise down.
                    if (curXDistance < 0) {
                      curDirection = "up"
                    } else {
                      curDirection = "down"
                    }
                  }
                }
              }
            }
          }
          this.classList.add(curDirection);
          FunctionInit.maxScore--;
        }
      }
    }
  })();
  
  
  (function() {
    /*  ----------------------------- Explaination ----------------------------------------
     * Intiallzing the 'FunctionInit' with custom options
     */
    FunctionInit.init({
      boardWrapper: ".m-board__container",
      rowCols: 8,
      gridColor: '#ddd'
    });
  
  })();