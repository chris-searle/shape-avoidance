class Hero {
    constructor(x, y, r = 12, maxspeed= 10) {
        this.pos = createVector(x, y);
        this.r = r;
        this.speed = 1;
        this.vel = createVector();
        this.maxspeed = maxspeed;
    }

    applyForce(forceX, forceY){
        if (forceX !== 0 && forceY !==0){
            forceX *= 0.7;
            forceY *= 0.7;
        }
        this.vel.add(forceX * this.speed, forceY * this.speed);
        this.vel.limit(this.maxspeed)
    }

    update(){
        this.pos.add(this.vel);
        this.vel.mult(0.85);
        if (Math.abs(this.vel.x) < 0.5) {
            this.vel.x = 0
        }
        if (Math.abs(this.vel.y) < 0.5) {
            this.vel.y = 0
        }
        // Check the edges
        if (this.pos.x >= windowWidth - (this.r / 2)){
            this.pos.x = (windowWidth - (this.r / 2))
        }
        if (this.pos.x <= (this.r / 2)){
            this.pos.x = (this.r / 2)
        }
        if (this.pos.y >= windowHeight - (this.r / 2)){
            this.pos.y = (windowHeight - (this.r / 2))
        }
        if (this.pos.y <= (this.r / 2)){
            this.pos.y = (this.r / 2)
        }
    }

    show() {
        push();
        ellipse(this.pos.x, this.pos.y, this.r);
        pop();
    }
}