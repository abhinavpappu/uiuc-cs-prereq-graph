function removeDisconnectedNodes(graph) {
  const connectedNodes = new Set();
  graph.edges.forEach(edge => {
    connectedNodes.add(graph.nodes[edge.from]);
    connectedNodes.add(graph.nodes[edge.to]);
  });

  for (const [i, node] of graph.nodes.entries()) {
    if (!connectedNodes.has(node)) {
      // setting it to null because we can't change indices (the edges are dependent on them)
      graph.nodes[i] = null;
    }
  }
}