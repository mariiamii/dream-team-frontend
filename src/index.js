document.addEventListener("DOMContentLoaded", () => {
    const url = 'http://localhost:3000/teams'
    const playersUrl = 'http://localhost:3000/players'
    const dropdown = document.querySelector('#team-names')
    const playersBtn = document.querySelector('#view-players')
    const body = document.querySelector('body')
    const userPlayers = document.querySelector('.user-dream-players')

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

    document.addEventListener('click', event => {
        if(event.target.id === 'select-player') {
            const nameElement = event.target.parentNode.children[0].innerText
            const nameLi = document.createElement('li')
            nameLi.innerText = nameElement
            userPlayers.append(nameLi)
            
            playerObj = {
                "playerName": nameElement
            }

            fetch(playersUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(playerObj)
            })
        }
    })

    fetch(playersUrl)
    .then(resp => resp.json())
    .then(players => players.forEach(player => renderPlayer(player)))

    function renderPlayer(player) {
        const addPlayer = document.createElement('li')
        addPlayer.textContent = player.playerName

        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'delete-btn'
        deleteBtn.textContent = 'Remove Player'

        addPlayer.append(deleteBtn)
        userPlayers.append(addPlayer)
    }

    document.addEventListener('click', event => {
        if(event.target.className === 'delete-btn') {
            fetch(playersUrl, {
                method: 'DELETE'
            })
            .then(event.target.parentNode.remove)
            // console.log(event.target.parentNode)
        }
    })
})