const apiKey = 'bf508b567a91915770ec157e21fb4ca8';
const city = 'warangal';

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const fetchData = async () => {
  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    updateGraph(weatherData.main.temp);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
};

let chart; // store chart instance

const updateGraph = (temperature) => {
  const ctx = document.getElementById('weatherGraph').getContext('2d');

  if (chart) {
    chart.data.datasets[0].data = [temperature];
    chart.update();
    return;
  }

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Temperature'],
      datasets: [{
        label: 'Temperature (°C)',
        data: [temperature],
        backgroundColor: ['#36A2EB'],
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

fetchData();