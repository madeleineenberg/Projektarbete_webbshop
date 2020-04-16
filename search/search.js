let searchedGames = document.querySelector("#searched-games");
let searchField = document.querySelector("#search-Field");

// anropa ajax
let ajax = new XMLHttpRequest();
//let url = "read.php";
ajax.open("GET", "read.php", true);
//skicka ajax request
ajax.send();
//ta emot svar från php fil
ajax.onreadystatechange = function () {
  //console.log(this.readyState);
  if (this.readyState === 4 && this.status === 200) {
    //konvertera JSON tillbaka till array
    let games = JSON.parse(this.responseText);

    let gamesTitle = new Array();

    for (let i = 0; i < games.length; i++) {
      //console.log(games[i].title)
      gamesTitle.push(games[i].title);
    }

    console.log(gamesTitle);

    //eventlistener på sökfältt
    searchField.addEventListener("input", function (event) {
      //minst två tecken validering
      if (searchField.value.length >= 2) {
        display();
      } else {
        searchedGames.innerHTML = null;
      }
    });
    //filtrerar och visar spelen som matchar sökningen
    function display() {
      let searchedGame = gamesTitle.filter(function (game) {
        return game.toLowerCase().includes(searchField.value.toLowerCase());
      });
      //console.log(searchedGame)

      for (let i = 0; i < games.length; i++) {
        console.log(searchedGame);
        console.log(games[i].title);
      }

      /* searchedGames.innerHTML = ''
       for (let i = 0; i < searchedGame.length; i++) {
         let listedGames = document.createElement('p')
         listedGames.textContent = searchedGame[i];
         searchedGames.appendChild(listedGames);
       }*/
    }
  }
};
