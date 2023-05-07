
function calculateWin() {

}
function checkGameState(playState) {
  const activeRound = playState.rounds[playState.activeRound];
  if (activeRound.activeCraps.length === 0) {
    if (activeRound === playState.rounds.length - 1) {


      return playState;
    }

  }
}
