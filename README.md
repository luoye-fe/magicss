Magicss
--------------------------------

### Magicss - apply your css rules real-time while printing them on the screen.

[Live demo in here](http://luoye.pw/magicss/)

![gif](./docs/static/magicss.gif)

#### Installation

Using script tag: 

```html
<script type="text/javascript" src="magicss.min.js"></script>
```

Using CJS/ES Module

```js
import Magicss from 'magicss';

// or

var Magicss = require('Magicss');
```

#### Usage

Magicss split your css source text to each chunk, and print each character in turn.

For example, 

```js
const magicss = new Magicss({
    source: 
`/* global Magicss */
* {
    -webkit-transition: all ease 1s;
}
html, body {
    background: #2d2d2d;
}
`,
    codeCon: document.getElementById('work_con')
});
console.log(magicss.format());
```

```json
// result
[{
    "type": "comment",
    "comment": "/* global Magicss */\n",
    "options": {}
}, {
    "type": "common",
    "selector": "*",
    "options": {},
    "style": { "-webkit-transition": "all ease 1s" }
}, {
    "type": "common",
    "selector": "html, body",
    "options": {},
    "style": { "background": "#2d2d2d" }
}]

```

Details as follow.

* Magicss init:

    New instance, and apply `init()` func.

    ```js
    const magicss = new Magicss({
        source: 
    `/* global Magicss */
    * {
        -webkit-transition: all ease 1s;
    }
    html, body {
        background: #2d2d2d;
    }
    `,
        codeCon: document.getElementById('work_con'),
        onChange: function(process, argvs) {
            console.log(process);
            console.log(argvs);
        }
    });

    magicss.init();
    ```

* Magicss setOptions:

    If use `setOptions`, you don't need to apply `init()` func.
        
    Beacuse of all process is async, so you must apply `stop()` then apply `setOptions()`.

    ```js
    const magicss = new Magicss();

    magicss.stop().then(() => {
        magicss.setOptions({
                source: 
    `/* global Magicss */
    * {
        -webkit-transition: all ease 1s;
    }
    html, body {
        background: #2d2d2d;
    }
    `,
                codeCon: document.getElementById('work_con'),
                onChange: function(process, argvs) {
                    console.log(process);
                    console.log(argvs);
                }
            })
    })
    ```

* Magicss process control

    ```
    Magicss.paused(); // paused process
    Magicss.continue(); // continue process
    Magicss.toggle(); // toggle process
    ```

* Magicss format

    Return all chunks.

    ```js
    Magicss.format();
    ```
    

* Instance options details

    | name | require | type | desc  |
    | ----:| -------:| -------:| -----:|
    | source | true | String | css source text|
    | codeCon | true | Dom | print css text in this |
    | onChange | false | Function | When the change is triggered.<br>Return two arguments, <br>`process`:  `start/processing/stop`; <br>`argvs`: each chunk details.

* Source options detailes
    
    In css source text, you can set options for them, like, `delay` or `speed`.

    `delay`: wait `delay` ms, before print each chunk.

    `speed`: each character `speed` ms.
    
    example: 

    ```css
    /* {{ delay: 1000; speed: 40 }}
     * this is comment.
     */
    ```

    or

    ```css
    * {
        /* delay: 2000; speed: 40 */
        color: #fff;
    }
    ```

#### Develop

* clone this repo

* use `yarn` install `node_modules`, `yarn install`

* dev: `yarn run dev`

* build: `yarn run build`
