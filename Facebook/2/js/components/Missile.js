import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function Missile(sceneparam, x, y) {
	
	var modelLoader = new GLTFLoader();
	// Line 7 - 9 is undefined
	this.model;
	this.height;
	this.width;

	modelLoader.load( 
		"../../assets/models/missile/missile.gltf", 
		({scene}) => {
			this.model = scene;

			this.model.rotation.y = -Math.PI;

			this.model.position.set(x, y, -100);
			this.model.scale.set(0.5,0.5,0.5);

			sceneparam.add(this.model);

			var missileBndBox = new THREE.Box3().setFromObject(this.model);
			this.height = missileBndBox.getSize().y;
			this.width = missileBndBox.getSize().x;
		}
	)

	this.update = function() {
		if (this.model)
			this.model.position.y += 10;
	}
}

export default Missile;
