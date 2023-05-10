import {
  DELETE_DICE, DONT_POINT, POINT, ROLL_DICE_AGAIN, ROLL_DICE_FROM_INACTIVE, TURN_OFF_DICE
} from "../utils/actionTypes.js";
import { NUMBER_OF_ROUNDS } from "../utils/GameConstans.js";
import Player from "../model/Player.js";
import Game from "../model/Game.js";
import { createInitialCraps } from "./Craps.js";
import { createRounds } from "./handleRound.js";
import { createInitialPlayers } from "./handlePlayer.js";

class GameController {
  constructor() {
    // Obtener los elementos de la vista
    this.activeCrapsContainer = document.getElementById('idActiveCraps');
    this.inactiveCrapsContainer = document.getElementById('idInactiveCraps');
    this.useCrapsContainer = document.getElementById('idUsedCraps');
    this.rollCrapsButton = document.getElementById('idRoundButton');
    this.windowAlert = document.getElementById('window-alert');
    this.scoreContainer = document.getElementById('idRoundScore');
    this.roundContainer = document.getElementById('idRoundBoard');
    this.soundRoll = document.getElementById('soundRoll');

    // Crear los objetos del juego
    const initialCraps = createInitialCraps();
    const rounds = createRounds(initialCraps);
    const player = new Player('Player 1');
    this.game = new Game(player, rounds);

    // Habilitar el botón de lanzamiento de dados
    this.rollCrapsButton.classList.remove('disabled');

    // Agregar el listener de click al botón de lanzamiento de dados
    this.rollCrapsButton.addEventListener('click', () => {
      this.onRollCrapsClick();
    });

    // Actualizar la vista inicial
    this.updateView();
  }

  createCrap(crap, onCrapClick) {
    // Crear el elemento del dado
    const crapElement = document.createElement('div');
    crapElement.classList.add('crap');

    // Crear la imagen del avatar del dado
    const imageSrc = `./assets/avatar/${crap.currentSide.avatar}.png`;
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.alt = crap.id;
    const crapElementDiv = document.createElement('div');
    crapElementDiv.classList.add('crapContainer');
    crapElementDiv.appendChild(imageElement);
    crapElement.appendChild(crapElementDiv);

    // Agregar el listener de click al dado
    crapElement.addEventListener('click', () => {
      onCrapClick(crap);
    });

    return crapElement;
  }

  updateView() {
    // Eliminar todos los elementos hijos de los contenedores de los dados activos e inactivos
    this.activeCrapsContainer.innerHTML = '';
    this.inactiveCrapsContainer.innerHTML = '';
    this.useCrapsContainer.innerHTML = '';


    const { activeAction, isActiveAction } = this.game.getState();

    // Crear los elementos de los dados y agregarlos a los contenedores correspondientes

    // Crear los elementos de los dados inactivos y activos y agregarlos al contenedor correspondiente

    let activeCrapsElements;
    let inactiveCrapsElements;
    if (activeAction === ROLL_DICE_FROM_INACTIVE && isActiveAction) {


      activeCrapsElements = this.game.getState().activeRound.activeCraps.map((crap) => this.createCrap(crap, this.dontUseThisCraps.bind(this)));
      inactiveCrapsElements = this.game.getState().activeRound.inactiveCraps.map((crap) => this.createCrap(crap, this.onCrapClick.bind(this)))

    } else {

      activeCrapsElements = this.game.getState().activeRound.activeCraps.map((crap) => this.createCrap(crap, this.onCrapClick.bind(this)));
      inactiveCrapsElements = this.game.getState().activeRound.inactiveCraps.map((crap) => this.createCrap(crap, this.dontUseThisCraps.bind(this)))
    }

    inactiveCrapsElements.forEach(crapElement => this.inactiveCrapsContainer.appendChild(crapElement));
    activeCrapsElements.forEach(crapElement => this.activeCrapsContainer.appendChild(crapElement));


    // Crear los elementos de los dados usados y agregarlos al contenedor correspondiente
    const usedCrapsElements = this.game.getState().activeRound.usedCraps.map((crap) => this.createCrap(crap));
    usedCrapsElements.forEach(crapElement => this.useCrapsContainer.appendChild(crapElement));

    // Actualizar la vista de la puntuación
    const score = this.game.getState().score;
    this.scoreContainer.innerHTML = `Puntuación: ${score.getScore()}`;

    // Actualizar la vista del tablero de la ronda
    const round = this.game.getState().activeRound;
    this.roundContainer.innerHTML = `Ronda ${round.roundNumber+1} / ${NUMBER_OF_ROUNDS}`;

    // Deshabilitar el botón de lanzamiento de dados si la ronda actual ya fue jugada
    if (round.played) {
      this.rollCrapsButton.classList.add('disabled');
    }
  }
  onCrapClick(crap) {
    const { activeRound, usedCraps, activeAction, isActiveAction } = this.game.getState();
    const { currentSide } = crap;

    // Ejecutar la regla correspondiente al dado seleccionado
    if (isActiveAction) {
      switch (activeAction) {
        case TURN_OFF_DICE:
          activeRound.turnOffCrap(crap);
          this.showAlert(`Dado ${crap.id} volteado`);
          break;
        case DELETE_DICE:
          activeRound.deleteCrap(crap);
          this.showAlert(`Dado ${crap.id} eliminado`);
          break;
        case ROLL_DICE_AGAIN:
          activeRound.rollAgain(crap);
          this.showAlert(`Dado ${crap.id} lanzado nuevamente`);
          break;
        case ROLL_DICE_FROM_INACTIVE:
          activeRound.rollFromInactive(crap);
          this.showAlert(`Dado ${crap.id} lanzado nuevamente desde zona inactiva`);
          break;

        default:
          break;
      }
      this.game.playState.setIsActiveAction(false)
    } else {
      const currentSide = crap.currentSide;
      if (!(currentSide.action === POINT || currentSide.action === DONT_POINT)) {
        const state = this.game.getState();
        const [isActiveAction, activeAction] = activeRound.useCrap(crap);
        this.game.setState({ ...state, isActiveAction: isActiveAction, activeAction: activeAction });

        this.showAlert(`Dado ${crap.id} usado`);
      }
      else {
        this.showAlert("Este dado no puede ser usado");
      }

    }

    console.log(this.game.getState());
    // Actualizar la vista
    this.updateView();
  }

  onRollCrapsClick() {
    const { activeRound } = this.game.getState();

    // Lanzar los dados de la ronda actual
    activeRound.rollCraps();

    // Actualizar la vista
    this.updateView();

    this.game.checkGameState();
    // Verificar si la ronda actual ya fue jugada
    if (activeRound.played) {
      // Obtener la puntuación de la ronda y agregarla al jugador actual
      // Actualizar la vista

      this.updateView();

      // Verificar si el juego ya terminó
      const player = this.game.getState().player;
      if (player.isWinner()) {
        alert(`¡El ganador es ${player.name} con ${this.game.getState().score} puntos!`);
      };

      if (player.isLoser()) {
        alert(`¡El perdedor es ${player.name} con ${this.game.getState().score} puntos!`);
      }

      // Eliminar vista, crear vista de fin de juego. añadir botón de reinicio

    }

  }
  dontUseThisCraps() {
    this.showAlert(`No puedes hacer nada con este dado`);
  }
  showAlert(message) {
    alert(message)
  }
}


export default GameController;