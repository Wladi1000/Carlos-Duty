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

  function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return { //objeto
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top)
    }
  };

  function getDistance(x1, y1, x2, y2) {

    xDistance = x2 - x1;
    yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  };

  function setShotVelocity(percent, xNotion, yNotion) {
    let proyectileMovement = { xMovement: undefined, yMovement: undefined };

    proyectileMovement.xMovement = 20 * (percent / 100) * xNotion;
    proyectileMovement.yMovement = 20 * (1 - percent / 100) * yNotion;

    return proyectileMovement;
  };

  canvas.addEventListener("click", function (evt) {
    let mousePos = oMousePos(canvas, evt);

    let hipotenusa = getDistance(player.position.x, player.position.y, mousePos.x, mousePos.y);
    let catetoOpuesto = getDistance(player.position.x, player.position.y, mousePos.x, player.position.y);

    let angleRadianes = Math.asin(catetoOpuesto / hipotenusa);
    let angle = (angleRadianes * 90) / (Math.PI / 2);

    let percent = (angle * 100) / 90;
    let proyectileMovement;

    switch (true) {
      // Sector 3
      case (player.position.x >= mousePos.x && player.position.y <= mousePos.y):
        proyectileMovement = setShotVelocity(percent, -1, 1);
        break;

      // Sector 4
      case (player.position.x <= mousePos.x && player.position.y <= mousePos.y):
        proyectileMovement = setShotVelocity(percent, 1, 1);
        break;

      // Sector 1
      case (player.position.x <= mousePos.x && player.position.y >= mousePos.y):
        proyectileMovement = setShotVelocity(percent, 1, -1);
        break;

      // Sector 2
      case (player.position.x >= mousePos.x && player.position.y >= mousePos.y):
        proyectileMovement = setShotVelocity(percent, -1, -1);
        break;

    };
    pistol.shot(
      { x: player.position.x + (player.width / 2 - 10), y: player.position.y + (player.height / 2 - 10) },
      proyectileMovement,
      pistol.damage
    );

  }, false);

  const animate = () => {

    c.beginPath();
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fill();

    // ---------------------------------
    // Jugador
    // ---------------------------------
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

    // ---------------------------------
    // Proyectiles
    // ---------------------------------

    pistol.proyectiles.forEach(e => {
      if (
        e.position.x >= canvas.width ||
        e.position.y >= canvas.height ||
        e.position.x <= (- e.width) ||
        e.position.y <= (- e.height)
      ) {
        e.status = false;
      } else
        e.update(c);
    });

    pistol.proyectiles = pistol.proyectiles.filter(t => t.status);

    // c.clearRect(player.position.x, player.position.y, player.width, player.height);
    // c.clearRect(player.position.x, player.position.y, player.width, player.height);

    window.requestAnimationFrame(animate);
  };
  animate();

  drawHUD();
  console.log('Caja de arena iniciada');
};