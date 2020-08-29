/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

/*
postData('/add', {answer:42,score:5});



document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const newAnimal =  document.getElementById('animal').value;
getAnimal(baseURL,newAnimal, apiKey)

}
*/
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=7d60d741e44288fd735dac8b8e5a8ae8';

const getWeather = async (baseURL, zip_cide, key)=>{

  const res = await fetch(baseURL+zip_cide+key)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    mode:'cors',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header        
  });
/*
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
    */
};

document.getElementById('generate').addEventListener('click', generate);

function generate(e){
  const newZip =  document.getElementById('zip').value;
  const Felling =  document.getElementById('feelings').value;

  getWeather(baseURL,newZip,apiKey)
  // New Syntax!
  
  .then(
    updateUI()
  )
  .then(function(data){
    // Add data
    data.date = newDate;
    data.felling = Felling;

    console.log(data);
    postData('/addWeather',data);
  })
}

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = 'Today is '+ allData.date;
    document.getElementById('temp').innerHTML =' Here is current temp '+ allData.temp;
    document.getElementById('content').innerHTML = 'Here is your Felling '+ allData.felling;

  }catch(error){
    console.log("error", error);
  }
}