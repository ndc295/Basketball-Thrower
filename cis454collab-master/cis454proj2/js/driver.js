var scene, camera, renderer, sphere,cube;
var type = 0;
var palm, finger1prt1, finger1prt2, finger2prt1, finger2prt2, finger2prt3;
var finger3prt1, finger3prt2, finger3prt3, finger4prt1, finger4prt2, finger4prt3;
var finger5prt1, finger5prt2, finger5prt3;
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
	//HAND DATA///
	//////////////
	palm = new THREE.Mesh(
		new THREE.BoxGeometry(11, 3, 13),
		new THREE.MeshPhongMaterial({color:0x0047ab, wireframe:false})
	);
	palm.position.y += 20;
	palm.position.x += 0;
	palm.position.z += 19;
	palm.receiveShadow = true;
	palm.castShadow = true;
	scene.add(palm);
	
	finger1prt1 = new THREE.Mesh(
		new THREE.BoxGeometry(2, 2, 5),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger1prt1.position.y += 20;
	finger1prt1.position.x += -1;
	finger1prt1.position.z += 25;
	finger1prt1.receiveShadow = true;
	finger1prt1.castShadow = true;
	scene.add(finger1prt1);
	
	finger1prt2 = new THREE.Mesh(
		new THREE.BoxGeometry(2, 2, 5),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger1prt2.position.y += 20;
	finger1prt2.position.x += -1;
	finger1prt2.position.z += 27;
	finger1prt2.receiveShadow = true;
	finger1prt2.castShadow = true;
	scene.add(finger1prt2);
	
	finger2prt1 = new THREE.Mesh(
		new THREE.BoxGeometry(5, 2, 2),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger2prt1.position.y += 20;
	finger2prt1.position.x += -5;
	finger2prt1.position.z += 24;
	finger2prt1.receiveShadow = true;
	finger2prt1.castShadow = true;
	scene.add(finger2prt1);
	
	finger2prt2 = new THREE.Mesh(
		new THREE.BoxGeometry(5, 2, 2),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger2prt2.position.y += 20;
	finger2prt2.position.x += -10;
	finger2prt2.position.z += 24;
	finger2prt2.receiveShadow = true;
	finger2prt2.castShadow = true;
	scene.add(finger2prt2);
	
	finger2prt3 = new THREE.Mesh(
		new THREE.BoxGeometry(5, 2, 2),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger2prt3.position.y += 20;
	finger2prt3.position.x += -15;
	finger2prt3.position.z += 24;
	finger2prt3.receiveShadow = true;
	finger2prt3.castShadow = true;
	scene.add(finger2prt3);
	
	finger3prt1 = new THREE.Mesh(
		new THREE.BoxGeometry(5, 2, 2),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger3prt1.position.y += 20;
	finger3prt1.position.x += -5;
	finger3prt1.position.z += 21;
	finger3prt1.receiveShadow = true;
	finger3prt1.castShadow = true;
	scene.add(finger3prt1);
	
	finger3prt2 = new THREE.Mesh(
		new THREE.BoxGeometry(5, 2, 2),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger3prt2.position.y += 20;
	finger3prt2.position.x += -10;
	finger3prt2.position.z += 21;
	finger3prt2.receiveShadow = true;
	finger3prt2.castShadow = true;
	scene.add(finger3prt2);
	
	finger3prt3 = new THREE.Mesh(
		new THREE.BoxGeometry(5, 2, 2),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger3prt3.position.y += 20;
	finger3prt3.position.x += -15;
	finger3prt3.position.z += 21;
	finger3prt3.receiveShadow = true;
	finger3prt3.castShadow = true;
	scene.add(finger3prt3);
	
	finger4prt1 = new THREE.Mesh(
		new THREE.BoxGeometry(5, 2, 2),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger4prt1.position.y += 20;
	finger4prt1.position.x += -5;
	finger4prt1.position.z += 18;
	finger4prt1.receiveShadow = true;
	finger4prt1.castShadow = true;
	scene.add(finger4prt1);
	
	finger4prt2 = new THREE.Mesh(
		new THREE.BoxGeometry(5, 2, 2),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger4prt2.position.y += 20;
	finger4prt2.position.x += -10;
	finger4prt2.position.z += 18;
	finger4prt2.receiveShadow = true;
	finger4prt2.castShadow = true;
	scene.add(finger4prt2);
	
	finger4prt3 = new THREE.Mesh(
		new THREE.BoxGeometry(5, 2, 2),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger4prt3.position.y += 20;
	finger4prt3.position.x += -15;
	finger4prt3.position.z += 18;
	finger4prt3.receiveShadow = true;
	finger4prt3.castShadow = true;
	scene.add(finger4prt3);
	
	finger5prt1 = new THREE.Mesh(
		new THREE.BoxGeometry(5, 2, 2),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger5prt1.position.y += 20;
	finger5prt1.position.x += -5;
	finger5prt1.position.z += 15;
	finger5prt1.receiveShadow = true;
	finger5prt1.castShadow = true;
	scene.add(finger5prt1);
	
	finger5prt2 = new THREE.Mesh(
		new THREE.BoxGeometry(5, 2, 2),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger5prt2.position.y += 20;
	finger5prt2.position.x += -10;
	finger5prt2.position.z += 15;
	finger5prt2.receiveShadow = true;
	finger5prt2.castShadow = true;
	scene.add(finger5prt2);
	
	finger5prt3 = new THREE.Mesh(
		new THREE.BoxGeometry(5, 2, 2),
		new THREE.MeshPhongMaterial({color:0x019e16, wireframe:false})
	);
	finger5prt3.position.y += 20;
	finger5prt3.position.x += -15;
	finger5prt3.position.z += 15;
	finger5prt3.receiveShadow = true;
	finger5prt3.castShadow = true;
	scene.add(finger5prt3);

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

	typecamera(type);
	/*camera.position.set(20, 30, -5);
	camera.lookAt(new THREE.Vector3(0,15,0));
	scene.add(camera);
	controls = new THREE.OrbitControls(camera, renderer.domElement);*/

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
	typecamera(0);
}

function typecamera(type) //Set camera type
{
	
	////////////////
	//CAMERA DATA//
	//////////////
	if(type === 1)
	{
        camera = new THREE.OrthographicCamera( 100 / - 2, 100/ 2, 100 / 2, 100 / - 2, 1, 1000 );
		camera.position.set(20, 30, -5);
		camera.lookAt(new THREE.Vector3(0,15,0));
		scene.add(camera);
		controls = new THREE.OrbitControls(camera, renderer.domElement);
	}
	else
	{
		camera = new THREE.PerspectiveCamera(90, 800/600, 10, 1000);
		camera.position.set(20, 30, -5);
		camera.lookAt(new THREE.Vector3(0,15,0));
		scene.add(camera);
		controls = new THREE.OrbitControls(camera, renderer.domElement);
	}
	
}
