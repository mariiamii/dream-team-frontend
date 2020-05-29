document.addEventListener("DOMContentLoaded", () => {
    const url = 'http://localhost:3000/teams'
    const dropdown = document.querySelector('#team-names')
    const playersBtn = document.querySelector('#view-players')
    const body = document.querySelector('body')

    fetch(url)
    .then(resp => resp.json())
    .then(teams => teams.forEach(team => renderTeamNames(team)))
   
    function renderTeamNames(team) {
        const option = document.createElement('option')
        option.innerText = team.teamName
        option.value = team.id
        dropdown.append(option)
    }

    dropdown.addEventListener('change', event => {
        const teamId = event.target.value
        
        fetch(`${url}/${teamId}`)
        .then(resp => resp.json())
        .then(team => {
            renderTeam(team),
            renderPlayers(team)
        })
        
        function renderTeam(team) {
            const name = document.querySelector('#team-name')
            const teamImage = document.querySelector("#team-image")
            const teamLocation = document.querySelector('#team-location')
            
            name.textContent = team.teamName
            teamImage.src = team.imageUrl
            teamLocation.textContent = team.location
        }
    })

    function renderPlayers(team) {
        playersBtn.addEventListener('click', event => {
            body.innerHTML = ''
            team.players.forEach(player => {
                body.innerHTML += `
                <div data-id=${player.playerId} class='player-card'>
                    <p class="player-name">Player Name: ${player.playerName}</p>
                    <p>Jersey Number: ${player.jersey}</p>
                    <button id="select-player">Add Player</button>
                </div>
                `
            }) 
        })
    }

    // document.addEventListener('click', event => {
    //     if(event.target.id === 'select-player') {
            
    //     }
    // })




    // function addPlayers() {


    //     fetch(`${url}/${}`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             },
    //             body: JSON.stringify({users})
    //         })

    // }

    // function addPlayers(team) {
    //     document.addEventListener('click', event => {
    //         if(event.target.id === 'select-player') {
    //             team.players.forEach(player => {
    //                console.log(player.playerName)
    //             })
    //         }
    //     })
    // }
})