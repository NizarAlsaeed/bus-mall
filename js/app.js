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
  if(localStorage.length===0){
    this.views=0;
    this.clicks=0;
  }else{
    for (let i = 0; i < 20; i++) {
      if((JSON.parse(localStorage.getItem('AllProducts'))[i].name === this.name))
      { console.log('okkk');
        this.views= JSON.parse(localStorage.getItem('AllProducts'))[i].views ;
        this.clicks=JSON.parse(localStorage.getItem('AllProducts'))[i].clicks;
      }else console.log('not okkk');
    }}
}
Product.all=[];

function retrieve(){
  console.table(Product.all);
 // Product.all=JSON.parse(localStorage.getItem('AllProducts'));
}

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
let chosenImg = [];
function render(){
  //debugger;
  let tempNum=0;
  for (let i = 0; i < numberOfShownImgs; i++){
    do {
      tempNum=(randomNumber(0,imgArr.length-1));
    }while(chosenImg.includes(tempNum));
    chosenImg.push(tempNum);}
  if(chosenImg.length===6)chosenImg.splice(0,3);
  for (let i = 0; i < numberOfShownImgs; i++){
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
          console.log(Product.all[i].name);
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


let chartType;
const FORM = document.getElementById('form');
FORM.addEventListener('submit',chooseChartType);


function chooseChartType(event){
  event.preventDefault();
  chartType = event.target.selectChart.value;
  document.getElementById('canvasId').remove();
  showResults();
}

function showResults(){ //called by the button using onclick
  document.getElementById('button').onclick='';
  let clicksArr =[],viewsArr=[];
  for (let i = 0; i < Product.all.length; i++) {
    liElArr[i].textContent=`${Product.all[i].name} had ${Product.all[i].clicks} votes, and was seen ${Product.all[i].views} times.`;
    clicksArr.push(Product.all[i].clicks);
    viewsArr.push(Product.all[i].views);
  }
  const chartSection = document.getElementById('chartSection');
  const canvas = document.createElement('canvas');
  canvas.id='canvasId';
  chartSection.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if(chartType===undefined){chartType='bar';}
  if(counter===limit){
    new Chart(ctx,{
      type: chartType,
      data: {
        labels: imgArr,
        datasets: [{
          label: '# of Clicks',
          data: clicksArr,
          backgroundColor: 'rgba(54, 162, 235, 0.4)',
        },
        {
          label: '# of Views',
          data: viewsArr,
          backgroundColor: ' rgba(69, 235, 54, 0.4)',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
    console.log('hi');
    localStorage.setItem('AllProducts',JSON.stringify(Product.all));
    localStorage.setItem('test',0);
  }
}

let counter = 0;
let limit = 25;

render();
retrieve();
//----------------------helper function----------------
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
