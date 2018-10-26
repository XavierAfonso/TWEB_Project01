
// https://medium.freecodecamp.org/environment-settings-in-javascript-apps-c5f9744282b6
// eslint-disable-next-line
const baseUrl =  (window.location.hostname === 'localhost' || (window.location.hostname === '127.0.0.1'))
  ? 'http://localhost:3000'
  : 'https://tweb-project1.herokuapp.com';

let nodes = [];
let edges = [];
let network = null;

function loading() {
  $('#mynetwork').empty();
  $('#mynetwork').append('<img id ="loading" src="gif/loading.gif" alt="Loading">');  
}

// Called when the Visualization API is loaded.
function draw() {
  // create a network
  const container = document.getElementById('mynetwork');

  const data = {
    nodes,
    edges,
  };

  const options = {
    nodes: {
      borderWidth: 4,
      size: 30,
      color: {
        border: '#222222',
        background: '#666666',
      },
      font: { color: 'black' },
    },
    edges: {
      color: 'lightgray',
    },
  };

  // eslint-disable-next-line
  network = new vis.Network(container, data, options);

  network.on('doubleClick', (params) => {
    // params.event = "[original event]";
    const tmp = params;
    const currentNodes = nodes.find(x => x.id === tmp.nodes[0]);

    if (currentNodes.html_url) {
      window.open(currentNodes.html_url);
      // console.log(currentNodes);
    }
  });
}

/* function getUser(username) {
    return fetch(`${baseUrl}/users/${username}`)
      .then(res => res.json());
} */

/* function getRepos(username) {
    return fetch(`${baseUrl}/repos/${username}`)
      .then(res => res.json());
} */

function getContributors(username, predicate) {
  return fetch(`${baseUrl}/contributors/${username}/${predicate}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.status);
    });
}

function showErrorMessage(message) {
  console.log(`MESSAGE :  ${message}`);

  let errorMessage;
  switch (message) {
    case 'NetworkError when attempting to fetch resource.':
      errorMessage = 'Server is down :(';
      break;
    case '404':
      // eslint-disable-next-line
      const user = $('#username').val();
      errorMessage = `Github user not found : ${user}`;
      break;
    case '500':
      errorMessage = 'Server error...';
      break;
    default:
      errorMessage = 'Something went wrong sorry...';
  }

  $('#mynetwork').empty(); // remove loading image
  const x = document.getElementById('snackbar');
  x.textContent = errorMessage;
  x.className = 'show';
  // eslint-disable-next-line
  setTimeout(function(){ x.className = x.className.replace('show', ''); }, 3000);
}

function CreateNodes(username, language) {
  const arrayIds = [];
  nodes = [];
  edges = [];
  const edgesMemory = [];

  getContributors(username, language).then((data) => {
    let first = true;
    const nodeHelpColor = {};
    nodeHelpColor.border = '#FFD700';

    data.forEach((item) => {
      // eslint-disable-next-line
      const root = item.root;
      // The root
      if (first) {
        const rootClean = {};
        rootClean.id = root.id;
        // Add to the list
        arrayIds.push(rootClean.id);

        // Create the node
        rootClean.shape = 'circularImage';
        rootClean.image = root.avatar_url;
        rootClean.label = root.login;
        rootClean.html_url = root.html_url;
        rootClean.color = '#A0FFA0';

        nodes.push(rootClean);
        first = false;
      }

      // Contributors
      // eslint-disable-next-line
      const contributors = item.contributors;
      contributors.forEach((contributor) => {
        const current = {};
        current.id = contributor.id;

        // if not already created
        if (!arrayIds.includes(current.id)) {
          // Add to the list
          arrayIds.push(current.id);
          // create the node
          current.shape = 'circularImage';
          current.image = contributor.avatar_url;
          current.label = contributor.login;
          current.html_url = contributor.html_url;

          // eslint-disable-next-line
          if (contributor.hasOwnProperty('predicate') && contributor.predicate == true) {
            // node is a helper
            current.color = nodeHelpColor;
          }
          nodes.push(current);
        }

        // Create the edge
        const edge = {};
        const edgeColor = {};
        edgeColor.inherit = false;
        edge.color = edgeColor;
        edge.from = root.id;
        edge.to = contributor.id;

        if (edge.from !== edge.to) {
          const edgeInvert = `${edge.to}-${edge.from}`;

          if (!edgesMemory.includes(edgeInvert)) {
            // Save the pair
            edgesMemory.push(`${edge.from}-${edge.to}`);
            edges.push(edge);
          }
        }
      });
    });
    // console.log(data);
    $('#loading').addClass('hidden');
    draw();
  }).catch((err) => {
    console.error(err.message);
    showErrorMessage(err.message);
  });
}

$(() => {
  $('#searchButton').click(() => {
    const username = $('#username').val();
    const language = $('#language').val();
    if (username.length > 0) {
      if (language.length > 0) {
        loading();
        CreateNodes(username, language);
      }
    }
  });
});
