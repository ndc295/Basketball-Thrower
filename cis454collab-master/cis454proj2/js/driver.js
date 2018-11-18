var scene, camera, renderer, sphere,cube;
var floor, ambientLight, directionalLight;
var controls;

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, 800/600, 10, 1000);

	//////////////
	//HAND DATA//
	/////////////
    var texture1 = new THREE.TextureLoader().load( "textures/balldimpled.png" );
    var material = new THREE.MeshBasicMaterial( { map: texture1 } );
    var geometry = new THREE.BoxGeometry(10,10,10);
	var cube1 = new THREE.Mesh(geometry, material);
   	var matrix = new THREE.Matrix4();
    matrix.set(
        20, 0, 0, 0,
        0, 20, 0, 0,
        0, 0, 20, 0,
        0, 0, 0, 1
    );
    cube1.geometry.applyMatrix(matrix);
    cube1.receiveShadow = true;
    cube1.castShadow = true;
    scene.add(cube1);

	////////////////
	//SPHERE DATA//
	//////////////
	var texture1 = new THREE.TextureLoader().load( "textures/balldimpled.png" );
	var material = new THREE.MeshBasicMaterial( { map: texture1 } );
	var geometry = new THREE.SphereGeometry(15,15,15);
	var sphere1 = new THREE.Mesh( geometry, material );
	sphere1.receiveShadow = true;
	sphere1.castShadow = true;
	sphere1.position.y += 15;
	sphere1.position.x += 0;
	scene.add(sphere1);
	
	var texture1 = new THREE.TextureLoader().load( "textures/balldimpled.png" );
	var material = new THREE.MeshBasicMaterial( { map: texture1 } );
	var geometry = new THREE.SphereGeometry(15,15,15);
	var sphere2 = new THREE.Mesh( geometry, material );
	sphere2.receiveShadow = true;
	sphere2.castShadow = true;
	sphere2.position.y += 15;
	sphere2.position.x += -35;
	scene.add(sphere2);
	
	var texture1 = new THREE.TextureLoader().load( "textures/balldimpled.png" );
	var material = new THREE.MeshBasicMaterial( { map: texture1 } );
	var geometry = new THREE.SphereGeometry(15,15,15);
	var sphere3 = new THREE.Mesh( geometry, material );
	sphere3.receiveShadow = true;
	sphere3.castShadow = true;
	sphere3.position.y += 15;
	sphere3.position.x += 35;
	scene.add(sphere3);
	////////////////
	//CUBE DATA///
	//////////////
	var texture2 = new THREE.TextureLoader().load( "textures/balldimpled.png" );
	var material = new THREE.MeshBasicMaterial( { map: texture2 } );
	var geometry = new THREE.BoxGeometry(10,400,10);
	var cube1 = new THREE.Mesh( geometry, material );
	cube1.position.y += 200;
	cube1.position.x += 0;
	cube1.position.z += 400;
	cube1.receiveShadow = true;
	cube1.castShadow = true;
	scene.add(cube1);
	
	////////////////
	//FLOOR DATA///
	//////////////	
	floor = new THREE.Mesh(
		new THREE.PlaneGeometry(1000,1000, 100,100),
		// use MeshPhongMaterial to react to lighting
		new THREE.MeshPhongMaterial({color:0x845c2a, wireframe:false})

		);
	floor.rotation.x -= Math.PI / 2;
	floor.receiveShadow = true;
	
	scene.add(floor);
	
	
	////////////////
	//LIGHTS DATA//
	//////////////
	ambientLight = new THREE.AmbientLight(0xffffff, 0.4);	//do not change color .2-.4 is best
	scene.add(ambientLight);
	
	directionalLight = new THREE.DirectionalLight(0xffffff, 0.8, 18);	//do not change color
	directionalLight.position.set(500,500,200);	//can vary, 50x50x50 too far, 25x25x25 not good, 10x10x10 seems good
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
	renderer.setSize(800, 600);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	document.body.appendChild(renderer.domElement);
	
	
	////////////////
	//CAMERA DATA//
	//////////////
	camera.position.set(0, 250, -50);
	camera.lookAt(new THREE.Vector3(150, 300, 150));
	scene.add(camera);
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	animate();
}

function animate(){
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
}
function reset(){	//reset camera view
	camera = new THREE.PerspectiveCamera(90, 800/600, 10, 1000);
	camera.position.set(20, 30, -5);
	camera.lookAt(new THREE.Vector3(0,15,0));
	scene.add(camera);
	controls = new THREE.OrbitControls(camera, renderer.domElement);
}
