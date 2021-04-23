// generated color pallete: https://gka.github.io/palettes/#/9|s|00429d,96ffea,ffffe0|ffffe0,ff005e,93003a|1|1
// full pallete: ["#ffffe0", "#c5eddf", "#a5d5d8", "#8abccf", "#73a2c6", "#5d8abd", "#4771b2", "#2e59a8", "#00429d"]
const nodeColors = ["#8abccf", "#73a2c6", "#5d8abd", "#4771b2", "#00429d"]
const edgeColor = '#ccc';
const selectedEdgeColor = '#777';

function createCytoScape(graph) {
  removeDisconnectedNodes(graph);

  const elements = [];
  for (const node of graph.nodes) {
    if (node) {
      const { label: id, group, ...rest } = node;
      const color = nodeColors[group - 1];
      elements.push({ data: { id, color, ...rest } });
    }
  }
  for (const edge of graph.edges) {
    const from = graph.nodes[edge.from].label;
    const to = graph.nodes[edge.to].label;
    elements.push({ data: { id: `${from} -> ${to}`, source: from, target: to } });
  }

  const cy = cytoscape({
    container: document.getElementById('container'),
    elements,
    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': 'data(color)',
          'label': 'data(id)',
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 2,
          // 'line-color': '#ccc',
          'line-color': edgeColor,
          'target-arrow-color': edgeColor,
          // 'target-arrow-color': '#582',
          'target-arrow-shape': 'triangle',
          // 'arrow-scale': 1.3,
          'curve-style': 'bezier'
        }
      }
    ],
    layout: {
      // name: 'dagre',
      // name: 'avsdf',

      name: 'klay',
      klay: {
        spacing: 30,
        thoroughness: 7,
        direction: 'DOWN',
      }

      // name: 'springy',
      // name: 'spread',

      // name: 'cola',
      // flow: { axis: 'x', minSeparation: 200 }, // use DAG/tree flow layout if specified, e.g. { axis: 'x', minSeparation: 30 }
      // refresh: 2,
      // avoidOverlap: true,
      // infinite: true,
      // // nodeSpacing: () => 25,
      // // nodeDimensionsIncludeLabels: true,
      // // convergenceThreshold: 0.0001,
      // // maxSimulationTime: 20000,

      // clusters: ({ id }) => Number(id.split(' ')[1][0])
      //   name: 'grid',
      //   rows: 1
    }
  });

  const tippies = {}
  graph.nodes.forEach(node => {
    if (node) {
      tippies[node.label] = makeTippy(cy.getElementById(node.label), node);
    }
  })

  cy.on('mouseover', 'node', e => {
    const id = e.target.id();
    tippies[id].show();
    cy.style().selector(`edge[source="${id}"]`).style({
      'width': 4,
      'arrow-scale': 1.1,
      'line-color': selectedEdgeColor,
      'target-arrow-color': selectedEdgeColor,
    }).update();
    document.body.style.cursor = 'pointer';
  });

  cy.on('mouseout', 'node', e => {
    const id = e.target.id();
    tippies[id].hide();
    cy.style().selector(`edge[source="${id}"]`).style({
      'width': 2,
      'arrow-scale': 1,
      'line-color': edgeColor,
      'target-arrow-color': edgeColor,
    }).update();
    document.body.style.cursor = 'default';
  });

  cy.on('tap', 'node', e => {
    const href = e.target.data('href');
    if (e.originalEvent.ctrlKey) { // open in new tab if ctrl-click
      window.open(href, '_blank');
    } else {
      location.href = href;
    }
  })
}


function makeTippy(node, { title, description, hours }) {
  const ref = node.popperRef();

  // unfortunately, a dummy element must be passed
  // as tippy only accepts a dom element as the target
  // https://github.com/atomiks/tippyjs/issues/661
  const dummyDomEle = document.createElement('div');

  const tip = tippy(dummyDomEle, {
    theme: 'translucent',
    onCreate: instance => { // mandatory
      // patch the tippy's popper reference so positioning works
      // https://atomiks.github.io/tippyjs/misc/#custom-position
      instance.popperInstance.reference = ref;
    },
    lazy: false, // mandatory
    trigger: 'manual', // mandatory

    // dom element inside the tippy:
    content: () => { // function can be better for performance
      const div = document.createElement('div');
      div.innerHTML = `
        <h3 style="display: flex; justify-content: space-between; align-items: center; margin: 10px; margin-bottom: 5px">
          ${title}
          <span style="letter-spacing: 5px; font-size: 2em">${'•'.repeat(hours)}</span>
        </h3>
        <p style="margin: 10px; margin-top: 0">${description}</p>
      `;
      return div;
    },

    // your own preferences:
    arrow: true,
    placement: 'top',
    hideOnClick: false,
    multiple: true,
    sticky: true,

    // if interactive:
    interactive: true,
    appendTo: document.getElementById('container') // or append dummyDomEle to document.body
  });

  return tip;
};
