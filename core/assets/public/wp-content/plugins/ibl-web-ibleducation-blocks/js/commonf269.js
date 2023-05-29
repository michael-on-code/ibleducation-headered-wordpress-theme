function fetchResource(url, callingWPBackend) {
    if (callingWPBackend == null) {
        callingWPBackend = false;
    }

    var headers = {
        'Content-Type': 'application/json'
    };

    if (callingWPBackend) {
        headers['X-WP-Nonce'] = dcomApiSettings.nonce
    }

    return fetch(url, {
        headers
    }).then(function (res) {
        if (!res.ok) {
            throw new Error(res.status);
        }
        var data = res.json();
        return data;
    }).catch(function (error) {
        console.error(error);
    });
}

function convertObjToQueryParamString(obj) {
    let string = '';
    for (var [name, value] of Object.entries(obj)) {
        if (string) string += '&';
        string += `${name}=${value}`;
    }
    return string;
}

function allEmpty(obj) {
    for (var key in obj)
        if (obj[key]) return true;
    return false;
}


function deleteChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
