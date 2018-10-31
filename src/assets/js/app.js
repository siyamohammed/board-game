const FunctionInit = (function() {
  "use strict";
  return {
      init: function(options) {
          this.boardWrapper = document.querySelector(options.boardWrapper);
          this.drawBoard();
          this.placeDiamonds();
          this.maxScore = 56;
          this.revealedItems = 0;
      },
      drawBoard: function() {
          let html = '',
              count = 1;
          for (let i = 0; i < 8; i++) {
              for (let j = 0; j < 8; j++) {
                  html += `<div class='unknown m-board__col' id="col-${count}"></div>`;
                  count++;
              }
          }
          this.boardWrapper.innerHTML = html;
      },
      placeDiamonds: function() {
          let posArray = [],
              boardCols = this.boardWrapper.querySelectorAll('.m-board__col')
          while (posArray.length < 8) {
              var random = Math.floor(Math.random() * 64) + 1;
              if (posArray.indexOf(random) > -1) continue;
              posArray[posArray.length] = random;
          }
          posArray.forEach(function(val, index) {
              boardCols[val].classList.add('diamond');
          });

          boardCols.forEach(column => column.addEventListener('click', this.onColumnClick));
      },
      onColumnClick: function() {
          let colId = this.id,
              result = 10;
          if (this.classList.contains('diamond')) {
              this.classList.remove('unknown')
              if (!this.classList.contains('reveal')) {
                  this.classList.add('reveal');
                  FunctionInit.revealedItems += 1;
                  if (FunctionInit.revealedItems === 8) {
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


FunctionInit.init({
  boardWrapper: ".m-board__container"
});