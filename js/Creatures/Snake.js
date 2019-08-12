class Snake extends Creature {
  _size = 1;
  changeDirObj = {
    oldDir: -1
  };

  constructor(speed, x, y, width, height, hp, color) {
    super(speed, x, y, width, height, hp, color);

    this.initialSize = width;
  }
  
  get x() {
    return this._x;
  }
  
  get y() {
    return this._y; 
  }

  set x(value) {
    // BOUNCE
    if(this.x <= 0) this.dir = 1;
    else if(this.x >= windowWidth) this.dir = 3;

    this._x = value;

    // MOVEMENT
    if(this.changeDirObj.newDir === 0 || this.changeDirObj.newDir === 2) {
      if(this.changeDirObj.oldDir === 1) {
        if(this.x >= this.changeDirObj.x) {
          this.changeDir();
        }
      }
      else if(this.changeDirObj.oldDir === 3) {
        if(this.x <= this.changeDirObj.x) {
          this.changeDir();
        }
      }
    }
  }  
  
  set y(value) {
    // BOUNCE
    if(this.y <= 0) this.dir = 2;
    else if(this.y >= windowHeight) this.dir = 0;

    this._y = value;
    
    // MOVEMENT
    if (this.changeDirObj.newDir === 1 || this.changeDirObj.newDir === 3) {
      if(this.changeDirObj.oldDir === 0) {
        if(this.y <= this.changeDirObj.y) {
          this.changeDir();
        }
      }
      else if(this.changeDirObj.oldDir === 2) {
        if(this.y >= this.changeDirObj.y) {
          this.changeDir();
        }
      }
    }
  }

  changeDir() {
    this.dir = this.changeDirObj.newDir;
    this.changeDirObj = { oldDir: -1 };
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
    if(!this.child) this.createChild();
    else this.child.size = 1;
  }

  delay(oldDir, newDir, x, y) {
    this.changeDirObj = {oldDir, newDir, x, y};
  }
  
  createChild() {
    let x = this.x, y = this.y;
    if(this.dir === 0) y += this.initialSize;
    else if(this.dir === 1) x -= this.initialSize;
    else if(this.dir === 2) y -= this.initialSize;
    else if(this.dir === 3) x += this.initialSize;
    else if(this.dir === -1) x -= this.initialSize;
    this.child = new Snake(4, x, y, 20, 20);
    this.child.dir = this.dir;
  }

  get dir() {
    return this._dir;
  }

  set dir(value) {
    if(this.child) {
      this.child.delay(this._dir, value, this.x, this.y);
    }
    this._dir = value;
  }

  draw() {
    this.move();

    for(let i = 0; i < stones.length; i++) {
      if(this.x + this.width >= stones[i].x && 
        this.x <= stones[i].x + stones[i].width && 
        this.y + this.height >= stones[i].y && 
        this.y <= stones[i].y + stones[i].height) {
        
          this.dir = -1;
          ctx.font = "60px Arial";
          ctx.textAlign = "center";
          let txt = "GAME OVER";
          ctx.fillStyle = "red";
          ctx.fillText(txt, windowWidth/2, windowHeight/2);
      }
    }

    for(let i = 0; i < mice.length; i++) {
      if(this.x + this.width >= mice[i].x && 
        this.x <= mice[i].x + mice[i].width && 
        this.y + this.height >= mice[i].y && 
        this.y <= mice[i].y + mice[i].height) {
          this.size++;
          mice.splice(i, 1);
      }
    }

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    if(this.child) this.child.draw();
  }
}