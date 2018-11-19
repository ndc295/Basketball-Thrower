var scene, camera, renderer,loader;
var floor, ambientLight, directionalLight;
var controls;
var ball1,ball3,ball3,pole,backboard,hoop,sky1,sky2,fence1,fence2,brick;
var texture,material,geometry;
function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, .75*window.innerWidth/window.innerHeight, 10, 1000);
	loader = new THREE.TextureLoader();
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
	backboard.receiveShadow = true;
	backboard.castShadow = true;
	scene.add(backboard);
	
	////////////////
	//HOOP DATA///
	//////////////

	geometry = new THREE.SphereGeometry(15,10,15);
	hoop = new THREE.Mesh( geometry );
	hoop.material.color.setHex( 0xffffff  );

	hoop.position.y += 380;
	hoop.position.x += 0;
	hoop.position.z += 390;
	hoop.receiveShadow = true;
	hoop.castShadow = true;
	scene.add(hoop);
	
	
	////////////////
	//FLOOR DATA///
	//////////////	
	var texture = loader.load( "textures/concrete-1024.jpg", function ( texture ) {
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.offset.set( 0, 0 );
		texture.repeat.set( 1, 1 );
	});

	var material = new THREE.MeshBasicMaterial( { map: texture } );
	var geometry = new THREE.BoxGeometry(1000,1000,1);
	var floor = new THREE.Mesh( geometry, material );
	floor.rotation.x -= Math.PI / 2;
	floor.receiveShadow = true;
	floor.castShadow = true;
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
	brick.castShadow = true;
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
	sky1.receiveShadow = true;
	sky1.castShadow = true;
	sky1.rotateX(THREE.Math.degToRad(90));
	scene.add(sky1);

	//sky right
	sky2 = new THREE.Mesh( geometry, material );
	sky2.position.y += 600;
	sky2.position.x += -500;
	sky2.position.z += 0;
	sky2.receiveShadow = true;
	sky2.castShadow = true;
	sky2.rotateX(THREE.Math.degToRad(90));
	scene.add(sky2);
	
	////////////////
	//LIGHTS DATA//
	//////////////
	ambientLight = new THREE.AmbientLight(0xffffff, 0.5);	//do not change color .2-.4 is best
	scene.add(ambientLight);
	
	directionalLight = new THREE.DirectionalLight(0xffffff, 0.8, 18);	//do not change color
	directionalLight.position.set(500,500,500);	//can vary, 50x50x50 too far, 25x25x25 not good, 10x10x10 seems good
	directionalLight.castShadow = true;
	directionalLight.shadow.camera.near = 0.1;
	directionalLight.shadow.camera.far = 1000;
	directionalLight.shadowCameraVisible = true;
	directionalLight.shadowCameraRight     =  500;
	directionalLight.shadowCameraLeft     = -500;
	directionalLight.shadowCameraTop      =  500;
	directionalLight.shadowCameraBottom   = -500;
	scene.add(directionalLight);
	
	////////////////
	//CANVAS DATA//
	//////////////
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth*3/4, window.innerHeight*3/4 );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	document.body.appendChild(renderer.domElement);
	
	
	////////////////
	//CAMERA DATA//
	//////////////
	camera.position.set(0, 175, -220);
	var position = new THREE.Vector3(0,200,490);
	camera.lookAt(position);
	scene.add(camera);
	//controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	animate();
	startTimer();
}

function animate(){
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
}

var clicked = false;
var sec = 60;

var scored=false;
var playerScore=0;
var highScore=playerScore;

function startClock() {
    if (clicked === false) {
        clock = setInterval("stopWatch()", 1000);
        clicked = true;
		playerScore=0;
		document.getElementById("pscore").innerHTML="Your Score: "+playerScore;
    }
    else if (clicked === true) {


    }
}

function stopWatch() {
    sec--;
	if(sec>0){
		if(scored==true){
			playerScore++;
			document.getElementById("pscore").innerHTML="Your Score: "+playerScore;
			scored=false;
		}
	}
	if(sec==0){
		stopClock();
	}
    document.getElementById("timer").innerHTML ="Timer: "+ sec;
}

function stopClock() {
    window.clearInterval(clock);
    sec = 60;
	if(playerScore>highScore){
		highScore=playerScore;
		document.getElementById("pscore").innerHTML="High Score: "+highScore;
	}
    document.getElementById("timer").innerHTML=0;
    clicked = false;
}

