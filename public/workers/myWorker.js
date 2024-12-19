// public/workers/myWorker.js
self.onmessage = function (e) {
  const { data } = e;
  // Aquí puedes realizar los cálculos intensivos
  let result = data * 2; // Ejemplo de cálculo
  self.postMessage(result);
};
