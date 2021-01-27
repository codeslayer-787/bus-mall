'use strict';

function ProductImage(image, name){
  this.timesClicked = 0;
  this.timesShown = 0;
  this.image = image;
  this.name = name;

  ProductImage.allImages.push(this);

}
ProductImage.allImages = [];

var resultsFromLocalStorage = localStorage.getItem('votes');
var votesAsAnArray = JSON.parse(resultsFromLocalStorage);
// If the storage is null call the function to make new products.


console.log(resultsFromLocalStorage);
ProductImage.allImages = votesAsAnArray || [];

var clickCount = 0;

//These are for the chart
var productLabels = ['Bag', 'Banana', 'Bathroom', 'Boots', 'breakfast.jpg', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog-Duck', 'Dragon', 'Pen', 'Pet-sweep', 'Scissors', 'Shark', 'Sweep', 'Tautaun', 'Unicorn', 'USB', 'Water-Can', 'Wine-glass'];

// wrap these in a function.  If votesAsAnArray is null, call this function.
function noVotes(){
// creates the productImage, and runs the operations within the constructor
  new ProductImage('img/bag.jpg', 'Bag');
  new ProductImage('img/banana.jpg', 'Banana');
  new ProductImage('img/bathroom.jpg', 'Bathroom');
  new ProductImage('img/boots.jpg', 'Boots');
  new ProductImage('img/breakfast.jpg', 'Breakfast');
  new ProductImage('img/bubblegum.jpg', 'Bubblegum');
  new ProductImage('img/chair.jpg', 'Chair');
  new ProductImage('img/cthulhu.jpg', 'Cthuluhu');
  new ProductImage('img/dog-duck.jpg', 'Dog-Duck');
  new ProductImage('img/dragon.jpg', 'Dragon');
  new ProductImage('img/pen.jpg', 'Pen');
  new ProductImage('img/pet-sweep.jpg', 'Pet-Sweep');
  new ProductImage('img/scissors.jpg', 'Scissors');
  new ProductImage('img/shark.jpg', 'Shark');
  new ProductImage('img/sweep.png', 'Sweep');
  new ProductImage('img/tauntaun.jpg', 'Tauntaun');
  new ProductImage('img/unicorn.jpg', 'Unicorn');
  new ProductImage('img/usb.gif', 'USB');
  new ProductImage('img/water-can.jpg', 'Water-Can');
  new ProductImage('img/wine-glass.jpg', 'Wine-Glass');

  console.log(ProductImage.allImages);
}
if (resultsFromLocalStorage === null) {
  noVotes();
}

// select elements from my HTML to render the images

var imgContainer = document.getElementById('column2');
var leftImage = document.getElementById('left-img');
var centerImage = document.getElementById('center-img');
var rightImage = document.getElementById('right-img');

// Our Generate Random Image function
function generateRandomImgs(){
  var leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var centerIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);

  // To render different images per click

  while (leftIndex === centerIndex){
    centerIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  }
  while (rightIndex === centerIndex || rightIndex === leftIndex){
    rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  }

  var leftImg = ProductImage.allImages[leftIndex];
  var centerImg = ProductImage.allImages[centerIndex];
  var rightImg = ProductImage.allImages[rightIndex];

  return [leftImg, centerImg, rightImg];
}

function renderImages(leftImg, centerImg, rightImg){
  leftImage.src = leftImg.image;
  leftImg.timesShown++;

  centerImage.src = centerImg.image;
  centerImg.timesShown++;

  rightImage.src = rightImg.image;
  rightImg.timesShown++;
}

var randomProducts = generateRandomImgs();
renderImages(randomProducts[0], randomProducts[1], randomProducts[2]);

imgContainer.addEventListener('click', function listener(event) {
  clickCount++;
  if (clickCount !== 5){
    for (var i = 0; i < ProductImage.allImages.length; i++) {
      if (event.target.src.includes(ProductImage.allImages[i].image)) {
        ProductImage.allImages[i].timesClicked++;
        console.log(ProductImage.allImages[i]);
      }
    }
    var newProducts = generateRandomImgs();
    renderImages(newProducts[0], newProducts[1], newProducts[2]);

  } else if (clickCount === 5){
    displayList();

    var votesByProduct = [];
    console.log(votesByProduct);
    var timesProductsAreShown = [];
    console.log(timesProductsAreShown);


    for (var i = 0; i<ProductImage.allImages.length; i++){
      votesByProduct.push(ProductImage.allImages[i].timesClicked);
    }

    for (var j = 0; j <ProductImage.allImages.length; j++){
      timesProductsAreShown.push(ProductImage.allImages[j].timesShown);
    }
    var votesAsAString = JSON.stringify(ProductImage.allImages);

    localStorage.setItem('votes', votesAsAString);

    // imgContainer.removeEventListener('click');
    //Enables us to draw 2dimensional shapes using the ctx variable
    //This is an object constructor from chart.js

    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productLabels,
        datasets: [{
          label: '# of Votes',
          data: votesByProduct,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(243, 221, 221, 0.2)',
            'rgba(168, 192, 244, 0.2)',
            'rgba(137, 250, 248, 0.47)',
            'rgba(117, 239, 61, 0.47)',
            'rgba(239, 233, 61, 0.47)',
            'rgba(96, 138, 115, 0.47)',
            'rgba(224, 50, 143, 0.47)',
            'rgba(26, 3, 236, 0.47)',
            'rgba(3, 96, 236, 0.47)',
            'rgba(238, 49, 32, 0.87)',
            'rgba(32, 238, 49, 0.87)',
            'rgba(152, 32, 238, 0.87)',
            'rgba(83, 134, 227, 0.72)',
            'rgba(59, 236, 180, 0.61)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(243, 221, 221, 1)',
            'rgba(168, 192, 244, 1)',
            'rgba(137, 250, 248, 1)',
            'rgba(117, 239, 61, 1)',
            'rgba(239, 233, 61, 1)',
            'rgba(96, 138, 115, 1)',
            'rgba(224, 50, 143, 1)',
            'rgba(26, 3, 236, 1)',
            'rgba(3, 96, 236, 1)',
            'rgba(238, 49, 32, 1)',
            'rgba(32, 238, 49, 1)',
            'rgba(152, 32, 238, 1)',
            'rgba(83, 134, 227, 1)',
            'rgba(59, 236, 180, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Times Shown',
          data: timesProductsAreShown,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(243, 221, 221, 1)',
            'rgba(168, 192, 244, 1)',
            'rgba(137, 250, 248, 1)',
            'rgba(117, 239, 61, 1)',
            'rgba(239, 233, 61, 1)',
            'rgba(96, 138, 115, 1)',
            'rgba(224, 50, 143, 1)',
            'rgba(26, 3, 236, 1)',
            'rgba(3, 96, 236, 1)',
            'rgba(238, 49, 32, 1)',
            'rgba(32, 238, 49, 1)',
            'rgba(152, 32, 238, 1)',
            'rgba(83, 134, 227, 1)',
            'rgba(59, 236, 180, 1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(243, 221, 221, 0.2)',
            'rgba(168, 192, 244, 0.2)',
            'rgba(137, 250, 248, 0.47)',
            'rgba(117, 239, 61, 0.47)',
            'rgba(239, 233, 61, 0.47)',
            'rgba(96, 138, 115, 0.47)',
            'rgba(224, 50, 143, 0.47)',
            'rgba(26, 3, 236, 0.47)',
            'rgba(3, 96, 236, 0.47)',
            'rgba(238, 49, 32, 0.87)',
            'rgba(32, 238, 49, 0.87)',
            'rgba(152, 32, 238, 0.87)',
            'rgba(83, 134, 227, 0.72)',
            'rgba(59, 236, 180, 0.61)'
          ],
          borderWidth: 1
        }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    imgContainer.removeEventListener('click', listener);
    // clickCount=0;
  }

  console.log(event.target);

  //displayList();
  //the actual item that was clicked

  // to idenfity which image is clicked.

});

function displayList(){
  var listElement = document.getElementById('column1');

  for (var i = 0; i < ProductImage.allImages.length; i++){
    var itemElement = document.createElement('li');
    itemElement.textContent = `${ProductImage.allImages[i].name} shown ${ProductImage.allImages[i].timesShown} times, ${ProductImage.allImages[i].timesClicked} votes`;
    listElement.appendChild(itemElement);
  }
  console.log(listElement);

}

function storeObject(obj){
  var stringify = JSON.stringify(obj);
  localStorage.setItem('votes', stringify);
}

function fetchObject(key) {
  var stringify = localStorage.getItem(key);
  return JSON.parse(stringify);
}
