class Player {
  constructor(
    position,
    velocity = { xMovement: 0, yMovement: 0 },
    color = 'red',
    scale,
    attackBox = { offset: {}, width: undefined, height: undefined }
  ) {
    this.position = position;
    this.velocity = velocity;

    this.isMovingUp = false;
    this.isMovingRight = false;
    this.isMovingDown = false;
    this.isMovingLeft = false;

    this.height = 50;
    this.width = 50;

    this.movementWalk = 5;
    this.movementRun = 10;

    this.stopForce = 1;

    this.movingUp = false;
    this.movingRight = false;
    this.movingDown = false;
    this.movingLeft = false;

    this.isRunning = false;

    this.color = color;
    this.healt = 100;
    this.death = false;

    this.wepons = [];
  };

  checkVelocity() {
    if (this.isRunning) {
      if (this.velocity.xMovement > this.movementRun) {
        this.velocity.xMovement = this.movementRun;
      };
      if (this.velocity.xMovement < -this.movementRun) {
        this.velocity.xMovement = -this.movementRun;
      };
      if (this.velocity.yMovement > this.movementRun) {
        this.velocity.yMovement = this.movementRun;
      };
      if (this.velocity.yMovement < -this.movementRun) {
        this.velocity.yMovement = -this.movementRun;
      };
    } else {
      if (this.velocity.xMovement > this.movementWalk) {
        this.velocity.xMovement = this.movementWalk;
      };
      if (this.velocity.xMovement < -this.movementWalk) {
        this.velocity.xMovement = -this.movementWalk;
      };
      if (this.velocity.yMovement > this.movementWalk) {
        this.velocity.yMovement = this.movementWalk;
      };
      if (this.velocity.yMovement < -this.movementWalk) {
        this.velocity.yMovement = -this.movementWalk;
      };
    }
    return;
  };

  isMovingUp() {
    if (this.velocity.yMovement < 0) this.velocity.yMovement += this.stopForce;

    if (this.movingUp)
      this.velocity.yMovement += this.isRunning ? -this.movementRun : -this.movementWalk;
    this.checkVelocity();
    
  };

  isMovingRight() {
    console.log('moviendome');
    if (this.velocity.xMovement > 0) this.velocity.xMovement -= this.stopForce;
    
    if (this.movingRight){
      this.velocity.xMovement += this.isRunning ? this.movementRun : this.movementWalk;
      console.log('moviendome');
    }
    this.checkVelocity();
  };
  isMovingDown() {
    if (this.velocity.yMovement > 0) this.velocity.yMovement -= this.stopForce;

    if (this.movingDown)
      this.velocity.yMovement += this.isRunning ? this.movementRun : this.movementWalk;
    this.checkVelocity();
    
  };
  isMovingLeft() {
    if (this.velocity.xMovement < 0) this.velocity.xMovement += this.stopForce;

    if (this.movingLeft)
      this.velocity.xMovement -= this.isRunning ? this.movementRun : this.movementWalk;
    this.checkVelocity();
    
  };

  update(c) {

    this.position.x += this.velocity.xMovement;
    this.position.y += this.velocity.yMovement;

    c.beginPath();
    c.fillStyle = 'red';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.fill();
  };

};