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
    1. Loads TF toxicity model
    2. Saves user input to ```var text```
    3. Runs ```classify()``` on ```text```
    4. Runs ```sendData()```
    5. Saves prediction to ```var allPredictions```
3. ```classify()```
    1. Runs ```model.classify()``` (model that was loaded in earlier step, as TF classify function) on user input
    2. Sets the output of that function to ```var results```
       - output is an array of objects, one object for each toxicty type/label & it's probability 
    3. Creates ```const obj``` that has a property of ```text``` set equal to the user input
    4. Iterates over ```results``` and adds each toxicty type/label & it's probability to ```obj```
    5. Returns ```obj```
4. ```sendData()```
    1. Saves ```obj``` data into database
    2. Returns error if it did not save correctly.
    3. Returns Firebase key if data successfully saved.
5. User clicks 'Display Predictions'
6. ```displayPredictions()``` is called
    1. Iterates over each prediction in ```allPredictions```
    2. console.logs key/value pair of each prediction (toxicity type/lable => true/false)
