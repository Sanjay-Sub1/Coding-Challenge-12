//Gets controls from the webpage
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const toolButtons = document.querySelectorAll('input[name="tool"]');
const clearButton = document.getElementById('clearCanvas');

let drawing = false;
let startX = 0;
let startY = 0;
let currentTool = 'line';
let color = '#000000';

ctx.strokeStyle = color;
ctx.fillStyle = color;
//Changes the color based on the button
colorPicker.addEventListener('input', (event) => {
    color = event.target.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  });

//Updates the tool being used
toolButtons.forEach(button => {
  button.addEventListener('change', () => {
    currentTool = button.value;
  });
});

//Event listeners for the mouse
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
//Starts the drawing on the canvas
function startDrawing(event) {
  drawing = true;
  startX = event.offsetX;
  startY = event.offsetY;

  if (currentTool === 'brush') {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }
}

function draw(event) {
  if (!drawing) return;

  const currentX = event.offsetX;
  const currentY = event.offsetY;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
//Uses freeform
  switch (currentTool) {
    case 'brush':
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
      break;
//Uses the line tool
    case 'line':
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
      ctx.closePath();
      break;
//Uses the rectangle tool, creating a rectangle
    case 'rectangle':
      const width = currentX - startX;
      const height = currentY - startY;
      ctx.beginPath();
      ctx.rect(startX, startY, width, height);
      ctx.stroke();
      ctx.closePath();
      break;
//Uses the cirlce tool, creating a circle using math functions to get the radius
    case 'circle':
      const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
      ctx.beginPath();
      ctx.arc(startX, startY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
      break;
  }
}
//Stops the cursor from drawing on the canvas
function stopDrawing() {
  if (drawing) {
    drawing = false;
    ctx.closePath();
  }
}
