class Mouse extends Creature {
  constructor(speed, x, y, width, height, hp, color) {
    super(speed, x, y, width, height, hp, color);

    this.currentTime = Date.now();
    this.lastTime = this.currentTime;
    this.dir = 1;
  }
  
  get x() {
    return this._x;
  }

  get y() {
    return this._y; 
  }

  set x(value) {
    if(value + this.width > windowWidth) this.dir = 3;
    else if(value < 0) this.dir = 1;
    this._x = value;
  }

  set y(value) {
    if(value + this.height > windowHeight) this.dir = 0;
    else if(value < 0) this.dir = 2;
    this._y = value;
  }
  
  makeMove() {
    this.currentTime = Date.now();
    if(this.currentTime - this.lastTime > 1000) {
      let rand = Math.floor((Math.random() * 4));
      this.dir = rand;
      this.lastTime = this.currentTime;
    }
  }

  draw() {
    for(let i = 0; i < stones.length; i++) {
      if(this.x + this.width >= stones[i].x && 
        this.x <= stones[i].x + stones[i].width && 
        this.y + this.height >= stones[i].y && 
        this.y <= stones[i].y + stones[i].height) {
          if(this.dir === 3) this.dir++;
          else this.dir = 0;
      }
    }

    this.move();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}