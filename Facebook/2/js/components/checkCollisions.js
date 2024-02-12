import isCollision from "./isCollision";

function checkCollisions(scene, theSpaceship, theCoins, theEnemies, theMissiles, score, health) {

    var i = theCoins.length;
    while (i--) {
        if (isCollision(theSpaceship, theCoins[i])) {
            score += 1;
            scene.remove(theCoins[i].model);
            theCoins.splice(i, 1);
            document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; SCORE: " + score; 
        } 
    }

    var i = theEnemies.length;
    while (i--) {
        if (isCollision(theSpaceship, theEnemies[i])) {
            health -= 1;
            scene.remove(theEnemies[i].model);
            theEnemies.splice(i, 1);
            document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; SCORE: " + score; 
        }

        var j = theMissiles.length;
        while (j--) {
            if (isCollision(theMissiles[j], theEnemies[i])) {
                score += 2;
                scene.remove(theEnemies[i].model);
                theEnemies.splice(i, 1);
                scene.remove(theMissiles[j].model);
                theMissiles.splice(j, 1);
                document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; SCORE: " + score; 
            } 
        }
    }

    return [theCoins, theEnemies, theMissiles, score, health];
    
}

export default checkCollisions;
