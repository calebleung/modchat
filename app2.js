(function () {
    'use strict';

    var channel = {};
    var user = {};
    var pubsub = new PubSub();

    var ctrlActive = false;

    function initialize() {
        // Initialize app

        if (window.location.hash.length > 1) {
            let hash_parts = window.location.hash.substring(1).split(/[=&]/g);
            if (hash_parts.length > 2 && hash_parts[0] === 'access_token') {
                localStorage.token = hash_parts[1];
                window.location.hash = '';
                window.location.reload();
            } else {
                load_channel_data(window.location.hash.substring(1));
            }
        } else {
            $('#channel-prompt').modal({
                dismissible: false,
                complete: function () {
                    window.location.hash = document.getElementById('channel-prompt-input').value;
                    window.location.reload();
                }
            }).modal('open');
        }
    }

    function load_channel_data(channel_name) {
        console.log('Loading app for channel ' + channel_name);
        //document.getElementById('viewerlist').setAttribute('href', 'https://twitchstuff.3v.fi/chatters/?ch=' + encodeURIComponent(channel_name));

        fetch(twitchApiBaseUrl, { headers: twitchApiBaseHeaders })
            .then(response => response.json())
            .then(function (json) {
                if (!json.token.valid) {
                    window.location.replace(twitchApiAuthUrl);
                    return;
                }
                pubsub.connect();
                fetch(twitchApiBaseUrl + 'users/' + json.token.user_id, { headers: twitchApiBaseHeaders })
                    .then(response => response.json())
                    .then(function (json) {
                        user = json;
                        fetch(twitchApiBaseUrl + 'users/?login=' + encodeURIComponent(channel_name), { headers: twitchApiBaseHeaders })
                            .then(response => response.json())
                            .then(function (json) {
                                if (json.users.length === 0) {
                                    // Invalid channel name, ask again
                                    window.location.hash = '';
                                    initialize();
                                } else {
                                    fetch(twitchApiBaseUrl + 'channels/' + json.users[0]._id, { headers: twitchApiBaseHeaders })
                                        .then(response => response.json())
                                        .then(function (json) {
                                            channel = json;
                                            load_app();
                                        });
                                }
                            });
                    });
            });
    }

    function load_app() {
        document.getElementById('nav-userchannel').innerHTML = user.display_name + ' :: #' + channel.display_name;

        pubsub.listen('chat_moderator_actions.' + user._id + '.' + channel._id);
        pubsub.listen(`channel-bits-events-v2.${channel._id}`);
        //console.log('pubsub listen', `channel-bits-events-v2.${channel._id}`);
        var tmiclient = new ChatClient(user, channel, pubsub.post_event_to_dom);
        tmiclient.connect();
    }

    // Event handlers
    let feeds = document.getElementsByClassName('feed');
    let pause_icons = document.getElementsByClassName('pause');
    document.addEventListener('keydown', function (e) {
        if (app_settings.toggle_ctrl) {
            ctrlActive = !ctrlActive;
        }

        let keyName = e.key || e.char;
        if (keyName === 'Control') {
            for (let i = 0; i < feeds.length; i += 1) {
                feeds[i].classList.add('hovered');
                pause_icons[i].classList.remove('hidden');
            }
        }
    });
    document.addEventListener('keyup', function (e) {
        if (ctrlActive) {
            return;
        }

        let keyName = e.key || e.char;
        if (keyName === 'Control') {
            for (let i = 0; i < feeds.length; i += 1) {
                feeds[i].classList.remove('hovered');
                feeds[i].scrollTop = feeds[i].scrollHeight;
                pause_icons[i].classList.add('hidden');
            }
        }
    });
    document.getElementById('reason-prompt-input').addEventListener('keyup', function (e) {
        let keyName = e.key || e.char;
        if (keyName === 'Enter') {
            $('#reason-prompt').modal('close');
        }
    });
    document.getElementById('open-settings').addEventListener('click', function (evt) {
        $('#settings').modal().modal('open');
        evt.preventDefault();
    });
    document.getElementById('createClipAnchor').addEventListener('click', function (evt) {
        createClip(localStorage.token, channel._id);
        evt.preventDefault();
    });

    let noops = document.getElementsByClassName('no-op');
    for (let i = 0; i < noops.length; i += 1) {
        noops[i].addEventListener('click', function (evt) {
            evt.preventDefault();
        });
    }

    // Materialize initializations
    $('.tooltipped').tooltip({ delay: 50 });

    initialize();
})();
