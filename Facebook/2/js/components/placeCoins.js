import Coin from './Coin.js';
import * as THREE from 'three';

function placeCoins(scene) {
	const theCoins = [];
	[...Array(10).keys()].map(y => {

		getRandomPositions().map(x => { 
			const c = new Coin(scene, 100*(x-7), 200*(y+1));
			console.log(`placeCoins in line 10 is ${c.width}, ${c.height}`);
			theCoins.push(c);
		});

	});

	return theCoins;

	function getRandomPositions() {

		var noCoins = Math.floor((Math.random() * 6));	
		
		var arr = [...Array(15).keys()];

		for (let i = arr.length - 1; i > 0; i--) {
		    
		    const j = Math.floor(Math.random() * i);
		    const temp = arr[i];
		    arr[i] = arr[j];
		    arr[j] = temp;
		}

		return arr.slice(0, noCoins);
    }

}

export default placeCoins;
