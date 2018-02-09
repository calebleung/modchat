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

function db_init() {
    if (!db.getCollection('users')) {
        db.addCollection('users', {indices: ['users']});
    }

    db_users = db.getCollection('users');
}

function add_msg(data) {
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