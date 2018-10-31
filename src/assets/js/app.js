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
          this.placeDiamonds();
          document.documentElement.style.setProperty(`--colCount`, options.rowCols);
          document.documentElement.style.setProperty(`--gridColor`, options.gridColor);
          this.maxScore = (this.colCount*this.colCount) - this.colCount;
          this.revealedItems = 0;
      },
      /**
        function used for draw the board with provided row & column numbers
      * Created html fragment inserted in to the container div for the board
      * @returns null.
      */
      drawBoard: function() {
          let html = '',
              count = 1;
          for (let i = 1; i <= this.colCount; i++) {
              for (let j = 1; j <= this.colCount; j++) {
                  html += `<div class='unknown m-board__col' id="col-${i}-${j}"></div>`;
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
              boardCols = this.boardWrapper.querySelectorAll('.m-board__col'),
              diamondCols = [];
          while (posArray.length < this.colCount) {
              var random = Math.floor(Math.random() * (this.colCount*this.colCount)) + 1;
              if (posArray.indexOf(random) > -1) continue;
              posArray[posArray.length] = random;
          }
          posArray.forEach(function(val, index) {
              boardCols[+val].classList.add('diamond');
          });

          boardCols.forEach(column => column.addEventListener('click', this.onColumnClick));
      },
        /**
          function used for handling the column click.
        * @returns null.
        */
      onColumnClick: function() {
          let colId = this.id,
              result = 10;
          if (this.classList.contains('diamond')) {
              this.classList.remove('unknown')
              if (!this.classList.contains('reveal')) {
                  this.classList.add('reveal');
                  FunctionInit.revealedItems += 1;
                  if (FunctionInit.revealedItems === FunctionInit.colCount) {
                      document.querySelector('.m-board__score').innerHTML = `<h3>Your score</h3><span>${FunctionInit.maxScore}</span>`;
                      document.querySelector('.m-board__template').classList.add('show');
                  }
              }
              return;
          } else if (!this.classList.contains('unknown')) {
              return;
          } else {
              this.classList.remove('unknown');
              FunctionInit.maxScore--;
          }
      }
  }
})();


(function(){
  /*  ----------------------------- Explaination ----------------------------------------
  * Intiallzing the 'FunctionInit' with custom options
  */
  FunctionInit.init({
    boardWrapper: ".m-board__container",
    rowCols: 8,
    gridColor: '#ddd'
  });

})();