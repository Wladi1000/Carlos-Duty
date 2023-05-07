class Proyectile {
  constructor(
    position,
    velocity,
    radius,
    damage
  ){
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
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
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
    c.fill();
  };
}