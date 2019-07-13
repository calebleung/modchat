function linkifyEscape(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function setLinkifiedContent(content) {
    var out     = linkifyEscape(content),
        matches = linkify.match(content),
        result  = [],
        last;

    if (matches) {
        last = 0;
        matches.forEach(function (match) {
            if (last < match.index) {
                result.push(linkifyEscape(content.slice(last, match.index)).replace(/\r?\n/g, '<br>'));
            }
            result.push('<a target="_blank" href="');
            result.push(linkifyEscape(match.url));
            result.push('">');
            result.push(linkifyEscape(match.text));
            result.push('</a>');
            last = match.lastIndex;
        });
        if (last < content.length) {
            result.push(linkifyEscape(content.slice(last)).replace(/\r?\n/g, '<br>'));
        }
        out = result.join('');
    }

    return out;
}