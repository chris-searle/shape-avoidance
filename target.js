const ShapeStyle = {
    CIRCLE: 0,
    REWIND: 1,
    FASTFORWARD: 2,
    SKEW: 3
};

class Target {
    constructor(x, y, colourR, colourG, colourB, shapeStyle, r = 16) {
        this.pos = createVector(x, y);
        this.r = r;
        this.emission = r;
        this.maxEmission = this.r * 8;
        this.colourR = colourR;
        this.colourG = colourG;
        this.colourB = colourB;
        this.shapeStyle = shapeStyle;
    }

    update() {
        this.emission += 0.4;
        if (this.emission > (this.maxEmission)) {
            this.emission = this.r;
        }
    }

    show() {
        switch (this.shapeStyle) {
            case ShapeStyle.CIRCLE:
                push();
                strokeWeight(1);
                stroke(0);
                noFill();
                stroke(this.colourR, this.colourG, this.colourB, map(this.emission, this.r, this.maxEmission, 255, 0));
                ellipse(this.pos.x, this.pos.y, this.emission);
                ellipse(this.pos.x, this.pos.y, (this.emission * 0.5));
                fill(this.colourR, this.colourG, this.colourB);
                ellipse(this.pos.x, this.pos.y, this.r);
                pop();
                break;
            case ShapeStyle.FASTFORWARD:
                push();
                noFill();
                stroke(this.colourR, this.colourG, this.colourB, map(this.emission, this.r, this.maxEmission, 255, 0));
                ellipse(this.pos.x - 2, this.pos.y, this.emission);
                ellipse(this.pos.x - 2, this.pos.y, (this.emission * 0.5));
                pop();
                push();
                strokeWeight(1);
                stroke(0);
                fill(this.colourR, this.colourG, this.colourB);
                translate(this.pos.x - (this.r / 2), this.pos.y - (this.r / 2));
                triangle(0, 0, this.r / 2, this.r / 2, 0, this.r);
                translate(this.r / 2, 0);
                triangle(0, 0, this.r / 2, this.r / 2, 0, this.r);
                pop();
                break;
            case ShapeStyle.REWIND:
                push();
                noFill();
                stroke(this.colourR, this.colourG, this.colourB, map(this.emission, this.r, this.maxEmission, 0, 255));
                ellipse(this.pos.x + 1, this.pos.y, this.maxEmission - this.emission);
                ellipse(this.pos.x + 1, this.pos.y, (this.maxEmission -this.emission) * 0.5);
                pop();
                push();
                strokeWeight(1);
                stroke(0);
                fill(this.colourR, this.colourG, this.colourB);
                translate(this.pos.x - (this.r / 2), this.pos.y - (this.r / 2));
                triangle(this.r / 2, 0, 0, this.r / 2, this.r / 2, this.r);
                translate(this.r / 2, 0);
                triangle(this.r / 2, 0, 0, this.r / 2, this.r / 2, this.r);
                pop();
                break;
            case ShapeStyle.SKEW:
                let shake = 10;
                push();
                noFill();
                stroke(this.colourR, this.colourG, this.colourB, map(this.emission, this.r, this.maxEmission, 255, 0));
                ellipse(this.pos.x , this.pos.y, this.emission + random(- this.r / shake, this.r / shake));
                ellipse(this.pos.x, this.pos.y, (this.emission * 0.5) + random(- this.r / shake, this.r / shake) );
                pop();
                push();
                translate(this.pos.x, this.pos.y);
                fill(this.colourR, this.colourG, this.colourB);
                beginShape();
                    for(let i = 0; i < TWO_PI; i++){
                        let x = (this.r / 2) * cos(i) + random(- this.r / shake, this.r / shake);
                        let y = (this.r / 2) * sin(i) + random(- this.r / shake, this.r / shake);
                        vertex(x,y)
                    }
                endShape(CLOSE);
                pop();
                break;

        }
    }
}

class Food extends Target {
    constructor(x, y) {
        super(x, y, 40, 170, 40, ShapeStyle.CIRCLE);
    }
}

class SlowDown extends Target {
    constructor(x, y) {
        super(x, y, 0, 110, 255, ShapeStyle.REWIND);
    }
}

class SpeedUp extends Target {
    constructor(x, y) {
        super(x, y, 255, 110, 0, ShapeStyle.FASTFORWARD);
    }
}

class Skew extends Target {
    constructor(x, y) {
        super(x, y, 180, 100, 180, ShapeStyle.SKEW, 20);
    }
}
