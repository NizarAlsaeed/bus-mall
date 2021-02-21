let imgArr=[
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass'
];

function Product(name,path){
  this.name=name;
  this.path=path;
  Product.all.push(this);
  this.views=0;
  this.clicks=0;
}
Product.all=[];



// creating product objects
for (let i = 0; i < imgArr.length; i++) {
  if(imgArr[i]!== 'sweep' && imgArr[i]!== 'usb')
  { new Product(imgArr[i],`./images/${imgArr[i]}.jpg`); }
  else if(imgArr[i]=== 'sweep')
  {new Product(imgArr[i],`./images/${imgArr[i]}.png`);}
  else if(imgArr[i]=== 'usb')
  {new Product(imgArr[i],`./images/${imgArr[i]}.gif`);}
}



let numberOfShownImgs=3;
const imgSection= document.getElementById('images');
let newImgArr=[];
for (let i = 0; i < numberOfShownImgs; i++) {
  const newImg=document.createElement('img');
  newImg.id=`img${i}`;
  newImg.width='250';
  newImg.height='250';
  imgSection.appendChild(newImg);
  newImgArr.push(newImg);
}


//rendring the chosen products uniqely AND increase views
function render(){
  let chosenImg = [];
  let tempNum=0;
  for (let i = 0; i < numberOfShownImgs; i++){
    do {
      tempNum=(randomNumber(0,imgArr.length-1));
    }while(chosenImg.includes(tempNum));
    chosenImg.push(tempNum);
    newImgArr[i].src=Product.all[chosenImg[i]].path;
    newImgArr[i].alt=Product.all[chosenImg[i]].name;
    newImgArr[i].title=Product.all[chosenImg[i]].name;
    Product.all[chosenImg[i]].views++;
  }
}




const imagesContainer= document.getElementById('images');
imagesContainer.addEventListener('click',countClicks);

function countClicks(event){
  if(counter<limit){
    if(event.target.id === 'img0' || event.target.id === 'img1' || event.target.id === 'img2' ){

      for (let i = 0; i < Product.all.length; i++) {
        if (Product.all[i].name === event.target.title) {
          console.log(Product.all[i].name , event.target.title);
          Product.all[i].clicks++;
        }
      }
      render();
    }
    counter++;
  }}

let liElArr=[];
const rsltSection= document.getElementById('results');
const ulEl = document.createElement('ul');
rsltSection.appendChild(ulEl);
for (let i = 0; i < Product.all.length; i++){
  const liEl = document.createElement('li');
  ulEl.appendChild(liEl);
  liElArr.push(liEl);
}
function showResults(){ //called by the button using onclick
  for (let i = 0; i < Product.all.length; i++) {
    liElArr[i].textContent=`${Product.all[i].name} had ${Product.all[i].clicks} votes, and was seen ${Product.all[i].views} times.`;
  }

}


let counter = 0;
let limit = 25;

render();

//----------------------helper function----------------
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
