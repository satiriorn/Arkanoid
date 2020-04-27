var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");// Ну.. этаа... типа.. ну не знаю.. дайте по буду тупым дауном, так становится легче, ладно-ладно этааа типа Аблаботка канваса
var ballRadius = 10;//Слушайте, я быдло с хтз, радиус мяча лавняется десяти  у нас на хтз, есть только палки, камни, какие мячи и т.д.?? 
var x = canvas.width/2,  y = canvas.height-30;//так 6 строка, хорошая цифорка, так что стану нормальным, создание переменных в которых записано положение мяча 
var dx = 2, dy = -2; // двиэение мячика, включились мозги на пару минут, ВИИИИИИ
var brickRowCount = 3, brickColumnCount = 5, brickWidth = 75, brickHeight = 20, brickPadding = 10, brickOffsetTop = 30, brickOffsetLeft = 30, bricks = [];
var col=[get_random_color(),get_random_color(),get_random_color(),get_random_color(),get_random_color()];
var paddleHeight = 21, paddleWidth = 122;
var paddleX = (canvas.width-paddleWidth)/2, paddleY = 295;
var rightPressed = false, leftPressed = false;
var CountBricks=brickColumnCount*brickRowCount;
var n =0, score = 0;

function bool(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";//цвет
	ctx.fill();
	ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
	ctx.closePath();
}
function CountB(){
	for(c=0; c<brickColumnCount;c++){
		bricks[c]=[];
		for(r=0; r<brickRowCount;r++){
			bricks[c][r]={x:0, y:0,status:1};
			bricks[c][r].x = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			bricks[c][r].y = (r*(brickHeight+brickPadding))+brickOffsetTop;
			}
		}
}

function drawBricks(){
	for(c=0; c<brickColumnCount;c++){
		for(r=0; r<brickRowCount;r++){
			ctx.beginPath();
			ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
			ctx.fillStyle= col[r];
			ctx.fill();
			ctx.closePath();
		}
	}
}
function collisionDet(){
for(c=0;c<brickColumnCount;c++){
		for(r=0;r<brickRowCount;r++){
			var b=bricks[c][r];
			if(b.status==1){
				if(x>b.x&& x<b.x + brickWidth && y>b.y && y< b.y+brickHeight){ 
					dy = -dy;
					b.status=0;
					bricks[c][r] = "#FFF";
					CountBricks--;
					score++;
					}
				}
			}
		}
		
	}
	
function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score:"+score, 8, 20);
}
function get_random_color() {
	var letters = 'ABCDE'.split('');
    var color = '#';
    for (var i=0; i<3; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
	}
    return color;
}
function drawPad(){	
	ctx.beginPath();
	ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
	ctx.fillStyle = col[4];
	ctx.fill();
	ctx.closePath();	
	if(paddleX - 2 > canvas.width - paddleWidth) {
		paddleX = canvas.width - paddleWidth;
	}
	else if (paddleX + paddleWidth < paddleWidth)
	{
		paddleX = -paddleX;
	}
		
}
	
function app(){
	x += dx;
	y += dy;
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
	return dx = -dx;
	}
	if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
	return dy = -dy;
	}
		
	if(rightPressed){
		return paddleX +=5;
	}
	else if (leftPressed){
		return paddleX -=5;
		}
			
	if(y + dy < ballRadius) {
		return dy = -dy; 
	}
    else if(y + dy > canvas.height-ballRadius-15) {
    if(x + dx> paddleX && x < paddleX + paddleWidth) {
		return dy = -dy;				
		}
	}  
	if (CountBricks==0){
		alert("Евтушенко с тобой братишь");
		document.location.reload();
	}
		
	if(y + dy > canvas.height-ballRadius-7){
		y = canvas.height / 2;
		alert("Днище!");
		document.location.reload();	
	}
}
	
function draw() {//ЛИСОВАНИЕ 
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (n==0){	
		CountB();
		n++;
	}
	drawBricks();
	collisionDet();
	drawPad();
	drawScore();
	bool();
	app();
		
}
	
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandle,false);
	
function keyDownHandler(e) {
	if(e.keyCode== 39){
		rightPressed = true;
	}
	if(e.keyCode == 37){
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39){
		rightPressed = false;
	}
	else if(e.keyCode == 37){
		leftPressed = false;
	}	
}
function mouseMoveHandle(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if( relativeX < canvas.width && relativeX > 0 ){
		paddleX = relativeX;
	}
}
	
setInterval(draw, 10);//скорость движение
