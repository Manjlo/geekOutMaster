import {
  DELETE_DICE, DONT_POINT, POINT, ROLL_DICE_AGAIN, ROLL_DICE_FROM_INACTIVE, TURN_OFF_DICE
} from "../utils/actionTypes.js";
import { NUMBER_OF_CRAPS, NUMBER_OF_ROUNDS, NUMBER_OF_PLAYERS } from "../utils/GameConstans.js";
import Rule from "../model/Rule.js";
import Score from "../model/Score.js";
import Round from "../model/Round.js";
import Player from "../model/Player.js";
import Game from "../model/Game.js";
import { createInitialCraps } from "./Craps.js";
import { createRounds } from "./handleRound.js";
import { createInitialPlayers } from "./handlePlayer.js";



  const activeCrapsContainer = document.getElementById('idActiveCraps');
  const inactiveCrapsContainer = document.getElementById('idInactiveCraps');
  const useCrapsContainer = document.getElementById('idUsedCraps');
  const rollCrapsButton = document.getElementById('idRoundButton');
  const windowAlert = document.getElementById('window-alert');
  const scoreContainer = document.getElementById('idRoundScore');
  const roundContainer = document.getElementById('idRoundBoard');

function newAlert(message) {
  windowAlert.innerHTML = message;
  windowAlert.style.display = 'block';
}

function initGameController() {
  // Obtener el div contenedor donde se insertarán los dados

  //GAME OBJECTS
  const initialCraps = createInitialCraps(NUMBER_OF_CRAPS);
  const rounds = createRounds(initialCraps);
  const player = new Player('Player 1');
  const game = new Game(player, rounds);

  // Función que crea una el dado y le agrega el listener de click
  function createCrap(crap, onCrapClick) {
    // Crear el elemento de la carta
    const crapElement = document.createElement('div');
    crapElement.classList.add('crap');

    console.log(crap);

    // Agregar el contenido de la carta
    const imageSrc = `./assets/avatar/${crap.currentSide.avatar}.png`;
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.alt = crap.id;
    const crapElementDiv = document.createElement('div');
    crapElementDiv.classList.add('crapContainer');
    crapElementDiv.appendChild(imageElement);
    crapElement.appendChild(crapElementDiv);


    // Agregar el listener de click a el dado
    crapElement.addEventListener('click', () => {
      onCrapClick(crap);
    });

    return crapElement;
  }

  function updateView() {
    console.log(game.getState());
    // Eliminar todos los elementos hijos de los contenedores de los dados activos e inactivos
    activeCrapsContainer.innerHTML = '';
    inactiveCrapsContainer.innerHTML = '';
    useCrapsContainer.innerHTML = '';

    // Crear las cartas y agregarlas a los contenedores
    const activeCrapsElements = game.getState().activeRound.activeCraps.map((crap) => createCrap(crap, onCrapClick));
    activeCrapsElements.forEach(crapElement => activeCrapsContainer.appendChild(crapElement));

    const inactiveCrapsElements = game.getState().activeRound.inactiveCraps.map((crap) => createCrap(crap, onCrapClick));
    inactiveCrapsElements.forEach(crapElement => inactiveCrapsContainer.appendChild(crapElement));

    const useCrapsElements = game.getState().activeRound.usedCraps.map((crap) => createCrap(crap, onCrapClick));
    useCrapsElements.forEach(crapElement => useCrapsContainer.appendChild(crapElement));
    const puntajeCrap = game.getState().activeRound.puntajeCraps.maps((crap) => createCrap(crap, onCrapClick));
    puntajeCrap.forEach(crapElement => useCrapsContainer.appendChild(crapElement));

    const score = game.getState().activeRound.score;
    scoreContainer.innerHTML = score;
    const round = game.getState().activeRound.round;
    roundContainer.innerHTML = round;
  }
  // Habilitar el botón de lanzamiento de dados
  rollCrapsButton.classList.remove('disabled');

  function onCrapClick(crap) {
    if (game.getIsActiveAction()) {
      switch (crap.action) {
        case DELETE_DICE:
          game.getState().activeRound.moveCrapFromActiveToInactive(crap);
          break;
        case TURN_OFF_DICE:
          crap.turnOff();
          break;
        case ROLL_DICE_AGAIN:
          crap.roll();
          break;
        case ROLL_DICE_FROM_INACTIVE:
          game.getState().activeRound.moveCrapFromInactiveToActive(crap);
          break;
        case POINT:
          newAlert("no puedes accionar este dado")
          break;
        case DONT_POINT:
          newAlert("no puedes accionar este dado")
          break;
      }
      game.playState.setIsActiveAction(false);
      updateView();
    }
    if (game.getState().activeRound.activeCraps.every(crap => crap.action === POINT)) {
      game.getState().activeRound.moveCrapFromActiveToTablePoint(crap);
      updateView();
    }
    else {
      game.getState().activeRound.moveCrapFromActiveToUse(crap);
      crap.executeAction(game.getState());
      updateView();
    }
    game.checkGameState();
  }
  // Agregar el listener de click al botón de lanzamiento de dados

  rollCrapsButton.addEventListener('click', () => {
    const activeCraps = game.getState().activeRound.activeCraps;

    rollCrapsButton.classList.add('disabled');
    for (let i = 0; i < activeCraps.length; i++) {
      activeCraps[i].roll();
      crapActiveElements[i].classList.add('rolled');
    }

    setTimeout(() => {
      for (let i = 0; i < activeCraps.length; i++) {
        crapActiveElements[i].classList.remove('rolled');
      }
    }, 3000);

    updateView();
  });

  //GAME LOOP

  while (!game.getState().player.isLoser) {
    updateView();
    if (game.getState().player.isLoser)
      break;

  }


}

initGameController();
