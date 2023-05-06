// import Wepon from "./wepon";

class WeponFire extends Wepon{
  constructor(
    id,
    name,
    damage,
    multiplicatorDamage,
    tier,
    attachment,
    cost,
    chargerCapacity,
    munitionCapacity,
    shotCost,
    reloadDelay
  ){
    super(
      id,
      name,
      damage,
      multiplicatorDamage,
      tier,
      attachment,
      cost
    );
    this.charger = chargerCapacity;
    this.chargerCapacity = chargerCapacity;
    this.munition = munitionCapacity;
    this.munitionCapacity = munitionCapacity;
    this.shotCost = shotCost;
    this.reloadDelay = reloadDelay;
  };

  levelUp(damagePlus, chargerCapacityPlus, munitionCapacityPlus){
    super.levelUp(damagePlus);

    // More munition capacity
    this.chargerCapacity += chargerCapacityPlus;
    this.munitionCapacity += munitionCapacityPlus;

    // Refill munition
    this.charger = this.chargerCapacity;
    this.munition = this.munitionCapacity;
    
    return;
  };

  reload(){
    if ( this.charger === 0 ){
      if (this.munition <= this.chargerCapacity){
        this.charger = this.munition;
        this.munition = 0;

        return;
      }

      this.charger = this.chargerCapacity;
      this.munition -= this.chargerCapacity;

    } else if ( this.charger < this.chargerCapacity ){

      if ( this.munition <= this.chargerCapacity - this.charger ){
        this.charger += this.munition;
        this.munition = 0;

        return;
      }
      
      this.munition -= (this.chargerCapacity - this.charger);
      this.charger = this.chargerCapacity;

      return;
    }

    return;
  }

  shot(){
    this.charger -= this.shotCost;

    if ( this.charger <= 0){
      this.charger = 0;

      setTimeout(this.reload(), this.reloadDelay);
    };

    return;
  };

  refillMunition(){
    this.munition = this.munitionCapacity;
    
    return;
  }
}