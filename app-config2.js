var clientID = 't2lcmeekc9o7mf1dh0c6l7ieqnz0d4';
var redirectURL = 'https://tc.zx3.org/index2.html';

var twitchApiBaseUrl = 'https://api.twitch.tv/v5/';
var twitchApiBaseHeaders = new Headers({
    'Client-Id': clientID,
    'Accept': 'application/json',
    'Authorization': 'OAuth ' + localStorage.token,
    'Content-Type': 'application/json'
});
var twitchApiAuthUrl = 'https://api.twitch.tv/kraken/oauth2/authorize?client_id=' + clientID + '&redirect_uri=' + encodeURIComponent(redirectURL) + '&response_type=token&scope=channel:moderate+chat:edit+chat:read+whispers:read+whispers:edit+chat_login+bits:read+clips:edit';
