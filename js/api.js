var url = "https://api.football-data.org/";


// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTeams() {
  if ("caches" in window) {
    caches.match(url + "v2/teams/").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.teams.forEach(function(team) {
            articlesHTML += `
                  <div class="card">
                    <a href="./team.html?id=${team.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <p>${team.venue}</p>
                    </div>
                  </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(url + "v2/teams/", {
    headers: {
      "X-Auth-Token": "7881deab0e1141c783d66c2205bbeb8a"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.teams.forEach(function(team) {
        articlesHTML += `
              <div class="card">
                <a href="./team.html?id=${team.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${team.crestUrl}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${team.name}</span>
                  <p>${team.venue}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = articlesHTML;
    })
    .catch(error);
}


function getPlayers() {
  if ("caches" in window) {
    caches.match(url + "v2/competitions/2021/scorers/").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var players = "";
          var playersElement = document.getElementById("players");
          data.scorers.forEach(function(player) {
            players += `
                          <tr>
                            <td>${player.player.name}</td>
                            <td>${player.player.dateOfBirth}</td>
                            <td>${player.player.position}</td>
                            <td>${player.player.nationality}</td>
                            <td>${player.team.name}</td>
                            <td>${player.numberOfGoals}</td>
                          </tr>
                `;
          });
    
          playersElement.innerHTML = `
          <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
    
          <table class="striped responsive-table">
              <thead>
                  <tr>
                    <th>Player Name</th>
                    <th>Date Of Birth</th>
                    <th>Position</th>
                    <th>Nationality</th>
                    <th>Team Name</th>
                    <th>Goals</th>
                  </tr>
              </thead>
              <tbody id="players">
                ${players}
              <tbody>
          </table>
          </div>
          `;
        });
      }
    });
  }

  fetch(url + "v2/competitions/2021/scorers/", {
    headers: {
      "X-Auth-Token": "7881deab0e1141c783d66c2205bbeb8a"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var players = "";
      var playersElement = document.getElementById("players");
      data.scorers.forEach(function(player) {
        players += `
                      <tr>
                        <td>${player.player.name}</td>
                        <td>${player.player.dateOfBirth}</td>
                        <td>${player.player.position}</td>
                        <td>${player.player.nationality}</td>
                        <td>${player.team.name}</td>
                        <td>${player.numberOfGoals}</td>
                      </tr>
            `;
      });

      playersElement.innerHTML = `
      <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

      <table class="striped responsive-table">
          <thead>
              <tr>
                  <th>Player Name</th>
                  <th>Date Of Birth</th>
                  <th>Position</th>
                  <th>Nationality</th>
                  <th>Team Name</th>
                  <th>Goals</th>
              </tr>
          </thead>
          <tbody id="players">
            ${players}
          <tbody>
      </table>
      </div>
      `;
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function(resolve, reject) {

    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
  
    if ("caches" in window) {
      caches.match(url + "v2/teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var articleHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.crestUrl}" />
                </div>
                <div class="card-content">
                  <span class="card-title">${data.shortName}</span>
                  <p>Venue : ${data.venue}</p>
                  <p>Address : ${data.address}</p>
                  <p>Founded : ${data.founded}</p>
                  <p>Club Colors : ${data.clubColors}</p>
                  <p>Email : ${data.email}</p>
                  <p>Website : ${data.website}</p>
                </div>
              </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;
            resolve(data);
          });
        }
      });
    }
  
    fetch(url + "v2/teams/" + idParam, {
      headers: {
        "X-Auth-Token": "7881deab0e1141c783d66c2205bbeb8a"
      }
    })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                <p>Venue : ${data.venue}</p>
                <p>Address : ${data.address}</p>
                <p>Founded : ${data.founded}</p>
                <p>Club Colors : ${data.clubColors}</p>
                <p>Email : ${data.email}</p>
                <p>Website : ${data.website}</p>
              </div>
            </div>
          `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        resolve(data);
    });
  });
}

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    teams.forEach(function(team) {
      articlesHTML += `
                  <div class="card">
                    <a href="./team.html?id=${team.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <p>${team.venue}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(parseInt(idParam)).then(function(team) {
    articleHTML = '';
    var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${team.crestUrl}" />
              </div>
              <div class="card-content">
                <span class="card-title">${team.name}</span>
                <p>Venue : ${team.venue}</p>
                <p>Address : ${team.address}</p>
                <p>Founded : ${team.founded}</p>
                <p>Club Colors : ${team.clubColors}</p>
                <p>Email : ${team.email}</p>
                <p>Website : ${team.website}</p>
              </div>
            </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}