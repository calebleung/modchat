function createClip(broadcaster_id) {
        fetch('https://api.twitch.tv/helix/clips',
        {
            headers: twitchApiBaseHeaders,
            method: 'POST',
            body: JSON.stringify({ 'broadcaster_id': broadcaster_id })
        })
        .then(response => response.json())
        .then(json => {
            console.log('clips', json);
            document.getElementById('clippy').innerHTML = json;
        });
}
