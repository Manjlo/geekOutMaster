var modal = document.getElementById("idWelcome");
var btn = document.getElementById("idRoundButton");
var span = document.getElementsByClassName("close")[0];

window.onload = function() {
    modal.style.display = "block";
}

btn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}