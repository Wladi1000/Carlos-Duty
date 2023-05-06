// import WeponFire from "./classes/gunFire";
window.onload = () => {

  let canvas = document.getElementById('canvas');
  let c = canvas.getContext('2d');

  canvas.width = 1024;
  canvas.height = 576;

  c.fillRect(0, 0, canvas.width, canvas.height);

  let pistol = new WeponFire(1, 'Pistol 1919', 1, 1, 1, [], 250, 8, 80, 1, 350
  );

  let knife = new WeponMelee(11, 'Combat Knife', 3, 1, 1, [], 500, 5, 10
  );

  let player = new Player({ x: 200, y: 200 }, { xMovement: 0, yMovement: 0 }, 'red');

  const drawHUD = () => {
    console.clear();
    console.log(
      `
        Gun: ${pistol.name}
        wepon tier ${pistol.tier}
        cargador ${pistol.charger} / ${pistol.chargerCapacity}
        municion ${pistol.munition} / ${pistol.munitionCapacity}
        ---------------------------
        Melee Wepon: ${knife.name}
        wepon tier: ${knife.tier}
        durabilidad: ${knife.status} / ${knife.durability}
      `
    );
    return;
  }

  window.addEventListener('keydown', e => {

    switch (true) {
      case e.key.toUpperCase() === 'Q':
        pistol.shot();
        drawHUD();
        break;
      case e.key.toUpperCase() === 'R':
        pistol.reload();
        drawHUD();
        break;
      case e.key.toUpperCase() === 'L':
        pistol.levelUp(2, 4, (parseInt(pistol.chargerCapacity * 3)));
        drawHUD();
        break;
      case e.key.toUpperCase() === 'P':
        if (pistol.munition < pistol.munitionCapacity) {
          pistol.refillMunition();
          drawHUD();
        }
        break;
      case e.key.toUpperCase() === 'V':
        knife.attack(true);
        drawHUD();
        break;
      case e.key.toUpperCase() === 'K':
        knife.levelUp(2, 4);
        drawHUD();
        break;
      case e.key.toUpperCase() === 'W':
        player.movingUp = true;
        break;
      case e.key.toUpperCase() === 'D':
        player.movingRight = true;
        break;
      case e.key.toUpperCase() === 'S':
        player.movingDown = true;
        break;
      case e.key.toUpperCase() === 'A':
        player.movingLeft = true;
        break;

    };
  });

  window.addEventListener('keyup', e => {

    switch (true) {
      case e.key.toUpperCase() === 'W':
        player.movingUp = false;
        break;
      case e.key.toUpperCase() === 'D':
        player.movingRight = false;
        break;
      case e.key.toUpperCase() === 'S':
        player.movingDown = false;
        break;
      case e.key.toUpperCase() === 'A':
        player.movingLeft = false;
        break;
    };

  });

  const animate = () => {

    c.beginPath();
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fill();

    if (player.velocity.yMovement < 0) player.velocity.yMovement += player.stopForce;

    if (player.movingUp)
      player.velocity.yMovement += player.isRunning ? -player.movementRun : -player.movementWalk;
    player.checkVelocity();

    if (player.velocity.xMovement > 0) player.velocity.xMovement -= player.stopForce;

    if (player.movingRight) {
      player.velocity.xMovement += player.isRunning ? player.movementRun : player.movementWalk;
    }

    if (player.velocity.yMovement > 0) player.velocity.yMovement -= player.stopForce;

    if (player.movingDown)
      player.velocity.yMovement += player.isRunning ? player.movementRun : player.movementWalk;
    player.checkVelocity();

    if (player.velocity.xMovement < 0) player.velocity.xMovement += player.stopForce;

    if (player.movingLeft)
      player.velocity.xMovement -= player.isRunning ? player.movementRun : player.movementWalk;
    player.checkVelocity();

    player.checkVelocity();

    player.update(c);

    // c.clearRect(player.position.x, player.position.y, player.width, player.height);
    // c.clearRect(player.position.x, player.position.y, player.width, player.height);

    window.requestAnimationFrame(animate);
  };
  animate();

  drawHUD();
  console.log('Caja de arena iniciada');
};