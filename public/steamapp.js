async function fetchRecentGames() {
  const response = await fetch(
    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=98873F81B2D36F42E6AEAABF7702074C&steamid=76561198182066934&count=10`
  );
  const data = await response.json();

  if (!data.response || !data.response.games) {
    console.error("No games data found.");
    return;
  }

  const games = data.response.games;


  const topGames = games.sort((a, b) => b.playtime_forever - a.playtime_forever).slice(0, 3);

  renderChart(topGames);
  renderSlider(topGames);
}

function renderChart(games) {
  const ctx = document.getElementById('timePlayedChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: games.map(g => g.name),
      datasets: [{
        label: 'Hours Played',
        data: games.map(g => (g.playtime_forever / 60).toFixed(2)),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        x: {
          ticks: {
            maxRotation: 22.5,
            minRotation: 22.5
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Hours Played'
          }
        }
      }
    }
  });
}
fetchRecentGames();

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    slider.classList.add('slider-container');
  
    const images = [
      { src: 'images/overwatch2.jpg', title: 'Overwatch 2', link: 'https://overwatch.blizzard.com/en-us/' },
      { src: 'images/destiny2.png', title: 'Destiny 2', link: 'https://store.steampowered.com/app/1085660/Destiny_2/' },
      { src: 'images/swtfu.jpg', title: 'Star Wars: The Force Unleashed', link: 'https://store.steampowered.com/app/32430/STAR_WARS__The_Force_Unleashed_Ultimate_Sith_Edition/' }
    ];
  
    images.forEach(image => {
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.title;
      img.title = image.title;
      img.style.width = '150px';
      img.style.height = '225px';
      slider.appendChild(img);
    });
  
    SimpleSlider.getSlider(slider);

  });
  
  


