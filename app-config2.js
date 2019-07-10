var clientID = 'qfz97qvzhnhio4agwc80cuni7q7xx6';
var redirectURL = 'https://tc.zx3.org/index2.html';

var twitchApiBaseUrl = 'https://api.twitch.tv/v5/';
var twitchApiBaseHeaders = new Headers({
    'Client-Id': clientID,
    'Accept': 'application/json',
    'Authorization': 'OAuth ' + localStorage.token,
    'Content-Type': 'application/json'
});
var twitchApiAuthUrl = 'https://api.twitch.tv/kraken/oauth2/authorize?client_id=' + clientID + '&redirect_uri=' + encodeURIComponent(redirectURL) + '&response_type=token&scope=channel:moderate+chat:edit+chat:read+whispers:read+whispers:edit';
