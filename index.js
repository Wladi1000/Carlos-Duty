// import WeponFire from "./classes/gunFire";
window.onload = () => {

  // Set canvas
  let canvas = document.getElementById('canvas');
  let c = canvas.getContext('2d');

  canvas.width = 1024;
  canvas.height = 576;

  c.fillRect(0, 0, canvas.width, canvas.height);

  // Initial Wepons
  let pistol = new WeponFire(1, 'Pistol 1919', 1, 1, 1, [], 250, 8, 80, 1, 2000);

  let knife = new WeponMelee(11, 'Combat Knife', 3, 1, 1, [], 500, 5, 10);

  // Wepons
  let starWepons = [pistol, knife];
  let weponsIndex = 0;

  // Player 
  let player = new Player({ x: 200, y: 200 }, { xMovement: 0, yMovement: 0 }, 'red');

  // Start Wepons
  starWepons.forEach(p => {
    player.wepons.push(p);
  });

  // Camera
  let cameraOffset = {
    xPosition: 0,
    yPosition: 0
  };

  const drawHUD = () => {

    console.clear();
    player.wepons.forEach(t => {

      if (t instanceof WeponFire) {
        console.log(
          `
            Gun: ${t.name}
            wepon tier ${t.tier}
            cargador ${t.charger} / ${t.chargerCapacity}
            municion ${t.munition} / ${t.munitionCapacity}
          `
        );
      } else
        console.log(
          `
            Melee Wepon: ${t.name}
            wepon tier: ${t.tier}
            durabilidad: ${t.status} / ${t.durability}
          `
        );

    });

    return;
  }

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

  canvas.addEventListener("click", (evt) => {

    if (player.wepons.length !== 0) {
      let mousePos = oMousePos(canvas, evt);

      let hipotenusa = getDistance(player.position.x + (player.width / 2), player.position.y + (player.height / 2), mousePos.x, mousePos.y);
      let catetoOpuesto = getDistance(player.position.x + (player.width / 2), player.position.y + (player.height / 2), mousePos.x, player.position.y + (player.height / 2));

      let angleRadianes = Math.asin(catetoOpuesto / hipotenusa);
      let angle = (angleRadianes * 90) / (Math.PI / 2);

      let percent = (angle * 100) / 90;
      let proyectileMovement;

      switch (true) {
        // Sector 3
        case (player.position.x + (player.width / 2) >= mousePos.x && player.position.y + (player.height / 2) <= mousePos.y):
          proyectileMovement = setShotVelocity(percent, -1, 1);
          break;

        // Sector 4
        case (player.position.x + (player.width / 2) <= mousePos.x && player.position.y + (player.height / 2) <= mousePos.y):
          proyectileMovement = setShotVelocity(percent, 1, 1);
          break;

        // Sector 1
        case (player.position.x + (player.width / 2) <= mousePos.x && player.position.y + (player.height / 2) >= mousePos.y):
          proyectileMovement = setShotVelocity(percent, 1, -1);
          break;

        // Sector 2
        case (player.position.x + (player.width / 2) >= mousePos.x && player.position.y + (player.height / 2) >= mousePos.y):
          proyectileMovement = setShotVelocity(percent, -1, -1);
          break;

      };


      console.log(`esto es melee?: ${knife instanceof WeponMelee}`);
      console.log(`esto es fire?: ${knife instanceof WeponFire}`);

      player.wepons[weponsIndex] instanceof WeponFire ?
        player.wepons[weponsIndex].shot(
          { x: player.position.x + (player.width / 2), y: player.position.y + (player.height / 2) },
          proyectileMovement,
          pistol.damage
        ) :
        player.wepons[weponsIndex].attack(true);
    } else {
      alert(`
        Usted no tiene armas para usar.
        Consigue una rapido!
      `);
    };

    drawHUD();
    console.log(player.wepons);
  }, false);

  window.addEventListener('keydown', e => {

    switch (true) {
      // Up move
      case e.key.toUpperCase() === 'W':
        player.movingUp = true;
        break;
      // Right move
      case e.key.toUpperCase() === 'D':
        player.movingRight = true;
        break;
      // Down move
      case e.key.toUpperCase() === 'S':
        player.movingDown = true;
        break;
      // Left move
      case e.key.toUpperCase() === 'A':
        player.movingLeft = true;
        break;
      // Running move
      case e.key.toUpperCase() === 'SHIFT':
        player.isRunning = true;
        break;
      // Change wepon
      case e.key.toUpperCase() === 'Q':
        weponsIndex = weponsIndex === 0 ? 1 : 0;
        drawHUD();
        break;
      // Reload fire wepons
      case e.key.toUpperCase() === 'R':
        if (player.wepons[weponsIndex] instanceof WeponFire) player.wepons[weponsIndex].reload();
        drawHUD();
        break;
      // Purchase ammo
      case e.key.toUpperCase() === 'P':
        player.wepons.forEach(t => {
          if (t instanceof WeponFire) {
            t.refillMunition();
            drawHUD();
          }
        });
        break;
      // Drop wepon selected
      case e.key.toUpperCase() === 'E':
        weponsIndex === 1 ?
          player.wepons.pop() :
          player.wepons.shift();
        weponsIndex = 0;
        break;
    };
    console.log(e.key.toLocaleUpperCase());
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
      // Running move
      case e.key.toUpperCase() === 'SHIFT':
        player.isRunning = false;
        break;
    };

  });

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

    //drawHUD();
    window.requestAnimationFrame(animate);
  };
  animate();

  drawHUD();
  console.log('Caja de arena iniciada');
};