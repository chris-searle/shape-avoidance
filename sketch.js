let hero;
let enemies = [];
let food;
let slowDowns = [];
let speedups = [];
let skews = [];
let collectedCount = 0;
let totalscore = 0;
let multiplier = 1;
let edgeSpawnBuffer = 16;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.style('margin', '0px');
    hero = new Hero(100,200);
    spawnEnemy();
    spawnFood();
}

function draw() {
    background(200);
    push();
    textSize(16);
    fill(50, 50, 50);
    text('SCORE ' + Math.round(totalscore), 10, 30);
    text(multiplier.toFixed(2) + 'x', 10, 50);
    pop();
    if (checkHeroToTargetCollision(hero, food)){
        foodCollected()
    }

    if (slowDowns.length > 0){
        for (let i = slowDowns.length -1; i >= 0; i--){
            if (checkHeroToTargetCollision(hero, slowDowns[i])){
                slowDownCollected();
                slowDowns.splice(i, 1);
            }
        }
    }

    if (speedups.length > 0){
        for (let i = speedups.length -1; i >= 0; i--){
            if (checkHeroToTargetCollision(hero, speedups[i])){
                speedupCollected();
                speedups.splice(i, 1);
            }
        }
    }

    if (skews.length > 0){
        for (let i = skews.length -1; i >= 0; i--){
            if (checkHeroToTargetCollision(hero, skews[i])){
                skewCollected();
                skews.splice(i, 1);
            }
        }
    }

    for (let i = 0; i < enemies.length; i++){
        if (checkHeroToTargetCollision(hero, enemies[i])){
            noLoop()
        }
    }

    forceX = 0;
    forceY = 0;
    if (keyIsDown(LEFT_ARROW)) {
        forceX --;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        forceX++
    }
    if (keyIsDown(UP_ARROW)) {
        forceY--
    }
    if (keyIsDown(DOWN_ARROW)) {
        forceY++
    }
    if (forceX || forceY){
        hero.applyForce(forceX, forceY);
    }
    hero.update();
    hero.show();
    food.update();
    food.show();
    for(let i = 0; i < enemies.length; i++) {
        enemies[i].update();
        enemies[i].linkToOthers(enemies.slice(i));
        enemies[i].show();
    }
    for(let i = 0; i < slowDowns.length; i++) {
        slowDowns[i].update();
        slowDowns[i].show();
    }
    for(let i = 0; i < speedups.length; i++) {
        speedups[i].update();
        speedups[i].show();
    }
    for(let i = 0; i < skews.length; i++) {
        skews[i].update();
        skews[i].show();
    }
}

function checkHeroToTargetCollision(hero, target){
    // return hero.pos.x < target.pos.x + (target.r) &&
    //     hero.pos.x + (hero.r) > target.pos.x &&
    //     hero.pos.y < target.pos.y + (target.r) &&
    //     hero.pos.y + (hero.r) > target.pos.y;
    return hero.pos.x + (hero.r / 2) > target.pos.x - (target.r / 2) &&
        hero.pos.x - (hero.r / 2) < target.pos.x + (target.r / 2) &&
        hero.pos.y + (hero.r / 2) > target.pos.y - (target.r / 2) &&
        hero.pos.y - (hero.r / 2) < target.pos.y + (target.r / 2);
}

function spawnEnemy(){
    enemies.push(new Enemy(windowWidth - hero.pos.x,windowHeight - hero.pos.y));
}

function spawnFood(){
    if(food === undefined){
        food = new Food(random(edgeSpawnBuffer , windowWidth - edgeSpawnBuffer), random(edgeSpawnBuffer, windowHeight - edgeSpawnBuffer))
    } else {
        food.pos = createVector(random(edgeSpawnBuffer , windowWidth - edgeSpawnBuffer), random(edgeSpawnBuffer, windowHeight - edgeSpawnBuffer))
    }
}

function foodCollected(){
    collectedCount ++;
    spawnEnemy();
    spawnFood();
    if (collectedCount % 3 === 0){
        spawnSlowDown();
    }
    if (collectedCount % 5 === 0){
        spawnSpeedUp();
    }
    if (collectedCount % 7 === 0){
        spawnSkew();
    }
    calculateScore()
}

function spawnSlowDown(){
    slowDowns.push(new SlowDown(random(edgeSpawnBuffer , windowWidth - edgeSpawnBuffer), random(edgeSpawnBuffer, windowHeight - edgeSpawnBuffer)))
}

function slowDownCollected(){
    multiplier -= 0.2;
    if (multiplier <= 0) {
        multiplier = 0.1
    }
    for (let i = 0; i < enemies.length; i++){
        enemies[i].velocity.mult(0.5);
    }
}

function spawnSpeedUp(){
    speedups.push(new SpeedUp(random(edgeSpawnBuffer , windowWidth - edgeSpawnBuffer), random(edgeSpawnBuffer, windowHeight - edgeSpawnBuffer)))
}

function speedupCollected(){
    multiplier +=0.5;
    for (let i = 0; i < enemies.length; i++){
        enemies[i].velocity.mult(1.5);
    }
}

function spawnSkew(){
    skews.push(new Skew(random(edgeSpawnBuffer , windowWidth - edgeSpawnBuffer), random(edgeSpawnBuffer, windowHeight - edgeSpawnBuffer)))
}

function skewCollected(){
    multiplier += 1;
    for (let i = 0; i < enemies.length; i++){
        enemies[i].skew();
    }
}

function calculateScore(){
    xscore = 0;
    yscore = 0;
    for (i = 0; i < enemies.length; i++){
        xscore += Math.abs(enemies[i].velocity.x);
        yscore += Math.abs(enemies[i].velocity.y);
    }
    addscore = (xscore + yscore) * multiplier;
    totalscore += addscore;
}

function mousePressed(){
    spawnSpeedUp()
    spawnSlowDown()
    spawnSkew()
}