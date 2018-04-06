/*
{
    user: userstate.username,
    timestamp: date.toLocaleDateString() + ' ' + time,
    msg: message,
    msg_id: msg_id,
    channel: this.channel.name
}
*/

var db_users;

var db = new loki('msg_history.db', {
    autoload: true,
    autoloadCallback : db_init,
    autosave: true, 
    autosaveInterval: 10000
});

var channel_name = window.location.hash.substring(1);

var tribute = new Tribute({
    values: [],
});

tribute.attach(document.getElementById('chat-feed-input'));

function tribute_init() {
    let all_msgs = db_users.find({channel: channel_name});
    let users = [];
    let user = '';

    for (let i = 0; i < all_msgs.length; i++) {
        user = all_msgs[i]['user'];
        if (!users.includes(user)) {
            add_autocomplete_user(user)
            users.push(user);
        }
    }
}

function db_init() {
    if (!db.getCollection('users')) {
        db.addCollection('users', {indices: ['users']});
    }

    db_users = db.getCollection('users');

    tribute_init();
}

function add_msg(data) {
    if (db_users.count({user: data.user, channel: data.channel}) == 0) {
        add_autocomplete_user(data.user);
    }

    if (db_users.count({user: data.user, channel: data.channel}) > 4) {
        db_users.findAndRemove({
            msg_id: db_users.findOne({user: data.user, channel: data.channel}).msg_id
        });
    }
    db_users.insert(data);
}

function refresh_modal(data) {
    return db_users.find({user: data.user, channel: data.channel});
}

function clear_database() {
    db_users.clear();
}

function add_autocomplete_user(user) {
    tribute.append(0, [
        {key: user, value: user}
    ]);
}

// from https://stackoverflow.com/a/17887889

function get_localStorage_size() {
    let allStrings = '';
    for (let key in window.localStorage) {
        if (window.localStorage.hasOwnProperty(key)) {
            allStrings += window.localStorage[key];
        }
    }
    return allStrings ? '~' + Number.parseFloat(3 + ((allStrings.length*16)/(8*1024))).toFixed(2) + ' KB' : 'Empty (0 KB)';
}