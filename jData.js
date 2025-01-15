function getElementDataAsObject(element) {
    let dataset = element.dataset
    let data = {}
    for (let d in dataset) {
        data[d] = dataset[d]
    }
    return data
}

function setElementDataFromObject(dataset) {
    let data = ''
    Object.keys(dataset).forEach(function (key) {
        data += 'data-' + key + '="' + dataset[key] + '" '
    })
    return data
}