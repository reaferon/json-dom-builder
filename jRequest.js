function jsonRequest(url, dataFields) {
    let formData = new FormData();
    let headers = {'X-Requested-With': 'XMLHttpRequest'}

    let csfr = jsonCSRF()
    if (csfr !== '') {
        headers['X-CSRF-TOKEN'] = csfr;
        formData.append('_csrf', csfr);
    }
    
    
    Object.keys(dataFields).forEach(key => {
        if(key === 'Authorization') {
            headers.Authorization = dataFields[key]
        }
        formData.append(key, dataFields[key]);
    });
    let options = {
        credentials: 'same-origin',
        method: "POST",
        mode: "cors",
        headers: headers,
        body: formData
    }
    //let  resp = false;
    return fetch(url, options)
        .then(response => response.json())
        .then(function (response) {
            return response
        })
        .catch(error => console.log("error", error));

    //return resp
}

function jsonCSRF() {
    let metaList = document.getElementsByName('csrf-token');
    let csrf = '';
    metaList.forEach(function (item, i) {
        if (item.getAttribute('content').length > 10) {
            csrf = item.getAttribute('content');
        }
    });

    return csrf;
}