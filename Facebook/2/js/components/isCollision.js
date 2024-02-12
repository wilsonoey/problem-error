import 'three';

function isCollision(m1, m2) {
    // console.log(m1.model.position.__proto__.min)
    if (m1.model && m2.model) {
        var minX1 = m1.model.position.x - (m1.width/2);
        var maxX1 = m1.model.position.x + (m1.width/2);
        var minY1 = m1.model.position.y - (m1.height/2);
        var maxY1 = m1.model.position.y + (m1.height/2);

        var minX2 = m2.model.position.x - (m2.width/2);
        var maxX2 = m2.model.position.x + (m2.width/2);
        var minY2 = m2.model.position.y - (m2.height/2);
        var maxY2 = m2.model.position.y + (m2.height/2);

        if (minX1 <= maxX2 && maxX1 >= minX2 && minY1 <= maxY2 && maxY1 >= minY2)
            return true;
        else
            return false;
    }
    else
        return false;
}

export default isCollision;
