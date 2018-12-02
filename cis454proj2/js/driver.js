var scene, camera, renderer,loader;
var floor, ambientLight, directionalLight;
var hand,fingers,ball1,ball3,ball3,pole,backboard,hoop,sky1,sky2,fence1,fence2,brick,startt,resett,startb,resetb;
var texture,material,geometry;
var clicked = false;
var sec = 60;
var scored=false;
var playerScore=0;
var highScore=playerScore;
var dayTime=0;
var nightTime=0;
var hasFallen=[];
var isGrabbed=[];
			var mouse = new THREE.Vector2(), INTERSECTED;
var message1= "Timer: 60";
var message2= "Score: 0";
var message3= "High Score: 0";
var tm1="Basketball Thrower Game";
var tm2="Click to throw the basketballs to score points before the time runs out!";
var textGeo1,textGeo2,textGeo3,title1,title2;
var raycaster,intersects,intersection;
var objects = [];
var sMenu = [];
var rMenu = [];
var clicked1=false;
var pos,obj;
var lastHighest=[];
function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 10, 1000);
	loader = new THREE.TextureLoader();
	raycaster = new THREE.Raycaster();
 
	
	//create scene and populate it
	createScene();
	
	//create lights 
	addLights();
	
	//create renderer
	setCanvas();
	
	//create camera
	setCamera();

	//set in game text
	setTimer();
	setScore();
	setHighScore();
	setTitle1();
	setTitle2();
	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );

	animate();
}
function setTitle1(){
	var loader = new THREE.FontLoader();
	loader.load('fonts/helvetiker_regular.typeface.json', function (font){
		var text = new THREE.TextGeometry(tm1, {
			font: font,
			size: 50,
			height: 3
		});
		var textMat = new THREE.MeshBasicMaterial({color: 0x000000});
		title1 = new THREE.Mesh(text, textMat);
		title1.position.x = 400;
		title1.position.z = 499;
		title1.position.y = 600;
		title1.rotateY(THREE.Math.degToRad(180));

		scene.add(title1);
	});
}
function setTitle2(){

	var loader = new THREE.FontLoader();
	loader.load('fonts/helvetiker_regular.typeface.json', function (font){
		var text = new THREE.TextGeometry(tm2, {
			font: font,
			size: 14,
			height: 3
		});
		var textMat = new THREE.MeshBasicMaterial({color: 0x000000});
		title2 = new THREE.Mesh(text, textMat);
		title2.position.x = 275;
		title2.position.z = 499;
		title2.position.y = 560;
		title2.rotateY(THREE.Math.degToRad(180));

		scene.add(title2);
	});
}
function setTimer( ){
	var loader = new THREE.FontLoader();
	loader.load('fonts/helvetiker_regular.typeface.json', function (font){
		var text = new THREE.TextGeometry(message1, {
			font: font,
			size: 30,
			height: 3
		});
		var textMat = new THREE.MeshBasicMaterial({color: 0x000000});
		textGeo1 = new THREE.Mesh(text, textMat);
		textGeo1.position.x = 450;
		textGeo1.position.z = 480;
		textGeo1.position.y = 850;
		textGeo1.rotateY(THREE.Math.degToRad(180));

		scene.add(textGeo1);
	});
}
function setScore( ){ 
	var loader = new THREE.FontLoader();
	loader.load('fonts/helvetiker_regular.typeface.json', function (font){
		var text = new THREE.TextGeometry(message2, {
			font: font,
			size: 30,
			height: 3
		});
		var textMat = new THREE.MeshBasicMaterial({color: 0x000000});
		textGeo2 = new THREE.Mesh(text, textMat);
		textGeo2.position.x = 450;
		textGeo2.position.z = 480;
		textGeo2.position.y = 800;
		textGeo2.rotateY(THREE.Math.degToRad(180));
		scene.add(textGeo2);
	});
 }
function setHighScore( ){ 
	var loader = new THREE.FontLoader();
	loader.load('fonts/helvetiker_regular.typeface.json', function (font){
		var text = new THREE.TextGeometry(message3, {
			font: font,
			size: 30,
			height: 3
		});
		var textMat = new THREE.MeshBasicMaterial({color: 0x000000});
		textGeo3 = new THREE.Mesh(text, textMat);
		textGeo3.position.x = 450;
		textGeo3.position.z = 480;
		textGeo3.position.y = 750;
		textGeo3.rotateY(THREE.Math.degToRad(180));

		scene.add(textGeo3);
	});
}
function setStart(){
	var loader = new THREE.FontLoader();
	loader.load('fonts/helvetiker_regular.typeface.json', function (font){
		var text = new THREE.TextGeometry("Start", {
			font: font,
			size: 30,
			height: 3
		});
		var textMat = new THREE.MeshBasicMaterial({color: 0xffffff});
		startt = new THREE.Mesh(text, textMat);
		startt.position.x = -150;
		startt.position.z = 498;
		startt.position.y = 835;
		startt.rotateY(THREE.Math.degToRad(180));

		scene.add(startt);
	});
}
function setReset(){
	var loader = new THREE.FontLoader();
	loader.load('fonts/helvetiker_regular.typeface.json', function (font){
		var text = new THREE.TextGeometry("Reset", {
			font: font,
			size: 30,
			height: 3
		});
		var textMat = new THREE.MeshBasicMaterial({color: 0xffffff});
		resett = new THREE.Mesh(text, textMat);
		resett.position.x = -350;
		resett.position.z = 498;
		resett.position.y = 835;
		resett.rotateY(THREE.Math.degToRad(180));

		scene.add(resett);
	});
}
function createScene(){
	/////////////
	//HAND DATA//
	////////////
	hand = new THREE.Group();
	fingers = new THREE.Group();
	var indexFinger = new THREE.Group();
	var middleFinger = new THREE.Group();
	var ringFinger = new THREE.Group();
	var pinkyFinger = new THREE.Group();
	var thumbFinger = new THREE.Group();
	
	
	geometry = new THREE.BoxGeometry(11,16,2);

	//var modifier = new THREE.SubdivisionModifier( 3 );
	//smooth=modifier.modify( geometry );
	palm = new THREE.Mesh( geometry );
	palm.receiveShadow = true;
	palm.castShadow = true;
	palm.position.y += 15;
	palm.position.x +=5.5;
	palm.material.color.setHex( 0xeac086 );

	hand.add(palm);
	//Palm is at (6,15,0)
				//x spans 0-18
				//y spans 1-23
	geometry = new THREE.CylinderGeometry(0.975,0.975,3.5,64);
	
	indexfinger1 = new THREE.Mesh( geometry );
	indexfinger1.receiveShadow = true;
	indexfinger1.castShadow = true;
	indexfinger1.position.y += 24.75;
	indexfinger1.position.x += 1;
	indexFinger.add(indexfinger1);
	indexfinger1.material.color.setHex( 0xeac086 );
	
	indexfinger2 = new THREE.Mesh( geometry );
	indexfinger2.receiveShadow = true;
	indexfinger2.castShadow = true;
	indexfinger2.position.y += 28.25;
	indexfinger2.position.x += 1;
	indexFinger.add(indexfinger2);
	indexfinger2.material.color.setHex( 0xeac086 );
	
	indexfinger3 = new THREE.Mesh( geometry );
	indexfinger3.receiveShadow = true;
	indexfinger3.castShadow = true;
	indexfinger3.position.y += 31.75;
	indexfinger3.position.x += 1;
	indexFinger.add(indexfinger3);
	indexfinger3.material.color.setHex( 0xeac086 );
	
	geometry = new THREE.CylinderGeometry(1,1,4,64);

	middlefinger1 = new THREE.Mesh( geometry );
	middlefinger1.receiveShadow = true;
	middlefinger1.castShadow = true;
	middlefinger1.position.y += 25;
	middlefinger1.position.x += 4;
	middleFinger.add(middlefinger1);
	middlefinger1.material.color.setHex( 0xeac086 );

	middlefinger2 = new THREE.Mesh( geometry );
	middlefinger2.receiveShadow = true;
	middlefinger2.castShadow = true;
	middlefinger2.position.y += 29;
	middlefinger2.position.x += 4;
	middleFinger.add(middlefinger2);
	middlefinger2.material.color.setHex( 0xeac086 );

	middlefinger3 = new THREE.Mesh( geometry );
	middlefinger3.receiveShadow = true;
	middlefinger3.castShadow = true;
	middlefinger3.position.y += 33;
	middlefinger3.position.x += 4;
	middleFinger.add(middlefinger3);
	middlefinger3.material.color.setHex( 0xeac086 );

	geometry = new THREE.CylinderGeometry(0.975,0.975,3.5,64);

	
	ringfinger1 = new THREE.Mesh( geometry );
	ringfinger1.receiveShadow = true;
	ringfinger1.castShadow = true;
	ringfinger1.position.y += 24.75;
	ringfinger1.position.x += 7;
	ringFinger.add(ringfinger1);
	ringfinger1.material.color.setHex( 0xeac086 );

	ringfinger2 = new THREE.Mesh( geometry );
	ringfinger2.receiveShadow = true;
	ringfinger2.castShadow = true;
	ringfinger2.position.y += 28.25;
	ringfinger2.position.x += 7;
	ringFinger.add(ringfinger2);
	ringfinger2.material.color.setHex( 0xeac086 );

	ringfinger3 = new THREE.Mesh( geometry );
	ringfinger3.receiveShadow = true;
	ringfinger3.castShadow = true;
	ringfinger3.position.y += 31.75;
	ringfinger3.position.x += 7;
	ringFinger.add(ringfinger3);
	ringfinger3.material.color.setHex( 0xeac086 );

	geometry = new THREE.CylinderGeometry(0.95,0.95,3.4,64);
	
	pinkyfinger1 = new THREE.Mesh( geometry );
	pinkyfinger1.receiveShadow = true;
	pinkyfinger1.castShadow = true;
	pinkyfinger1.position.y += 24.7;
	pinkyfinger1.position.x += 10;
	pinkyFinger.add(pinkyfinger1);
	pinkyfinger1.material.color.setHex( 0xeac086 );

	pinkyfinger2 = new THREE.Mesh( geometry );
	pinkyfinger2.receiveShadow = true;
	pinkyfinger2.castShadow = true;
	pinkyfinger2.position.y += 28.1;
	pinkyfinger2.position.x += 10;
	pinkyFinger.add(pinkyfinger2);
	pinkyfinger2.material.color.setHex( 0xeac086 );

	pinkyfinger3 = new THREE.Mesh( geometry );
	pinkyfinger3.receiveShadow = true;
	pinkyfinger3.castShadow = true;
	pinkyfinger3.position.y += 31.5;
	pinkyfinger3.position.x += 10;
	pinkyFinger.add(pinkyfinger3);
	pinkyfinger3.material.color.setHex( 0xeac086 );

	geometry = new THREE.CylinderGeometry(1.05,1.05,4.2,64);
	
	thumbfinger1 = new THREE.Mesh( geometry );
	thumbfinger1.receiveShadow = true;
	thumbfinger1.castShadow = true;
	thumbfinger1.position.y += 13;
	thumbfinger1.position.x += -1.5;
	thumbfinger1.rotateZ(THREE.Math.degToRad(45));
	thumbFinger.add(thumbfinger1);
	thumbfinger1.material.color.setHex( 0xeac086 );

	thumbfinger2 = new THREE.Mesh( geometry );
	thumbfinger2.receiveShadow = true;
	thumbfinger2.castShadow = true;
	thumbfinger2.position.y += 16;
	thumbfinger2.position.x += -4.55;
	thumbfinger2.rotateZ(THREE.Math.degToRad(45));
	thumbFinger.add(thumbfinger2);
	thumbfinger2.material.color.setHex( 0xeac086 );

	
	fingers.add(indexFinger);
	fingers.add(middleFinger);
	fingers.add(ringFinger);
	fingers.add(pinkyFinger);
	fingers.add(thumbFinger);

	hand.add(fingers);

	hand.rotateX(THREE.Math.degToRad(45));
	scene.add(hand);
	hand.position.x += 4;
	
	////////////////
	//BASKETBALL DATA//
	//////////////
	texture = new THREE.TextureLoader().load( "textures/balldimpled.png");
	material = new THREE.MeshBasicMaterial( { map: texture } );
	geometry = new THREE.SphereGeometry(15,15,15);
	
	ball1 = new THREE.Mesh( geometry, material );
	ball1.receiveShadow = true;
	ball1.castShadow = true;
	ball1.position.y += 15;
	ball1.position.x += 0;
	scene.add(ball1);

	ball2 = new THREE.Mesh( geometry, material );
	ball2.receiveShadow = true;
	ball2.castShadow = true;
	ball2.position.y += 15;
	ball2.position.x += -35;
	scene.add(ball2);
	
	ball3 = new THREE.Mesh( geometry, material );
	ball3.receiveShadow = true;
	ball3.castShadow = true;
	ball3.position.y += 15;
	ball3.position.x += 35;
	scene.add(ball3);

	ball4 = new THREE.Mesh( geometry, material );
	ball4.receiveShadow = true;
	ball4.castShadow = true;
	ball4.position.y += 15;
	ball4.position.x += 75;
	ball4.position.z += 10;
	scene.add(ball4);

	ball5 = new THREE.Mesh( geometry, material );
	ball5.receiveShadow = true;
	ball5.castShadow = true;
	ball5.position.y += 15;
	ball5.position.x += -75;
	ball5.position.z += 10;
	scene.add(ball5);

	////////////////
	//HOOP POLE DATA///
	//////////////

	geometry = new THREE.BoxGeometry(10,400,10);
	pole = new THREE.Mesh( geometry );
	pole.material.color.setHex( 0x303030  );

	pole.position.y += 200;
	pole.position.x += 0;
	pole.position.z += 400;
	pole.receiveShadow = true;
	pole.castShadow = true;
	scene.add(pole);
	
	////////////////
	//HOOP BACKBOARD DATA///
	//////////////
	texture = loader.load( "textures/backboard.jpg");
	var material = new THREE.MeshBasicMaterial( { map: texture } );
	geometry = new THREE.BoxGeometry(80,80,5);
	backboard = new THREE.Mesh( geometry,material );

	backboard.position.y += 390;
	backboard.position.x += 0;
	backboard.position.z += 395;
	backboard.receiveShadow = false;
	backboard.castShadow = true;
	scene.add(backboard);
	
	////////////////
	//HOOP DATA///
	//////////////
	geometry = new 	THREE.TorusGeometry( 18, 1,15,15 )
	hoop = new THREE.Mesh( geometry );
	hoop.material.color.setHex( 0x303030  );

	hoop.position.y += 370;
	hoop.position.x += 0;
	hoop.position.z += 375;
	hoop.receiveShadow = true;
	hoop.castShadow = true;
	hoop.rotateX(THREE.Math.degToRad(90));
	scene.add(hoop);
	
	////////////////
	//HITBOX DATA///
	//////////////
	
	///SCORING HITBOXES//////
	geometry = new 	THREE.BoxGeometry( 15, 1,15 )
	hitbox1 = new THREE.Mesh( geometry );
	hitbox1.material.color.setHex( 0xffffff  );
	hitbox1.position.y += 375;
	hitbox1.position.x += 0;
	hitbox1.position.z += 375;
	scene.add(hitbox1);
	
	geometry = new 	THREE.BoxGeometry( 15, 1,15 )
	hitbox2 = new THREE.Mesh( geometry );
	hitbox2.material.color.setHex( 0xffffff  );
	hitbox2.position.y += 365;
	hitbox2.position.x += 0;
	hitbox2.position.z += 375;
	scene.add(hitbox2);
	
	////////////////
	//FLOOR DATA///
	//////////////	
	var texture = loader.load( "textures/concrete-1024.jpg", function ( texture ) {
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.offset.set( 0, 0 );
		texture.repeat.set( 1, 1 );
	});

	var material = new THREE.MeshPhongMaterial( { map: texture } );
	var geometry = new THREE.BoxGeometry(1000,1000,1);
	var floor = new THREE.Mesh( geometry, material );
	floor.rotation.x -= Math.PI / 2;
	floor.receiveShadow = true;
	scene.add(floor);
	
	////////////////
	//WALL DATA///
	//////////////	
	//Brick wall
	texture = loader.load( "textures/bricks2.jpg", function ( texture ) {
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.offset.set( 0, 0 );
		texture.repeat.set(7, 7 );
	});

	
	material = new THREE.MeshBasicMaterial( { 
		//color: 0xffffff,
		//specular:0x111111,
		//shininess: 0,
		map: texture
	});
	geometry = new THREE.BoxGeometry(1000,1000,1);
	brick = new THREE.Mesh( geometry, material );
	brick.position.y += 500;
	brick.position.x += 0;
	brick.position.z += 500;
	brick.receiveShadow = true;
	brick.castShadow = false;

	scene.add(brick);
	
	//Chain fence left
	texture = loader.load( "textures/fence.jpg", function ( texture ) {
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.offset.set( 0, 0 );
		texture.repeat.set(1.5, 5 );
	});
	material = new THREE.MeshBasicMaterial( { 
		//color: 0xffffff,
		//specular:0x111111,
		//shininess: 1,
		map: texture 
	});
	geometry = new THREE.BoxGeometry(1,1000,200);
	fence1 = new THREE.Mesh( geometry, material );
	fence1.position.y += 100;
	fence1.position.x += 500;
	fence1.position.z += 0;
	fence1.receiveShadow = true;
	fence1.castShadow = true;
	fence1.rotateX(THREE.Math.degToRad(90));
	scene.add(fence1);
	
	//Chain fence right
	fence2 = new THREE.Mesh( geometry, material );
	fence2.position.y += 100;
	fence2.position.x += -500;
	fence2.position.z += 0;
	fence2.receiveShadow = true;
	fence2.castShadow = true;
	fence2.rotateX(THREE.Math.degToRad(90));
	scene.add(fence2);
	
	
	//sky left
	texture = loader.load( "textures/sky.jpg", function ( texture ) {

	});
	material = new THREE.MeshBasicMaterial( { 
		//color: 0xffffff,
		//specular:0x111111,
		//shininess: 10,
		map: texture 
	});
	geometry = new THREE.BoxGeometry(1,1000,800);
	sky1 = new THREE.Mesh( geometry, material );
	sky1.position.y += 600;
	sky1.position.x += 500;
	sky1.position.z += 0;
	sky1.receiveShadow=false;
	sky1.castShadow = false;
	sky1.rotateX(THREE.Math.degToRad(90));
	scene.add(sky1);

	//sky right
	sky2 = new THREE.Mesh( geometry, material );
	sky2.position.y += 600;
	sky2.position.x += -500;
	sky2.position.z += 0;
	sky2.receiveShadow=false;
	sky2.castShadow = false;
	sky2.rotateX(THREE.Math.degToRad(90));
	scene.add(sky2);
	/////////////
	///Buttons///
	/////////////
	geometry = new THREE.BoxGeometry(160,80,1);
	startb = new THREE.Mesh( geometry  );
	startb.material.color.setHex( 0x303030  );

	startb.position.y += 850;
	startb.position.x += -200;
	startb.position.z += 498;
	startb.receiveShadow = false;
	startb.castShadow = false;
	scene.add(startb);
	setStart();

	resetb = new THREE.Mesh( geometry  );
	resetb.material.color.setHex( 0x303030  );
	setReset();
	resetb.position.y += 850;
	resetb.position.x += -400;
	resetb.position.z += 498;
	resetb.receiveShadow = false;
	resetb.castShadow = false;
	scene.add(resetb);
	objects.push( ball1,ball2,ball3,ball4,ball5 );
  	for(var i=0;i<objects.length;i++){
		hasFallen[i]=true;
		isGrabbed[i]=false;
		lastHighest[i]=objects[i].position.y;
	}
	sMenu.push(startb);
	rMenu.push(resetb);

}
function addLights(){
	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);	//do not change color .2-.4 is best
	scene.add(ambientLight);
	
	directionalLight = new THREE.DirectionalLight(0xffffff, 0.8, 18);	//do not change color
	directionalLight.position.set(490,490,0);	//can vary,
	directionalLight.castShadow = true;
	directionalLight.shadow.camera.near = 0.1;
	directionalLight.shadow.camera.far = 2000;
	directionalLight.shadowCameraVisible = true;
	directionalLight.shadowCameraRight     =  500;
	directionalLight.shadowCameraLeft     = -500;
	directionalLight.shadowCameraTop      =  500;
	directionalLight.shadowCameraBottom   = -500;
	scene.add(directionalLight);
}
function setCamera(){
	camera.position.set(0, 175, -220);
	//camera.position.set(15, 15, -5);
	var position = new THREE.Vector3(0,200,490);
	camera.lookAt(position);
	scene.add(camera);
	//controls = new THREE.OrbitControls(camera, renderer.domElement);

}
function setCanvas(){
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	document.body.appendChild(renderer.domElement);
	
}
function animate() {
  requestAnimationFrame( animate );
  
  	for(var i=0;i<objects.length;i++){	//determine the bounce
		if(objects[i].position.y>15){
			if(hasFallen[i]<objects[i].position.y){
				lastHighest[i]=objects[i].position.y;
 			}
		}
	}
  	for(var i=0;i<objects.length;i++){	//determine whether or not to bounce
		if(objects[i].position.y>15){
			objects[i].position.y-=5;
		}else if(objects[i].position.y<=15){
			objects[i].position.y+=5;
  		}
	}
	

  render();
}
function render() {
  renderer.render( scene, camera );

}
function startClock() {
 	document.body.style.cursor = "none";
	scene.remove(title1);
	scene.remove(title2);
    if (clicked == false) {
		clicked = true;
		playerScore=0;
		dayTime=0;
		nightTime=0;
		sec=60;
		directionalLight.position.set(490,490,0);
		ambientLight.intensity=.2;
		message1="Timer: "+sec;
		scene.remove(textGeo1);
		setTimer();
		message2="Score: "+playerScore;
		scene.remove(textGeo2);
		setScore();
		message3="High Score: "+highScore;
		scene.remove(textGeo3);
		setHighScore();
        clock = setInterval("stopWatch()", 1000);
    }
    else if (clicked == true) {

    }
}
function stopWatch() {
    sec--;
	
	if(sec>30){ //start at .3, go to .5 by 30 seconds, then go back down to .2
		dayTime++;
		ambientLight.intensity=(.3+dayTime*.0067);
		directionalLight.position.set((490-16.33*dayTime),(490+7*dayTime),(0+8.3*dayTime));
	}else{
		nightTime++;
		ambientLight.intensity=(.5-nightTime*.021);
		directionalLight.intensity=.8-nightTime*.02;
		directionalLight.position.set((0-16.33*nightTime),(700-7*nightTime),(249-8.3*nightTime));

	}
	if(sec>0){
		if(scored==true){
			playerScore++;
			message2="Score: "+playerScore;
			scene.remove(textGeo2);
			setScore();
			scored=false;
		}
	}	
	if(sec==0){
		ambientLight.intensity=0;
		directionalLight.intensity= .3;
		dayTime=0;
		nightTime=0;
		stopClock();
	}
    message1="Timer: "+ sec;
	scene.remove(textGeo1);
	setTimer();
}
function stopClock() {
	document.body.style.cursor = "default";
    window.clearInterval(clock);
    sec = 60;
	if(playerScore>highScore){
		highScore=playerScore;
		message3="High Score: "+highScore;
		scene.remove(textGeo3);
		setHighScore();
	}

	scene.remove(textGeo1);
	message1="Timer: "+sec
	setTimer();
    clicked = false;
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
document.onmousemove = function(event){
	//event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

 // Make the sphere follow the mouse
	var vector = new THREE.Vector3(mouse.x, mouse.y, .5);
	vector.unproject( camera );
	var dir = vector.sub( camera.position ).normalize();
	var distance = - camera.position.z / dir.z;
	pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
	hand.position.copy(pos);
	hand.position.z-=25;
	hand.position.y-=20;
	
	if(clicked1){
 		obj.position.copy(pos);

	}

}

function onDocumentMouseDown( e ) {	//make the clicked1 var switch ON if it clicks a relevant object
	e.preventDefault();
 	  
	if(clicked1){
		clicked1=false;
	}else{
		raycaster.setFromCamera( mouse, camera );  
		intersects = raycaster.intersectObjects( objects );
		if(intersects.length>0){
			clicked1=true;
 			obj=intersects[ 0 ].object;
			obj.position.copy(pos);
		}

	}
	intersects = raycaster.intersectObjects( sMenu );
	if(intersects.length>0){
		startClock();
	}
	intersects = raycaster.intersectObjects( rMenu );
	if(intersects.length>0){
		stopClock();
	}
}