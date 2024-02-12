import Enemy from './Enemy.js';
import * as THREE from 'three';

function placeEnemies(scene) {

	const theEnemies = [];

	[...Array(5).keys()].map(y => {

		getRandomPositions().map(x => { 
			const e = new Enemy(scene, 200*(x-4), 400*(y+1));
			console.log(`placeEnemies in line 10 is ${e.destroy()}, ${e.model}, ${e.height}, ${e.width}`);
			theEnemies.push(e);
		});
	});

	return theEnemies;
	
	function getRandomPositions() {

		var noEnemies = Math.floor((Math.random() * 4));	
		
		var arr = [...Array(9).keys()];

		for (let i = arr.length - 1; i > 0; i--) {
		    
		    const j = Math.floor(Math.random() * i);
		    const temp = arr[i];
		    arr[i] = arr[j];
		    arr[j] = temp;
		}

		return arr.slice(0, noEnemies);
    }


}

export default placeEnemies;
