import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

function Spaceship(sceneparam) {
	
	var modelLoader = new OBJLoader();

	const textureLoader = new THREE.TextureLoader();
	var texMap = textureLoader.load("../../assets/textures/spaceship.png");
	var modelMaterial = new THREE.MeshBasicMaterial({ map: texMap});

	// Line 13 - 15 is undefined
	this.model;
	this.height;
	this.width;

	modelLoader.load( 
		"../../assets/models/spaceship.obj", 
		(scene) => {
			this.model = scene;
			this.model.traverse(function (child) {
				if ( child.isMesh ) {
					child.material = modelMaterial;
				}
			})

			this.model.rotation.x = -Math.PI / 2;
				
			sceneparam.add(this.model);

			var planeBndBox = new THREE.Box3().setFromObject(this.model);
			this.height = planeBndBox.getSize().y;
			this.width = planeBndBox.getSize().x;
		}
	);

	
	this.update = function() {
		if (this.model)
			this.model.position.y += 1;	
	}

	this.handleInput = function(keyMap, camera) {
		// console.log(this);
		if (keyMap[87]) {
			this.model.position.y += 5;
		}
		if (keyMap[83]) {
			this.model.position.y -= 5;
		}
		if (keyMap[68]) {
			this.model.position.x += 5;			
		}
		if (keyMap[65]) {
			this.model.position.x -= 5;
		}
	}

}

export default Spaceship;
