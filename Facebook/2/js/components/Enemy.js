import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function Enemy(sceneparam, x, y) {
	var modelLoader = new GLTFLoader();
	console.log(`Enemy in line 11 is ${this.model}, ${this.height}, ${this.width}`);
	// this.model = new THREE.Mesh( geometry, material );

	this.model;
	this.height;
	this.width;

	modelLoader.load( 
		"../../assets/models/enemy/enemy.gltf", 
		({scene}) => {
			this.model = scene;

			this.model.rotation.x = Math.PI / 2;
			this.model.rotation.y = -Math.PI / 2;

			this.model.position.set(x, y, -100);
			this.model.scale.set(0.2,0.2,0.2);

			sceneparam.add(this.model);
			var enemyBndBox = new THREE.Box3().setFromObject(this.model);
			this.height = enemyBndBox.getSize().y;
			this.width = enemyBndBox.getSize().x;
		}
	)

	this.destroy = function() {
		sceneparam.remove(this.model);
	}
}

export default Enemy;
