class Player {
  constructor(
    position,
    velocity = { xMovement: 0, yMovement: 0 },
    color = 'blue',
    roundScale,
    attackBox = { offset: {}, width: undefined, height: undefined }
  ) {
    this.position = position;
    this.velocity = velocity;

    this.height = 30;
    this.width = 30;

    this.movementWalk = 5;
    this.movementRun = 12;

    this.isRunning = false;

    this.color = color;
    this.healt = 100 * roundScale;
    this.death = false;
  };
};