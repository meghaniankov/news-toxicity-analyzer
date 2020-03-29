import * as toxicity from '@tensorflow-models/toxicity';

const allPredictions = []
let model, labels;

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

const predict = async () => {
  model = await toxicity.load();
  labels = model.model.outputNodes.map(d => d.split('/')[0]);

  document.querySelector('#classify-new-text')
      .addEventListener('click', (e) => {
        console.log('clicked')

        const text = document.querySelector('#classify-new-text-input').value;
        const predictions = classify([text]).then(d => {
          // sendData(d[0]);
          allPredictions.push(d)
        });
      });
};

const classify = async (inputs) => {
  const results = await model.classify(inputs);
  return inputs.map((text, index) => {
    const obj = {'text': text};
    results.forEach((classification) => {
      obj[classification.label] = classification.results[index].match;
    });
    return obj;
  });
};


function sendData(userData) {
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

const displayPredictions = () => {
  const predictions = allPredictions

  document.querySelector('#display-predictions-btn')
  .addEventListener('click', (e) => {
    console.log('displaying predictions ----')
    predictions.forEach(prediction => {
      for (const [key, value] of Object.entries(prediction[0])){
        console.log(key, value)
      }
    })
  });
}

predict();
displayPredictions();
sendData()