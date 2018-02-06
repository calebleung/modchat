# Mod Chat



## Features

* Hold `<ctrl>` to stop chat from scrolling. Release to be taken to latest messages.
* `<click>` a username to append an `@username` to your message. 
* `<shift+click>` a username to open a more detailed panel
* `<click>` an emote to append to your message.
* Removed messages have been strike-through and have less opacity instead of `<message deleted>`. On mouseover, the strike-through is removed for clarity during review.

## Shortcuts

By default, there are 5 hotkeys which are only active in the `<shift+click>` panel.

They correspond to the 4 timeout buttons and Report. By default:

* `b` - Ban
* `h` - 1 hour
* `t` - 10 minutes
* `p` - 1 second
* `r` - Report

These keys can be changed in the `Timeouts` section of the `Settings`.

## Settings

`Settings` can be accessed via the gear menu at the top-left. Most are self-explanitory. 

Under `Timeouts`, note the following: The first three sliders move at 60 second intervals and the last is adjusted for 1 second intervals.

## To Do

* Resolve Known Issues
* Last `<x>` messages from `@username` to detailed panel of said user.
* Input field in detailed panel that is similar to whisper. Basically, same as regular chat but already includes an `@username`.
* Ability to save custom messages for re-use
* Add a toggle option for `<ctrl>` pause
* Add visual customizations:
  * Text size
  * Line spacing
  * Vertical view  

## Known Issues

Not at feature parity with regular Twitch chat:

* No emote list
* Emotes sent from client are not parsed on client-side as emotes. Displays properly to everyone else.
* No full viewer list. (Original code used a third-party.)
* No tab-completion for usernames.
* No highlighting for usernames.