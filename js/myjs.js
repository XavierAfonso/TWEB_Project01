
// https://medium.freecodecamp.org/environment-settings-in-javascript-apps-c5f9744282b6
const baseUrl =  window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'http://localhost:3000';


function getUser(username) {
    return fetch(`${baseUrl}/users/${username}`)
      .then(res => res.json());
}

function getRepos(username) {
    return fetch(`${baseUrl}/repos/${username}`)
      .then(res => res.json());
}

function getContributors(username) {
    return fetch(`${baseUrl}/contributors/${username}`)
      .then(res => res.json());
}

function test(username){

    let result = "";

    getContributors(username).then(data => {

        result = JSON.stringify(data);
        alert(result);

    }).catch(err => {
        console.error('Cannot fetch data', err)
    })

}

$(function() {
    $("#searchButton").click( function()
         {
            let username = $("#username").val();
            test(username);
         }
    );
});

