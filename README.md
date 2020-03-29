# News Toxicity Analyzer

A tool that analyzes text toxicity (using Tensorflow's toxicy model) of news articles.


## Built With
* Javascript
* Tensorflow.js (Toxicty Model)
* Firebase (databse)


## Running The Program

Install dependencies and prepare the build directory:

```$ yarn```

Run the server:

```$ yarn watch```

View in browser:

Visit ```http://localhost:1234/```

## How It Works

1. User inputs text and clicks 'classify'
2. ```predict()``` is run
  - Loads TF toxicity model
  - Saves user input to ```var text```
  - Runs ```classify()``` on ```text```
  - Runs ```sendData()```
  - Saves prediction to ```var allPredictions```
3. ```classify()```
  - Runs ```model.classify()``` (model that was loaded in earlier step, as TF classify function) on user input
  - Sets the output of that function to ```var results```
    - output is an array of objects, one object for each toxicty type/label & it's probability 
  - Creates ```const obj``` that has a property of ```text``` set equal to the user input
  - Iterates over ```results``` and adds each toxicty type/label & it's probability to ```obj```
  - Returns ```obj```
4. ```sendData()```
  - Saves ```obj``` data into database
  - Returns error if it did not save correctly.
  - Returns Firebase key if data successfully saved.
5. User clicks 'Display Predictions'
6. ```displayPredictions()``` is called
  - Iterates over each prediction in ```allPredictions```
  - console.logs key/value pair of each prediction (toxicity type/lable => true/false)
