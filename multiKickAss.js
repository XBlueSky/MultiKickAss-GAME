	
	var startBtn = document.getElementById('start');
	var initial = document.getElementById('initial');
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
		startBtn.onclick = function(){
			this.style.display = 'none';
			initial.style.display = 'none';
			document.getElementById('instruction').style.display = 'block';
		}
		function hideinstrction(){
			document.getElementById('instruction').style.display = 'none';
			canvas.style.display = 'block';
		}
	
	//ass style
	var assCount = 1;
	var assWidth = 50;
	var assHeight = 50;

	//collision
	var assCollision = 0;
	var assCollision2 = 0;
	var collisionFlag = false;
	var collisionFlag2 = false;
	
	//friction
	var ax = Math.random()*0.5 + 0.5;
	
	//P1 ass position
	var assleX = canvas.height/2;
	var x = 1070;
	var vx = 5;
	var pooFlag = false;
	var assPower = 20;
	
	//P1 control
	var P1Flag = true;
	var rightPressed = false;
	var leftPressed = false;
	var topPressed = false;
	var downPressed = false;
	var pooPressed = false;
	
	//P1 ass position
	var assleX2 = canvas.height/2;
	var x2 = 80;
	var vx2 = 5;
	var pooFlag2 = false;
	var assPower2 = 20;
	
	//P2 control
	var P2Flag = false;
	var rightPressed2 = false;
	var leftPressed2 = false;
	var topPressed2 = false;
	var downPressed2 = false;
	var pooPressed2 = false;
	
	//score
	var score = 0;
	var score2 = 0;
	
	//ass initial
	var asses = [];
	for(i=0; i<=20; i++) {
			asses[i] = { x: 0, y: 0,v: 0, status: 0, vanish: 0 };
		}
	
	/*document.addEventListener("mousemove", mouseMoveHandler, false);
	function mouseMoveHandler(e) {
		var relativeX = e.clientX - canvas.offsetLeft;
		if(relativeX > 0 && relativeX < canvas.width) {
			paddleX = relativeX - paddleWidth/2;
		}
	}*/
	
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	function keyDownHandler(e) {
		switch(e.keyCode) {
			case 39:
				rightPressed = true;
				break;
			case 37:
				leftPressed = true;
				break;
			case 38:
				topPressed = true;
				break;
			case 40:
				downPressed = true;
				break;	
			case 13:
				pooPressed = true;
				break;		
			case 68:
				rightPressed2 = true;
				break;
			case 65:
				leftPressed2 = true;
				break;
			case 87:
				topPressed2 = true;
				break;
			case 83:
				downPressed2 = true;
				break;	
			case 16:
				pooPressed2 = true;
				break;	
		}
	}

	function keyUpHandler(e) {
		switch(e.keyCode) {
			case 39:
				rightPressed = false;
				break;
			case 37:
				leftPressed = false;
				break;
			case 38:
				topPressed = false;
				break;
			case 40:
				downPressed = false;
				break;	
			case 13:
				pooPressed = false;
				break;		
			case 68:
				rightPressed2 = false;
				break;
			case 65:
				leftPressed2 = false;
				break;
			case 87:
				topPressed2 = false;
				break;
			case 83:
				downPressed2 = false;
				break;	
			case 16:
				pooPressed2 = false;
				break;		
		}
	}
	
	function drawmap(){
		ctx.beginPath();
		ctx.rect(595, 0, 10, canvas.height);
		ctx.fillStyle = "#888888";
		ctx.fill();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.rect(70, 0, 10, canvas.height);
		ctx.fillStyle = "#DD0095";
		ctx.fill();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.rect(1120, 0, 10, canvas.height);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	
	}
	function storeass(x, y, i){
		var temp = asses[i];
		asses[i].x = x;
		asses[i].y = y;
		asses[i].status = 1;
	}
	function drawtotalass() {
		for(i=1; i<assCount; i++) {
			if(asses[i].vanish == 0){
				if(asses[i].status == 1){
					ctx.beginPath();
					ctx.rect(asses[i].x, asses[i].y, assWidth, assHeight);
					if(i%2 ==1)  
						ctx.fillStyle = "#0095DD";
					else if(i%2 ==0)	 
						ctx.fillStyle = "#DD0095";
					ctx.fill();
					ctx.closePath();
				}	
				else if(asses[i].status == 0){
					ctx.beginPath();
					ctx.rect(asses[i].x, asses[i].y, assWidth, assHeight);
					ctx.fillStyle = "#888888";
					ctx.fill();
					ctx.closePath();
				}	
			}
		}
	}

	function drawAss() {
		ctx.beginPath();
		ctx.rect(x, assleX, assWidth, assHeight);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}
	
	function drawAss2() {
		ctx.beginPath();
		ctx.rect(x2, assleX2, assWidth, assHeight);
		ctx.fillStyle = "#DD0095";
		ctx.fill();
		ctx.closePath();
	}
	
	function drawPower(){
		ctx.beginPath();
		ctx.moveTo(1130 , assleX);
		ctx.lineTo(1130+assPower , assleX+assHeight/2);
		ctx.lineTo(1130 , assleX+assHeight);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}
	function drawPower2(){
		ctx.beginPath();
		ctx.moveTo(70 , assleX2);
		ctx.lineTo(70-assPower2 , assleX2+assHeight/2);
		ctx.lineTo(70 , assleX2+assHeight);
		ctx.fillStyle = "#DD0095";
		ctx.fill();
		ctx.closePath();
	}
	

	function collisionDetection() {
		for(i=1; i<assCount; i++) {
			//if(asses[i].status == 1){
				if(x < asses[i].x+assWidth && x+assWidth > asses[i].x && assleX > asses[i].y-assHeight && assleX < asses[i].y+assHeight) {
					if(asses[i].status){
					asses[i].v = vx;
					vx = 0;
					assCollision = i;
					collisionFlag = true;
					break;
					}
					else{
					asses[i].vanish = 1;
					}
				}
			//}
			/*else{
				if(asses[assCollision].x < asses[i].x+assWidth && asses[assCollision].y > asses[i].y-assHeight && asses[assCollision].y < asses[i].y+assHeight && assCollision!=i) {
					asses[i].v = asses[assCollision].v;
					asses[assCollision].v = 0;
					assCollision = i;
				}
			}*/
		}
	}
	
	function collisionDetection2() {
		for(i=1; i<assCount; i++) {
			//if(asses[i].status == 1){
				if(x2 +assWidth > asses[i].x && x2 < asses[i].x+assWidth && assleX2 > asses[i].y-assHeight && assleX2 < asses[i].y+assHeight) {
					if(asses[i].status){
					asses[i].v = vx2;
					vx2 = 0;
					assCollision2 = i;
					collisionFlag2 = true;
					break;
					}
					else{
					asses[i].vanish = 1;
					}

				}
			//}
			/*else{
				if(asses[assCollision].x < asses[i].x+assWidth && asses[assCollision].y > asses[i].y-assHeight && asses[assCollision].y < asses[i].y+assHeight && assCollision!=i) {
					asses[i].v = asses[assCollision].v;
					asses[assCollision].v = 0;
					assCollision = i;
				}
			}*/
		}
	}
	
	function drawScore() {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		score = 0;
		for(i=1; i<assCount; i++) {
			if(asses[i].x+assWidth > 0 && asses[i].x < 80) score++;	
		}
		ctx.fillText("Score: "+score, 1140, 20);
		ctx.fillText("Rest: "+(10-Math.floor(assCount/2)), 610, 20);
		var friction = "";
		if(ax > 0.85) friction = "BIG";
		else if(ax > 0.65) friction = "MIDDLE";
		else friction = "SMALL";
		ctx.fillText(friction, 1140, canvas.height-20);		
	}
	
	function drawScore2() {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#DD0095";
		score2 = 0;
		for(i=1; i<assCount ; i++) {
			if(asses[i].x+assWidth > 1120 && asses[i].x < canvas.width) score2++;	
		}
		ctx.fillText("Score: "+score2, 5, 20);
		ctx.fillText("Rest: "+Math.floor(11-assCount/2), 530, 20);
		var friction = "";
		if(ax > 0.85) friction = "BIG";
		else if(ax > 0.65) friction = "MIDDLE";
		else  friction = "SMALL";
		ctx.fillText(friction, 5, canvas.height-20);		
	}
	
	function assclean(){
		for(i=0; i<=20; i++) {
			asses[i] = { x: 0, y: 0,v: 0, status: 0,vanish: 0 };
		}
		assCount = 1;
		score = 0;
		score2 = 0;
	}
	

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawmap();
		drawtotalass();
		
		//P1 ON
		if(P1Flag){
			drawAss();
			drawPower();
			collisionDetection();
		}
		
		//P2 ON
		if(P2Flag){
			drawAss2();
			drawPower2();
			collisionDetection2();

		}
		drawScore();
		drawScore2();
		
		/*collisionFlag = false;
		for(i=1; i<=20; i++) {
		if(asses[i].v > 0) collisionFlag = true;	
		}
		if(collisionFlag){
		asses[assCollision].x -= asses[assCollision].v;
		asses[assCollision].v -= ax; 
		if(asses[assCollision].v < 0) asses[assCollision].v = 0;
		}
		else assCollision = 0;*/

		
		if(collisionFlag){
			asses[assCollision].x -= asses[assCollision].v;
			asses[assCollision].v -= ax; 
			if(asses[assCollision].v < 0) {
				asses[assCollision].v = 0;
				asses[assCollision].status = 0;
				collisionFlag = false;		
			}
		}
		
		if(collisionFlag2){
			asses[assCollision2].x += asses[assCollision2].v;
			asses[assCollision2].v -= ax; 
			if(asses[assCollision2].v < 0) {
				asses[assCollision2].v = 0;
				asses[assCollision2].status = 0;
				collisionFlag2 = false;
			}
		}

			
		if(pooFlag && !collisionFlag && P1Flag){
			x -= vx;
			vx -= ax;
			if(vx < 0) {
				storeass(x, assleX, assCount);
				assleX = canvas.height/2;
				x = 1070;
				vx = 5;
				ax = 0.5;
				assCount++;
				P1Flag = false;
				P2Flag = true;
				pooFlag = false;
				ax = Math.random()*1.5;
			}
		}
		else if(!pooFlag && !collisionFlag && P1Flag){
			if(downPressed && assleX < canvas.height-assHeight) {
				assleX += 7;
			}
			else if(topPressed && assleX > 0) {
				assleX -= 7;
			}
			else if(rightPressed && 1130+assPower < canvas.width) {
				assPower += 1;
			}
			else if(leftPressed && assPower > 5) {
				assPower -= 1;
			}
			else if(pooPressed){
				pooFlag = true;
				vx += assPower/2;
			}
		}
		
		

			
		if(pooFlag2 && !collisionFlag2 && P2Flag){
			x2 += vx2;
			vx2 -= ax;
			if(vx2 < 0) {
				storeass(x2, assleX2, assCount);
				assleX2 = canvas.height/2;
				x2 = 80;
				vx2 = 5;
				ax2 = 0.5;
				assCount++;
				P2Flag = false;
				P1Flag = true;
				pooFlag2 = false;
				ax = Math.random()*1.5;
			}
		}
		else if(!pooFlag2 && !collisionFlag2 && P2Flag){
			if(downPressed2 && assleX2 < canvas.height-assHeight) {
				assleX2 += 7;
			}
			else if(topPressed2 && assleX2 > 0) {
				assleX2 -= 7;
			}
			else if(rightPressed2 && assPower2 > 5) {
				assPower2 -= 1;
			}
			else if(leftPressed2 && 70-assPower2 > 0) {
				assPower2 += 1;
			}
			else if(pooPressed2){
				pooFlag2 = true;
				vx2 += assPower2/2;
			}
		}
		
		if(assCount>20){
			if(score > score2){
			canvas.style.display = 'none';
			initial.style.display = 'block';
			startBtn.style.display = 'block';
            startBtn.innerHTML = 'Right Player WIN, replay?';
			
			}
			else if(score < score2){
			canvas.style.display = 'none';
			initial.style.display = 'block';
			startBtn.style.display = 'block';
            startBtn.innerHTML = 'Left Player WIN, replay?';
			}
			else{
			canvas.style.display = 'none';
			initial.style.display = 'block';
			startBtn.style.display = 'block';
            startBtn.innerHTML = 'Draw and replay?';			
			}
			assclean();
		}
		
		
		requestAnimationFrame(draw);
	}

	draw();
	//setInterval(draw, 10);