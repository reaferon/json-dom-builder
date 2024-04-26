## json-dom-builder
 
Constructing a DOM-object from JSON

### from

```
    let json_test = {
        'tag': 'ul',
        'class': ['json__list'],
        'child': [
            {
                'tag':'li',
                'class': ['json__item'],
                'text': 'one'
            },
            {
                'tag':'li',
                'class': ['json__item', 'json__item_red'],
                'text': 'two'
            },
            {
                'tag':'li',
                'class': ['json__item'],
                'child': [
                    {
                        'tag': 'button',
                        'text': 'Click me',
                        'attributes': {'data-text': 'pfuf', 'id':'jdb-button'},
                        'listener': [
                            {'type': 'click', 'func': 'buttonWasClicked'},
                            {'type': 'onLoad', 'func': 'buttonWasLoaded'},
                        ]
                    }
                ]
            },
        ]
    }
```

### to
```
<ul class="json__list">
    <li class="json__item">one</li>
    <li class="json__item json__item_red">two</li>
    <li class="json__item">
        <button data-text="pfuf" id="jdb-button" class="json__button_blue">Click me</button>
    </li>
</ul>
```