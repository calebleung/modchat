var app_settings = {
    version: 8,
    hover_notification: true,
    use_high_res_emotes: false,
    timeout_durations: [0, 3600, 600, 1],
    modcard_hotkeys: ['b', 'h', 't', 'p'], // One for each timeout duration in order
    name_colors: true,
    prompt_reason: true,
    default_reason: '',
    report_hotkey: 'r',
    dark_mode: false,
    toggle_ctrl: false,
    merge_events: false
};

(function () {
    "use strict";

    // Defaults for necessary settings
    var default_settings = {
        modcard_hotkeys: ['b', 'h', 't', 'p'],
        report_hotkey: 'r'
    };

    // Load settings
    var settings = JSON.parse(localStorage.getItem('settings'));
    if (settings) {
        if (settings.version === app_settings.version) {
            app_settings = settings;
            Materialize.toast('Loaded settings', 2500);
        } else {
            settings['version'] = app_settings['version'];
            for (let val in app_settings) {
                if (typeof(settings[val]) == 'undefined') {
                    settings[val] = app_settings[val];
                }
            }
            Materialize.toast('New settings have been added.', 10000);
            localStorage.setItem('settings', JSON.stringify(app_settings));
            /// TODO: upgrade process: apply relevant settings on top of default app_settings
            //Materialize.toast('Settings level upgraded. Settings reset to avoid conflicts.', 10000);
            //localStorage.removeItem('settings');
        }
    }

    // Set inputs
    document.getElementById('hover-notification').checked = app_settings.hover_notification;
    document.getElementById('highres-emotes').checked = app_settings.use_high_res_emotes;
    document.getElementById('name-colors').checked = app_settings.name_colors;
    document.getElementById('prompt-reason').checked = app_settings.prompt_reason;
    document.getElementById('default-reason').value = app_settings.default_reason;
    document.getElementById('report-hotkey').value = app_settings.report_hotkey;
    document.getElementById('dark-mode').checked = app_settings.dark_mode;
    document.getElementById('toggle-ctrl').checked = app_settings.toggle_ctrl;
    document.getElementById('merge-events').checked = app_settings.merge_events;

    for (let i = 0; i < app_settings.timeout_durations.length; i += 1) {
        let input = document.getElementById('timeout-setting-' + i);
        input.value = app_settings.timeout_durations[i];
        input.addEventListener('change', function () {
            app_settings.timeout_durations[i] = parseInt(this.value, 10);
        });

        input = document.getElementById('timeout-hotkey-' + i);
        input.value = app_settings.modcard_hotkeys[i];
        input.addEventListener('change', function () {
            app_settings.modcard_hotkeys[i] = this.value = this.value ? this.value[0] : default_settings.modcard_hotkeys[i];
        });
    }

    // Apply DOM changes
    let el_html = document.getElementsByTagName('html')[0];
    if (app_settings.dark_mode) {
        el_html.classList.add('theme--dark');
    }

    // Listen for changes
    document.getElementById('open-settings').addEventListener('click', function() {
        let storage_size = get_localStorage_size();
        document.getElementById('database-size').innerHTML = '';
        document.getElementById('database-size').appendChild(document.createTextNode(storage_size));
    });
    document.getElementById('hover-notification').addEventListener('change', function () {
        app_settings.hover_notification = this.checked;
    });
    document.getElementById('highres-emotes').addEventListener('change', function () {
        app_settings.use_high_res_emotes = this.checked;
    });
    document.getElementById('name-colors').addEventListener('change', function () {
        app_settings.name_colors = this.checked;
    });
    document.getElementById('prompt-reason').addEventListener('change', function () {
        app_settings.prompt_reason = this.checked;
    });
    document.getElementById('default-reason').addEventListener('change', function () {
        app_settings.default_reason = this.value;
    });
    document.getElementById('report-hotkey').addEventListener('change', function () {
        app_settings.report_hotkey = this.value ? this.value[0] : default_settings.report_hotkey;
    });
    document.getElementById('dark-mode').addEventListener('change', function () {
        app_settings.dark_mode = this.checked;
        if (app_settings.dark_mode) {
            el_html.classList.add('theme--dark');
        } else {
            el_html.classList.remove('theme--dark');
        }
    });
    document.getElementById('toggle-ctrl').addEventListener('change', function () {
        app_settings.toggle_ctrl = this.checked;
    });
    document.getElementById('merge-events').addEventListener('change', function () {
        app_settings.merge_events = this.checked;
        Materialize.toast('Requires refresh to take effect.', 1000);
    });
    document.getElementById('database-clear').addEventListener('click', function () {
        clear_database();
        Materialize.toast('The database has been cleared!', 1000);
        $('#settings').modal('close');
    });
    document.getElementById('save-settings').addEventListener('click', function () {
        localStorage.setItem('settings', JSON.stringify(app_settings));
        Materialize.toast('Settings saved! Please note some settings require a refresh to take effect.', 5000);
        $('#settings').modal('close');
    });
})();