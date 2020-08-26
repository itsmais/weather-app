function convertToCelsius(x) {
    x = parseFloat(x);
    return Math.floor(x - 273.15);
}
let weatherResult = document.getElementById("weather-result");
let weahterIcon = document.getElementById("icon");

function getWeather() {
    weatherResult.innerHTML = "";
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        if (navigator.geolocation) {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            let url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=6abdc02a8c5609bade1268cceec08c45";
            // console.log(url);
            fetch(url, requestOptions)
                .then(response => response.text())
                .then(result => {
                    var jsonObj = JSON.parse(result);
                    // console.log(jsonObj);
                    let weatherDescription = jsonObj["weather"][0]["description"];
                    let temp = convertToCelsius(jsonObj["main"]["temp"]);
                    let locationName = jsonObj["name"];
                    weatherResult.innerHTML +=
                         weatherDescription +
                        " </br> in " + locationName +
                        "</br>" + temp + "\xB0 C";
                    weahterIcon.src = "https://openweathermap.org/img/wn/" + jsonObj["weather"][0]["icon"] + "@2x.png";

                })
                .catch(error => {
                    //console.log('error', error)
                });

        }
    });
}
