class Wepon{
  constructor(
    id,
    name,
    damage,
    multiplicatorDamage,
    tier,
    attachment,
    cost
  ){
    this.id = id;
    this.name = name;
    this.damage = damage;
    this.multiplicatorDamage = multiplicatorDamage;
    this.tier = tier;
    this.attachment = attachment;
    this.cost = cost;
    this.sellCost = parseInt( this.cost * 0.6 );
  };

  levelUp( damagePlus ){
    this.tier ++;
    this.damage += damagePlus;

    return;
  }

}