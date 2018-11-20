var scene, camera, renderer,loader;
var floor, ambientLight, directionalLight;
var controls;
var ball1,ball3,ball3,pole,backboard,hoop,sky1,sky2,fence1,fence2,brick;
var texture,material,geometry;
var targetList = [];

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, .75*window.innerWidth/window.innerHeight, 10, 1000);
	loader = new THREE.TextureLoader();
	////////////////
	//BASKETBALL DATA//
	//////////////
	texture = new THREE.TextureLoader().load( "textures/balldimpled.png");
	material = new THREE.MeshPhongMaterial( { map: texture } );
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
	brick.receiveShadow = false;
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
	fence1.receiveShadow = false;
	fence1.castShadow = true;
	fence1.rotateX(THREE.Math.degToRad(90));
	scene.add(fence1);
	
	//Chain fence right
	fence2 = new THREE.Mesh( geometry, material );
	fence2.position.y += 100;
	fence2.position.x += -500;
	fence2.position.z += 0;
	fence2.receiveShadow = false;
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
	
	////////////////
	//LIGHTS DATA//
	//////////////
	ambientLight = new THREE.AmbientLight(0xffffff, 0.3);	//do not change color .2-.4 is best
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
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  renderer.render( scene, camera );
}

var clicked = false;
var sec = 60;

var scored=false;
var playerScore=0;
var highScore=playerScore;

function startClock() {
    if (clicked === false) {
		clicked = true;
		playerScore=0;
		dayTime=0;
		nightTime=0;
		sec=60;
		//ambientLight.intensity(.9);
		directionalLight.position.set(490,490,0);
		document.getElementById("pscore").innerHTML="Your Score: "+playerScore;
		
        clock = setInterval("stopWatch()", 1000);
       
    }
    else if (clicked === true) {

    }
}
var dayTime=0;
var nightTime=0;
function stopWatch() {
    sec--;
	
	if(sec>30){ //start at .3, go to .5 by 30 seconds, then go back down to .2
		dayTime++;
		//ambientLight.intensity(	.3+dayTime*.0067);
		directionalLight.position.set((490-16.33*dayTime),(490+7*dayTime),(0+8.3*dayTime));
	}else{
		nightTime++;
		//ambientLight.intensity(.5-nightTime*.01);
		directionalLight.position.set((0-16.33*nightTime),(700-7*nightTime),(249-8.3*nightTime));

	}
	if(sec>0){
		if(scored==true){
			playerScore++;
			document.getElementById("pscore").innerHTML="Your Score: "+playerScore;
			scored=false;
		}
	}
	animate();

	
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


function onDocumentMouseDown( event ) 
{
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	// event.preventDefault();
	
	console.log("Click.");
	
	// update the mouse variable
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	// find intersections
	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	projector.unprojectVector( vector, camera );
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	// create an array containing all objects in the scene with which the ray intersects
	var intersects = ray.intersectObjects( targetList );
	
	// if there is one (or more) intersections
	if ( intersects.length > 0 )
	{
		console.log("Hit @ " + toString( intersects[0].point ) );
		// change the color of the closest face.
		intersects[ 0 ].face.color.setRGB( 0.8 * Math.random() + 0.2, 0, 0 ); 
		intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
	}
}