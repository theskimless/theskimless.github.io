class Creature {
  _x = 0;
  _y = 0;
  _dir = -1;
  constructor(speed, x, y, width, height, hp, color) {
    this.hp = hp;
    this.color = color;
    this.width = width;
    this.height = height;
    this.speed = speed;

    this._x = x;
    this._y = y;
    this._dir = -1;
  }

  get dir() {
    return this._dir;
  }

  set dir(value) {
    this._dir = value;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y; 
  }

  set x(value) {
    this._x = value;
  }

  set y(value) {
    this._y = value;
  }

  move() {
    if(this.dir === 0) {
      this.y -= this.speed;
    }
    else if(this.dir === 1) {
      this.x += this.speed;
    }
    else if(this.dir === 2) {
      this.y += this.speed;
    }
    else if(this.dir === 3) {
      this.x -= this.speed;
    }
  }

  draw() {
    this.move();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}