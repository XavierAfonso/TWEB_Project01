const { expect } = require('chai');
const Utils = require('../js/myjs');


describe('Client', () => {
  it('Check if the graphe is not created with a payload invalide', () => {
    // Bad construction
    const json1 = JSON.parse('[{"root":"erreur"}]');
    const test1 = Utils.createGraph(json1);

    // Empty value
    const test2 = Utils.createGraph('');

    // Not contributors attribute
    const json3 = JSON.parse('[{"root":{"id":1,"login":"example","avatar_url":"link1","html_url":"link2","predicate":false}}]');
    const test3 = Utils.createGraph(json3);

    // Create a invalide object ( without root)
    const array = [];
    const row = {};
    const contributors = [];
    const contributor = {};

    // Contributor
    contributor.id = 2;
    contributor.login = 'Jokau';
    contributor.avatar_url = 'https://avatars3.githubusercontent.com/u/8795781?v=4';
    contributor.html_url = 'https://github.com/Jokau';
    contributor.predicate = true;
    contributors.push(contributor);
    row.contributors = contributors;
    array.push(row);
    const test4 = Utils.createGraph(array);

    // eslint-disable-next-line
    expect(test1).to.false;
    // eslint-disable-next-line
    expect(test2).to.false;
    // eslint-disable-next-line
    expect(test3).to.false;
    // eslint-disable-next-line
    expect(test4).to.false;
  });
  // eslint-disable-next-line
  it('Check if the graphe is created with a payload valide', () => {
    // Good constuction
    // eslint-disable-next-line
    const mystring = '[{"root":{"id":1,"login":"example","avatar_url":"link1","html_url":"link2","predicate":false},"contributors":[{"id":2,"login":"Mrapple","avatar_url":"link3","html_url":"link4","predicate":true}]}]';
    const json = JSON.parse(mystring);
    const test1 = Utils.createGraph(json);
    // Create a valide object
    const array = [];
    const row = {};
    const root = {};

    root.id = 1;
    root.login = 'XavierAfonso';
    root.avatar_url = 'https://avatars1.githubusercontent.com/u/25900146?v=4';
    root.html_url = 'https://github.com/XavierAfonso';
    root.predicate = false;

    const contributors = [];
    const contributor = {};

    contributor.id = 2;
    contributor.login = 'Jokau';
    contributor.avatar_url = 'https://avatars3.githubusercontent.com/u/8795781?v=4';
    contributor.html_url = 'https://github.com/Jokau';
    contributor.predicate = true;
    contributors.push(contributor);  
    row.root = root;
    row.contributors = contributors;
    array.push(row);
    console.log(JSON.stringify(array));

    const test2 = Utils.createGraph(array);

    // eslint-disable-next-line
    expect(test1).to.be.true; 
    // eslint-disable-next-line
    expect(test2).to.be.true;
  });


  it('Check if there are the right number of nodes and edges', () => {
    // XavierAfonso/Haskell
    // eslint-disable-next-line
    const mystring = '[{"root":{"id":25900146,"login":"XavierAfonso","avatar_url":"https://avatars1.githubusercontent.com/u/25900146?v=4","html_url":"https://github.com/XavierAfonso","predicate":false},"contributors":[{"id":26025527,"login":"deep-diver","avatar_url":"https://avatars2.githubusercontent.com/u/26025527?v=4","html_url":"https://github.com/deep-diver","predicate":false},{"id":8795781,"login":"Jokau","avatar_url":"https://avatars3.githubusercontent.com/u/8795781?v=4","html_url":"https://github.com/Jokau","predicate":false},{"id":4561245,"login":"daniel-kukiela","avatar_url":"https://avatars2.githubusercontent.com/u/4561245?v=4","html_url":"https://github.com/daniel-kukiela","predicate":false},{"id":5905296,"login":"Sentdex","avatar_url":"https://avatars2.githubusercontent.com/u/5905296?v=4","html_url":"https://github.com/Sentdex","predicate":false},{"id":24824080,"login":"kunwar31","avatar_url":"https://avatars0.githubusercontent.com/u/24824080?v=4","html_url":"https://github.com/kunwar31","predicate":false}]},{"root":{"id":26025527,"login":"deep-diver","avatar_url":"https://avatars2.githubusercontent.com/u/26025527?v=4","html_url":"https://github.com/deep-diver","predicate":false},"contributors":[{"id":1375977,"login":"cgearhart","avatar_url":"https://avatars2.githubusercontent.com/u/1375977?v=4","html_url":"https://github.com/cgearhart","predicate":false},{"id":8483852,"login":"danainschool","avatar_url":"https://avatars3.githubusercontent.com/u/8483852?v=4","html_url":"https://github.com/danainschool","predicate":false},{"id":8662917,"login":"clapollo","avatar_url":"https://avatars0.githubusercontent.com/u/8662917?v=4","html_url":"https://github.com/clapollo","predicate":false},{"id":1929861,"login":"scbrubaker02","avatar_url":"https://avatars2.githubusercontent.com/u/1929861?v=4","html_url":"https://github.com/scbrubaker02","predicate":false},{"id":2119576,"login":"jamesandersen","avatar_url":"https://avatars3.githubusercontent.com/u/2119576?v=4","html_url":"https://github.com/jamesandersen","predicate":false}]},{"root":{"id":8795781,"login":"Jokau","avatar_url":"https://avatars3.githubusercontent.com/u/8795781?v=4","html_url":"https://github.com/Jokau","predicate":false},"contributors":[{"id":3646416,"login":"imani92","avatar_url":"https://avatars0.githubusercontent.com/u/3646416?v=4","html_url":"https://github.com/imani92","predicate":false},{"id":8791107,"login":"ireneu","avatar_url":"https://avatars2.githubusercontent.com/u/8791107?v=4","html_url":"https://github.com/ireneu","predicate":false},{"id":8795781,"login":"Jokau","avatar_url":"https://avatars3.githubusercontent.com/u/8795781?v=4","html_url":"https://github.com/Jokau","predicate":false},{"id":36661095,"login":"loic-schurch","avatar_url":"https://avatars0.githubusercontent.com/u/36661095?v=4","html_url":"https://github.com/loic-schurch","predicate":false},{"id":4550806,"login":"radubanabic","avatar_url":"https://avatars1.githubusercontent.com/u/4550806?v=4","html_url":"https://github.com/radubanabic","predicate":false}]},{"root":{"id":4561245,"login":"daniel-kukiela","avatar_url":"https://avatars2.githubusercontent.com/u/4561245?v=4","html_url":"https://github.com/daniel-kukiela","predicate":false},"contributors":[{"id":29298411,"login":"Hyperclaw79","avatar_url":"https://avatars3.githubusercontent.com/u/29298411?v=4","html_url":"https://github.com/Hyperclaw79","predicate":true},{"id":4604464,"login":"oahziur","avatar_url":"https://avatars2.githubusercontent.com/u/4604464?v=4","html_url":"https://github.com/oahziur","predicate":true},{"id":396613,"login":"lmthang","avatar_url":"https://avatars3.githubusercontent.com/u/396613?v=4","html_url":"https://github.com/lmthang","predicate":false},{"id":1794715,"login":"ebrevdo","avatar_url":"https://avatars0.githubusercontent.com/u/1794715?v=4","html_url":"https://github.com/ebrevdo","predicate":false},{"id":1906051,"login":"wb14123","avatar_url":"https://avatars1.githubusercontent.com/u/1906051?v=4","html_url":"https://github.com/wb14123","predicate":true}]},{"root":{"id":5905296,"login":"Sentdex","avatar_url":"https://avatars2.githubusercontent.com/u/5905296?v=4","html_url":"https://github.com/Sentdex","predicate":false},"contributors":[{"id":1663507,"login":"kirsle","avatar_url":"https://avatars2.githubusercontent.com/u/1663507?v=4","html_url":"https://github.com/kirsle","predicate":false},{"id":52220,"login":"asweigart","avatar_url":"https://avatars2.githubusercontent.com/u/52220?v=4","html_url":"https://github.com/asweigart","predicate":false},{"id":121676,"login":"denilsonsa","avatar_url":"https://avatars3.githubusercontent.com/u/121676?v=4","html_url":"https://github.com/denilsonsa","predicate":false},{"id":5152516,"login":"muxuezi","avatar_url":"https://avatars3.githubusercontent.com/u/5152516?v=4","html_url":"https://github.com/muxuezi","predicate":false},{"id":3834663,"login":"hugoesb","avatar_url":"https://avatars2.githubusercontent.com/u/3834663?v=4","html_url":"https://github.com/hugoesb","predicate":false}]},{"root":{"id":24824080,"login":"kunwar31","avatar_url":"https://avatars0.githubusercontent.com/u/24824080?v=4","html_url":"https://github.com/kunwar31","predicate":false},"contributors":[{"id":6712,"login":"darius","avatar_url":"https://avatars1.githubusercontent.com/u/6712?v=4","html_url":"https://github.com/darius","predicate":true},{"id":4370220,"login":"norvig","avatar_url":"https://avatars1.githubusercontent.com/u/4370220?v=4","html_url":"https://github.com/norvig","predicate":false},{"id":17463361,"login":"MrDupin","avatar_url":"https://avatars3.githubusercontent.com/u/17463361?v=4","html_url":"https://github.com/MrDupin","predicate":false},{"id":7132995,"login":"SnShine","avatar_url":"https://avatars1.githubusercontent.com/u/7132995?v=4","html_url":"https://github.com/SnShine","predicate":false},{"id":9061913,"login":"reachtarunhere","avatar_url":"https://avatars0.githubusercontent.com/u/9061913?v=4","html_url":"https://github.com/reachtarunhere","predicate":false}]}]';
    const json = JSON.parse(mystring);
    Utils.createGraph(json);
    const numberOfNodes = Utils.getNodes().length;
    const numberOfEdges = Utils.getedges().length;
    // eslint-disable-next-line
    expect(numberOfNodes).to.equal(30);
    // eslint-disable-next-line
    expect(numberOfEdges).to.equal(29);
  });
});
