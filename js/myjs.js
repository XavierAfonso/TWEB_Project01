
// https://medium.freecodecamp.org/environment-settings-in-javascript-apps-c5f9744282b6
const baseUrl =  (window.location.hostname === 'localhost' || (window.location.hostname === '127.0.0.1'))
  ? 'http://localhost:3000'
  : 'https://tweb-project1.herokuapp.com';

let nodes = [];
let edges = [];
let network = null;


function loading(){

  $('#mynetwork').empty();
  $('#mynetwork').append('<img id ="loading" src="gif/loading.gif" alt="Loading">');  
}

// Called when the Visualization API is loaded.
function draw() {

    // create people.
    // value corresponds with the age of the person
    /*var DIR = 'img/';

    nodes = [
      {id: 1,  shape: 'circularImage', image: DIR + '1.jpg'},
      {id: 2,  shape: 'circularImage', image: DIR + '2.jpg'},
      {id: 3,  shape: 'circularImage', image: DIR + '3.jpg'},
      {id: 4,  shape: 'circularImage', image: DIR + '4.jpg'},
      {id: 5,  shape: 'circularImage', image: DIR + '5.png'}
    ];

    // create connections between people
    // value corresponds with the amount of contact between two people
    edges = [
      {from: 1, to: 2},
      {from: 1, to: 5},
      {from: 2, to: 4},
      {from: 3, to: 5},
      {from: 5, to: 3},
      {from: 5, to: 2}
    ];*/

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
      nodes: {
        borderWidth:4,
        size:30,
      color: {
          border: '#222222',
          background: '#666666'
        },
        font:{color:'black'}
      },
      edges: {
        color: 'lightgray'
      }
    };
    network = new vis.Network(container, data, options);
  }


function getUser(username) {
    return fetch(`${baseUrl}/users/${username}`)
      .then(res => res.json());
}

function getRepos(username) {
    return fetch(`${baseUrl}/repos/${username}`)
      .then(res => res.json());
}

function getContributors(username, predicate) {
    return fetch(`${baseUrl}/contributors/${username}/${predicate}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status);
      });

}

function showErrorMessage(message) {
  console.log(message)
  let errorMessage;
  switch(message) {
    case '404' : 
      let user = $("#username").val();
      errorMessage = 'Github user not found : ' + user;
      break;
    case '500' : 
      errorMessage = "Server error...";
      break;
    default :
      errorMessage = 'Something went wrong sorry...'
  }

  $('#mynetwork').empty(); // remove loading image
  var x = document.getElementById("snackbar");
  x.textContent = errorMessage;
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function CreateNodes(username, language){
    let arrayIds = [];
    nodes = [];
    edges = [];
    edgesMemory = [];

    getContributors(username, language).then(data => {
        let first = true; 

        let nodeHelpColor = {};
        nodeHelpColor.border = '#FFD700';

        data.forEach(function(item){
            let root = item.root;

            //The root
            if(first){
                let rootClean = {};
                rootClean.id = root.id;

                //Add to the list
                arrayIds.push(rootClean.id);

                //Create the node
                rootClean.shape = 'circularImage';
                rootClean.image = root.avatar_url;
                rootClean.label = root.login;
                rootClean.color = '#A0FFA0'

                nodes.push(rootClean);
                first = false;
            }

            //Contributors
            let contributors = item.contributors;
            contributors.forEach(function(item){ 
                let current = {};
                current.id = item.id;

                //if not already created
                if(!arrayIds.includes(current.id)){

                    //Add to the list
                    arrayIds.push(current.id);

                    //create the node
                    current.shape = 'circularImage';
                    current.image = item.avatar_url;
                    current.label = item.login;
                    
                    if (item.hasOwnProperty('predicate') && item.predicate == true) {
                      // node is a helper
                      current.color = nodeHelpColor;
                    }
                    nodes.push(current);
                }

                //Create the edge
                edge = {};
               
                let edgeColor = {};
                edgeColor.inherit=false;
                edge.color= edgeColor;
                
                edge.from = root.id;
                edge.to = item.id;

                if(edge.from!=edge.to){

                edgeInvert = edge.to + '-' + edge.from;

                if(!edgesMemory.includes(edgeInvert)){
                  //Save the pair
                  edgesMemory.push(edge.from + '-' + edge.to);
                  edges.push(edge);
                }
              }
            });
        });
        //console.log(data);
        $('#loading').addClass('hidden')
        draw();
    }).catch(err => {
      showErrorMessage(err.message);
    })
}

$(function() {
    $("#searchButton").click( function()
         {
          let username = $("#username").val();
          let language = $("#language").val();
          if(username.length>0){
            if (language.length>0) {
              //$('#loading').removeClass('hidden')
              loading();
              CreateNodes(username, language);
            } 
            // form validation feedback in html
          }
         }
    );
});
