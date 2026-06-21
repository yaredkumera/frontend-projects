 let error = document.querySelector("h2");
      let result = document.querySelector("#result");

      let temp = document.querySelector(".temp");
      let wind = document.querySelector(".wind");
      let humdty = document.querySelector(".humdty");
      let max = document.querySelector(".max");
      document
        .getElementById("getWeather")
        .addEventListener("click", function () {
          result.style.display = "grid";
          h2.style.display = "none";
          const city = document.getElementById("city").value.trim();

          if (city === "") {
            result.style.display = "none";
            h2.style.display = "block";

            h2.textContent = "❌ Please enter a city.";
            return;
          }

          const apiKey = "your api kiy";
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

          console.log("Requesting:", url);

          fetch(url)
            .then((r) => {
              if (!r.ok) throw new Error("City not found");
              return r.json();
            })
            .then((data) => {
              temp.innerHTML = "Temprature <br>" + data.main.temp + "°C";
              max.innerHTML = "Condition <br>" + data.weather[0].description;
              humdty.innerHTML = "Humidity <br>" + data.main.humidity + "%";
              wind.innerHTML = "Wind Speed <br>" + data.wind.speed + "m/s";
            })
            .catch((error) => {
              result.style.display = "none";
              h2.style.display = "block";
              h2.textContent = "❌ Error: " + error.message;
            });
        });