class Proyectile {
  constructor(
    position,
    velocity,
    width,
    height,
    damage
  ){
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.damage = damage;
    this.status = true;
  };

  collision(){
    this.status = false;
  };

  update(c) {

    this.position.x += this.velocity.xMovement;
    this.position.y += this.velocity.yMovement;

    c.beginPath();
    c.fillStyle = 'yellow';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.fill();
  };
}