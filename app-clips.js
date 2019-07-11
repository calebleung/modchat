function createClip(token, broadcaster_id) {
        fetch('https://api.twitch.tv/helix/clips',
        {
            headers: new Headers({
                'Client-Id': clientID,
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token,
                'Content-Type': 'application/json'
            }),
            method: 'POST',
            body: JSON.stringify({ 'broadcaster_id': broadcaster_id })
        })
        .then(response => response.json())
        .then(json => {
            console.log('clips', json);
            document.getElementById('clippy').innerHTML = `Your clip will be available at <a href="https://clips.twitch.tv/${json.data[0].id}" target="_blank">https://clips.twitch.tv/${json.data[0].id}</a>`;
        });
}
