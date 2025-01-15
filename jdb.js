function jsonDomBuilder(node) {
    let element = document.createElement(node.tag)

    if (node["class"] !== undefined && Array.isArray(node["class"]) && node["class"].length > 0) {
        node.class.forEach((item) => {
            element.classList.add(item)
        })
    }
    if (node["text"] !== undefined) {
        element.textContent = node.text
    }
    if (node["attributes"] !== undefined) {
        Object.keys(node.attributes).forEach(function (key) {
            if (key === 'data') {
                Object.keys(node.attributes.data).forEach(function (key_data) {
                    element.setAttribute('data-' + key_data, node.attributes.data[key_data])
                })
            } else {
                if (node.attributes[key] === false) {
                    element.removeAttribute(key)
                } else {
                    element.setAttribute(key, node.attributes[key])
                }
            }
        });
    }
    if (node["child"] !== undefined) {
        node.child.forEach((item) => {
            element.append(jsonDomBuilder(item))
        })
    }
    if (node["listener"] !== undefined) {
        if (Array.isArray(node["listener"])) {
            node.listener.forEach((item) => {
                let params = (item.params !== undefined ? item.params : {})
                if (item.type === "onLoad") {
                    Promise.resolve(element).then(function (element) {
                        window[item.func](element,params)
                    })

                } else {
                    element.addEventListener(item.type, function (event) {
                        window[item.func](event, params)
                    })
                }
            })
        } else {
            element.addEventListener('click', function (event) {
                let params = target.getAttribute('data-params')
                let target = event.target
                if (!event.target.classList.contains('json-event')) {
                    target = event.target.closest('.json-event')
                }
                let func = target.getAttribute('data-function')
                return window[func](target, event, params)
            })
        }

    }
    return element
}