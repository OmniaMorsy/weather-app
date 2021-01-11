/* Global Variables */
const submit = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Base URL and API Key for OpenWeatherMap API
/* Personal API Key for OpenWeatherMap API*/
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=23122cdc9abe3901d600b6893c388a29&units=imperial';

// Event listener to add function to existing HTML DOM element
submit.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  e.preventDefault();
  // get user input values
  const newZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  getWeather(baseURL, newZip, apiKey)
    .then((userData) => {
      postData('/add', { date: newDate, temp: userData.main.temp, content })
    })
    .then((newData) => { updateUI() });
  updateUI();
}
/* Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}
/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })
  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('/app');
  try {
    const allData = await request.json()
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};

// clear the input text after executing all the functions
const removeText = async () => {
  try {
    zipCode.value = '';
    feeling.value = '';

  } catch (err) {
    console.log(`error is: ${err}`);
  }
}

