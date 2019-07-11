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
            document.getElementById('clippy').innerHTML = json.edit_url;
        });
}
