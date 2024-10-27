//Defines the canvas area in the webpage
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearCanvas');
//Sets the drawing as false so that it doesnt ddraw unless your clicking
let drawing = false;
let color = '#000000';

ctx.strokeStyle = color;

colorPicker.addEventListener('input', (event) => {
  color = event.target.value;
  ctx.strokeStyle = color;
});
//Adds event listeners to show what is being drawn
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
//Begins the drawing process
function startDrawing(event) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
//Keeps the drawing in place if the mouse button is being held down
function draw(event) {
  if (!drawing) return;

  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}
//Ends the drawing process if the mouse button is lifted
function stopDrawing() {
  if (drawing) {
    drawing = false;
    ctx.closePath();
  }
}
