import * as toxicity from '@tensorflow-models/toxicity';
import { getPackedMatrixTextureShapeWidthHeight } from '@tensorflow/tfjs-core/dist/backends/webgl/tex_util';


const allPredictions = []

let model, labels;

const classify = async (inputs) => {
  const results = await model.classify(inputs);
  return inputs.map((d, i) => {
    const obj = {'text': d};
    results.forEach((classification) => {
      obj[classification.label] = classification.results[i].match;
    });
    return obj;
  });
};

const addPredictions = (predictions) => {

  const tableWrapper = document.querySelector('#table-wrapper');

  predictions.forEach(d => {
    const predictionDom = `<div class="row">
      <div class="text">${d.text}</div>
      ${
        labels
            .map(
                label => {return `<div class="${
                                 'label' +
                    (d[label] === true ? ' positive' :
                                         '')}">${d[label]}</div>`})
            .join('')}
    </div>`;
    tableWrapper.insertAdjacentHTML('beforeEnd', predictionDom);
  });
};

const displayPredictions = () => {
  const predictions = allPredictions

  document.querySelector('#display-predictions-btn')
  .addEventListener('click', (e) => {
    console.log('hello')
    predictions.forEach(prediction => test(prediction[0]) )
  });

}


const test = (predictions) => {
  for (const [key, value] of Object.entries(predictions)){
    console.log(key, value)
  }
}


const predict = async () => {
  model = await toxicity.load();
  labels = model.model.outputNodes.map(d => d.split('/')[0]);

  document.querySelector('#classify-new-text')
      .addEventListener('click', (e) => {
        console.log('hi')
        const text = document.querySelector('#classify-new-text-input').value;
        const predictions = classify([text]).then(d => {
          allPredictions.push(d)
        });
        // displayPredictions(allPredictions)
      });
};


predict();
displayPredictions();

