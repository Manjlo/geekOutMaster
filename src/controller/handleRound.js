import Round from '../model/Round.js';
import { NUMBER_OF_ROUNDS } from '../utils/GameConstans.js';


function createRounds( initialCraps) {
  const rounds = [];
  for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
    rounds.push(new Round(i, initialCraps));
  }
  return rounds;
}


export {
  createRounds
}