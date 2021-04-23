
function createElGrapho(model) {
  let elgrapho = new ElGrapho({
    container: document.getElementById('container'),
    model: ElGrapho.layouts.ForceDirected(model),
    // model: ElGrapho.layouts.Cluster(model),
    arrows: true,
    width: window.innerWidth - 50,
    height: window.innerHeight - 50,
  });
}