import * as toxicity from '@tensorflow-models/toxicity';
import { getPackedMatrixTextureShapeWidthHeight } from '@tensorflow/tfjs-core/dist/backends/webgl/tex_util';


var firebaseConfig = {
  apiKey: "AIzaSyAyzyjiwdC9m7d9ar7H64aO7nMtn11cmSM",
  authDomain: "news-toxicity.firebaseapp.com",
  databaseURL: "https://news-toxicity.firebaseio.com",
  projectId: "news-toxicity",
  storageBucket: "news-toxicity.appspot.com",
  messagingSenderId: "635708736447",
  appId: "1:635708736447:web:3bab4cc23216274871d70a"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();


function sendData(userData) {
  console.log(userData)
  let db = database.ref('predictions');

  let data = {
    text: userData.text,
    identity_attack: userData.identity_attack,
    insult: userData.insult,
    obscene: userData.obscene,
    severe_toxicity: userData.severe_toxicity,
    sexual_explicit: userData.sexual_explicit,
    threat: userData.threat,
    toxicity: userData.toxicity,
  }

  console.log('saving data...')
  console.log(data)

  let prediction = db.push(data, finished)
  console.log("Firebase generated key: " + prediction.key)

  function finished(err) {
    if (err) {
      console.log('oops, something went wrong')
      console.log(err)
    } else {
      console.log('Data saved')
    }
  }
}
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
          sendData(d[0]);
          allPredictions.push(d)
        });
        // displayPredictions(allPredictions)
      });
};


predict();
displayPredictions();
sendData()