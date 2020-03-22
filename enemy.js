class Enemy {
    MAXSPEED = 12;

    constructor(x, y, r = 16) {
        this.pos = createVector(x, y);
        this.r = r;
        this.velocity = this.chooseStartingVelocity()
    }

    chooseStartingVelocity(){
        let xv = 0;
        let yv = 0;
        let rand = random();
        if (rand > 0.5){
            xv += this.MAXSPEED * random(-1, 1)
        } else {
            yv += this.MAXSPEED * random(-1, 1)
        }
        return createVector(xv, yv)
    }

    update(){
        this.pos.add(this.velocity);
        // Check the edges
        if (this.pos.x >= windowWidth - (this.r / 2)){
            this.pos.x = (windowWidth - (this.r / 2));
            this.velocity.x *= -1
        }
        if (this.pos.x <= (this.r / 2)){
            this.pos.x = (this.r / 2);
            this.velocity.x *= -1;
        }
        if (this.pos.y >= windowHeight - (this.r / 2)){
            this.pos.y = (windowHeight - (this.r / 2));
            this.velocity.y *= -1;
        }
        if (this.pos.y <= (this.r / 2)){
            this.pos.y = (this.r / 2);
            this.velocity.y *= -1;

        }
    }

    show() {
        push();
        fill(190, 10, 10);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
        pop();
    }

    linkToOthers(enemies) {
        let distThreshold = 150;
        if (enemies.length > 0){
            push();
            for(let i = 0; i < enemies.length; i++) {
                let dis = this.pos.dist(enemies[i].pos);
                if (dis < distThreshold) {
                    stroke(255, 200, 200, map(dis, distThreshold, 0, 0, 150));
                    line(this.pos.x, this.pos.y, enemies[i].pos.x, enemies[i].pos.y);
                }
            }
            pop();
        }

    }

    skew(){
        let velX = Math.abs(this.velocity.x);
        let velY = Math.abs(this.velocity.y);
        let lowest = Math.min(velX, velY);
        if (lowest === velX){
            this.velocity.x += (random(-1, 1) * (this.MAXSPEED / 3))
        }
    }
}