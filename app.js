'use strict';

function ProductImage(image, name){
  this.timesClicked = 0;
  this.timesShown = 0;
  this.image = image;
  this.name = name;

  ProductImage.allImages.push(this);

}
ProductImage.allImages = [];

var clickCount = 0;


// creates the productImage, and runs the operations within the constructor
new ProductImage('/img/bag.jpg', 'Bag');
new ProductImage('/img/banana.jpg', 'Banana');
new ProductImage('/img/bathroom.jpg', 'Bathroom');
new ProductImage('/img/boots.jpg', 'Boots');
new ProductImage('/img/breakfast.jpg', 'Breakfast');
new ProductImage('/img/bubblegum.jpg', 'Bubblegum');
new ProductImage('/img/chair.jpg', 'Chair');
new ProductImage('/img/cthulhu.jpg', 'Cthuluhu');
new ProductImage('/img/dog-duck.jpg', 'Dog-Duck');
new ProductImage('/img/dragon.jpg', 'Dragon');
new ProductImage('/img/pen.jpg', 'Pen');
new ProductImage('/img/pet-sweep.jpg', 'Pet-Sweep');
new ProductImage('/img/scissors.jpg', 'Scissors');
new ProductImage('/img/shark.jpg', 'Shark');
new ProductImage('/img/sweep.png', 'Sweep');
new ProductImage('/img/tauntaun.jpg', 'Tauntaun');
new ProductImage('/img/unicorn.jpg', 'Unicorn');
new ProductImage('/img/usb.gif', 'USB');
new ProductImage('/img/water-can.jpg', 'Water-Can');
new ProductImage('/img/wine-glass.jpg', 'Wine-Glass');

console.log(ProductImage.allImages);

// select elements from my HTML to render the images

var imgContainer = document.getElementById('column2');
var leftImage = document.getElementById('left-img');
var centerImage = document.getElementById('center-img');
var rightImage = document.getElementById('right-img');

function generateRandomImgs(){
  var leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var centerIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);

  while (rightIndex & centerIndex === leftIndex){
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

imgContainer.addEventListener('click', function (event) {
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
    // clickCount=0;
  }
  console.log(event.target);
  // let numberOfVotes = 5;
  // if event.target <= numberOfVotes
  // then
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
