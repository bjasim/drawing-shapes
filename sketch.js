/* 
* Filename: A1
* Project: Assignment 1 SENG3040
* Author: Bakr Jasim
* Date: Sep 29, 2023
* Description: THis is the first assignment of the SENG3040 course, which we have to draw shapes and display an image in the canvas
*/

let img;              //the image path
let height = 500;     // the canvas height  
let width = 500;      // the canvas width
let borderWidth = 10; //the border width of the large image
let imageBorder = 10; //the image border from the inside
let centerLineThikness = 3; //thickness of the centre yellow line
let widthAfterBorder = width - borderWidth; //the width after we apply the border 
let heightAfterBorder = height - borderWidth; //the height after the border 
let ShapeThikness = 1; //the shape thickness for the ellipse and the rectangle
let startBorderAfter = borderWidth / 2; // the actual border for the image after the outside border
let endBorderAfter = width - (borderWidth + imageBorder); // the actual end for the image just before the outside border of the large image
let waveHeight = height * 0.2; //the height of the wave
let WaveMidY = waveHeight / 5; //the middle Y axis of the wave

/*
* Function: setup
* Description: This function gets called first, we can use this to do the
* configuration we want for the project such as the height and the width of the canvas
* Parameter: no parameter
*/
function setup() {
  //specify the dimentions
  createCanvas(width, height);
}

/*
* Function: preload
* Description: This function loads the resources for this project (image)
* Parameter: no parameter
*/
function preload() {
  //load the image
  img = loadImage('assets/golf-1284012_640.jpg');
}

/*
* Function: draw
* Description: This is where we can add the drawing for our program, or in our case will call all the
* other function to create the shapes and the drawings, its like the "main" function.
* Parameter: no parameter
*/
function draw() {
  //specify the background color
  background(130);
  //call it to draw the borders
  drawBorders();
  //call it to draw the wave
  drawWave();
  //call it to display the image
  drawImage();
  //draw the shapes
  drawShapes();

  //draw the yellow line in the centre
  stroke(255, 204, 0); //color
  strokeWeight(centerLineThikness); // thickness
  line(0 + borderWidth / 2, height / 2, width - borderWidth / 2, height / 2); // this line will draw the line in the specified location
}

/*
* Function: drawWave
* Description: This function will draw the wave for in the centre of the canvas
* Parameter: no parameter
*/
function drawWave() 
{
  // make the wave unfilled
  noFill();
  // make the color white
  stroke(255);
  //the stroke weight is 2 pixels
  strokeWeight(2);
  
  //specify how many waves in the canvas
  let segmentWidth = width / 10;
  beginShape();
  vertex(0, height / 2);

  for (let i = 0; i < 10; i++) {
    // X1 of the wave
    let x1 = i * segmentWidth;
    // y1 of the wave
    let y1 = (height / 2) - WaveMidY;
    // X2 of the wave
    let x2 = x1 + segmentWidth / 2;
    // y2 of the wave
    let y2 = y1 + waveHeight;
    // X3 of the wave
    let x3 = x1 + segmentWidth;
    // y3 of the wave
    let y3 = y1;
    //draw the waves as specified
    bezierVertex(x1, y1, x2, y2, x3, y3);
  }

  vertex(width, height / 2);
  endShape();
}

/*
* Function: drawShapes
* Description: This functin will draw the shapes in the function
* Parameter: no parameter
*/
function drawShapes() {
  //------------The Ellipse Shape------------------
  let shapeCentre = (heightAfterBorder + heightAfterBorder * 0.55) / 2; //the 45% centre for the shapes
  stroke(255, 0, 200); //the color of the lines
  strokeWeight(ShapeThikness); // specify the thickness 

  //dimensions for the ellipse
  let ellipseX = width / 2; //the ellipse is in the center
  let ellipseY = shapeCentre + ((heightAfterBorder / 2) * 0.05); 
  let ellipseSize = heightAfterBorder * 0.37; 
  
  //draw the shape
  strokeJoin(MITER);
  ellipse(ellipseX, ellipseY, ellipseSize, ellipseSize);

  //------------The Rectangle Shape---------------------
  let rectSize = ellipseSize * 0.70; 
  let rectX = ellipseX; //the x of the rect is the same as the ellipse
  let rectY = ellipseY; //the Y of the rect is the same as the ellipse
  
  // Calculate the position of the rectangle
  let rectTop = rectY - rectSize / 2;
  let rectLeft = rectX - rectSize / 2;
  
  //draw the rectangle
  strokeJoin(MITER);
  rect(rectLeft, rectTop, rectSize, rectSize);

  // ----------------------The Trapezoid Shape --------------------------
  let trapTopBegin = (widthAfterBorder * 1/4); //the trapezoid top begins here
  let trapTopEnd = (widthAfterBorder * 3/4);//the trapezoid top ends here
  let trapBottomBegin = (widthAfterBorder * 0.20); //the trapezoid bottom begins here
  let trapBottomEnd = (widthAfterBorder * 0.80); //the trapezoid bottom ends here here
 
  // get the X axis and the Y axis for the trapezoid
  let trapezoidX1 = trapBottomBegin;
  let trapezoidY1 = ellipseY + ellipseSize / 2;
  let trapezoidX2 = trapBottomEnd;
  let trapezoidY2 = ellipseY + ellipseSize / 2;
  let trapezoidX3 = trapTopEnd;
  let trapezoidY3 = ellipseY - ellipseSize / 2;
  let trapezoidX4 = trapTopBegin;
  let trapezoidY4 = ellipseY - ellipseSize / 2;
  
  // Draw the trapezoid
  strokeWeight(8);
  stroke(110); //the color is gray
  strokeJoin(ROUND); //the edges are round
  
  beginShape();
  vertex(trapezoidX1, trapezoidY1);
  vertex(trapezoidX2, trapezoidY2);
  vertex(trapezoidX3, trapezoidY3);
  vertex(trapezoidX4, trapezoidY4);
  endShape(CLOSE);
}

/*
* Function: mouseClicked
* Description: This will tint the image in the canvas to the cyan when the mouse clicks
* Parameter: no parameter
*/
function mouseClicked() 
{
  // when the mouse gets clicked
  if(mouseClicked)
  {
    tint(0, 255, 255); // cyan tint
  }
}

/*
* Function: drawBorders
* Description: This function will draw the border just from the outside of the canvas
* Parameter: no parameter
*/
function drawBorders() {
  // the color of the border
  stroke(255);
  // the stroke weight
  strokeWeight(borderWidth);
  noFill();
  // draw it
  rect(0, 0, width, height);
}

/*
* Function: drawImage
* Description: This function will draw the image with the specified dimentions
* Parameter: no parameter
*/
function drawImage() 
{
  image(img, startBorderAfter + imageBorder, startBorderAfter + imageBorder, endBorderAfter - imageBorder, (heightAfterBorder / 2 - centerLineThikness)  - (imageBorder * 1) - 10 - WaveMidY);
}

