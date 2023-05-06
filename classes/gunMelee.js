// import Wepon from "./wepon";

class WeponMelee extends Wepon {
  constructor(
    id,
    name,
    damage,
    multiplicatorDamage,
    tier,
    attachment,
    cost,
    weponDistance,
    durability,
   ) {
    super(id,
      name,
      damage,
      multiplicatorDamage,
      tier,
      attachment,
      cost
    );
    this.weponDistance = weponDistance;
    this.status = durability;
    this.durability = durability;
  };

  levelUp(damagePlus, durabilityPlus) {
    super.levelUp(damagePlus);

    // More durability
    this.durability += durabilityPlus;

    // Repare wepon
    this.status = this.durability;
    return;
  }

  attack(acert) {

    acert = this.status !== 0? true : false;
    if (acert) {
      this.status--;

      return this.status <= 0? false : true;
    }
  };
};