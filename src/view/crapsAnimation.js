const IMAGEONE = 'assets/avatar/meeple.png';
const IMAGETWO = 'assets/avatar/cohete.png';
const IMAGETHREE = 'assets/avatar/corazon.png';
const IMAGEFOUR = 'assets/avatar/dragon.png';
const IMAGEFIVE = 'assets/avatar/42.png';
const IMAGESIX = 'assets/avatar/superheroe.png';

var cube = document.querySelector('.cube');
var faces = [IMAGEONE, IMAGETWO, IMAGETHREE, IMAGEFOUR, IMAGEFIVE, IMAGESIX];
var randomNumber = Math.floor(Math.random() * 6);
cube.classList.add(faces[randomNumber]);

cube.addEventListener('click', function() 
{
    var interval = setInterval(function() 
    {
        var randomNumber = Math.floor(Math.random() * 6);
        cube.className = 'cube';
        cube.classList.add(faces[randomNumber]);
    }, 1000);
    setTimeout(function() 
    {
        clearInterval(interval);
    }, 5000);
});