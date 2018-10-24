var scene, camera, renderer, sphere,cube;
var floor, ambientLight, directionalLight;
var controls;

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, 800/600, 10, 1000);
	
	////////////////
	//SPHERE DATA//
	//////////////
	sphere = new THREE.Mesh(
		new THREE.SphereGeometry(5, 32, 32),		//size of object
		new THREE.MeshPhongMaterial({color:0x3172af, wireframe:false})	//color of object
	);
	sphere.position.y += 5;		//location in space coords
	sphere.position.x += -15;
	sphere.position.z += 0;
	sphere.receiveShadow = true;
	sphere.castShadow = true;
	scene.add(sphere);
	
	////////////////
	//CUBE DATA///
	//////////////
	cube = new THREE.Mesh(
		new THREE.BoxGeometry(5, 5, 5),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	cube.position.y += 5;
	cube.position.x += 0;
	cube.position.z += 20;
	cube.receiveShadow = true;
	cube.castShadow = true;
	scene.add(cube);
	
	////////////////
	//FLOOR DATA///
	//////////////	
	floor = new THREE.Mesh(
		new THREE.PlaneGeometry(100,100, 10,10),
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
	directionalLight.position.set(10,10,10);	//can vary, 50x50x50 too far, 25x25x25 not good, 10x10x10 seems good
	directionalLight.castShadow = true;
	directionalLight.shadow.camera.near = 0.1;
	directionalLight.shadow.camera.far = 50;
	directionalLight.shadowCameraVisible = true;
	directionalLight.shadowCameraRight     =  50;
	directionalLight.shadowCameraLeft     = -50;
	directionalLight.shadowCameraTop      =  50;
	directionalLight.shadowCameraBottom   = -50;
	
		
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
	camera.position.set(20, 30, -5);
	camera.lookAt(new THREE.Vector3(0,15,0));
	scene.add(camera);
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	animate();
}

function animate(){
	requestAnimationFrame(animate);
	
	sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.02;
	
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.02;
	
	renderer.render(scene, camera);
}
function reset(){	//reset camera view
	camera = new THREE.PerspectiveCamera(90, 800/600, 10, 1000);
	camera.position.set(20, 30, -5);
	camera.lookAt(new THREE.Vector3(0,15,0));
	scene.add(camera);
	controls = new THREE.OrbitControls(camera, renderer.domElement);
}
