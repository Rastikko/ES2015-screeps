function guard(creep) {
    let targets = creep.room.find(FIND_HOSTILE_CREEPS);

    if(targets.length) {
    	if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
    		creep.moveTo(targets[0]);
    	}
    } else {
      creep.moveTo(Game.flags.Flag1);
    }
}

export default guard;
