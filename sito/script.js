document.addEventListener('DOMContentLoaded', () => {
    const leaderboard = document.getElementById('leaderboard');

    // Simulazione di una API (puoi sostituire con fetch da un vero endpoint)
    const url = 'localhost:3000'; // da sostituire

    // Simulazione fetch
    async function fetchLeaderboard() {
        const res = fetch(url + "/classeVincitrice")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Convert response to JSON
            })
            .then(data => {
                console.log('User list:');
                data.forEach(user => {
                    console.log(user.name);
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

        const data = await res.json();
        leaderboard.innerHTML = ''; // Pulisce i dati precedenti

        data.forEach((player, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${player.username} - ${player.score} pt`;
            leaderboard.appendChild(li);
        });
    }



    fetchLeaderboard();
});
