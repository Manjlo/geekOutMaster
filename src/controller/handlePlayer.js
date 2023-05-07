import Player from "../model/Player.js";
import { NUMBER_OF_PLAYERS } from "../utils/GameConstans.js";

function createInitialPlayers(playerNames) {
  if (NUMBER_OF_PLAYERS.length > 1) {
    const players = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      players.push(new Player(`Player ${playerNames[i]}`));
    }

    return players;
  }
  else if (NUMBER_OF_PLAYERS.length === 1) {
    return new Player(`Player ${playerNames[0]}`);
  }
}

export {
  createInitialPlayers
}