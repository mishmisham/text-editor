
export const demotextsettings = {
    commentaries:{
        1: {
            text: 'lorem epson'
        }
    },
    // todos: [],
    highlights: [
        {
            type: 'text-style',
            position: {
                rowStart: 2,
                start: 8,
                startSelection: 7,
                rowEnd: 4,
                end: 435,
                endSelection: 412
            },
            className: ['text-styles-italic'],
            styles: ['font-style: italic;']
        },
        {
        type: 'commentary-selection',
        data: {
            id: 1,
        },
        position: {
            rowStart: 16,
            start: 90,
            startSelection: 82,
            end: 191,
            endSelection: 180,
            rowEnd: 28,
        },
        className: ['commentary-selection-green'],
        styles: []
        },
    ]
}

export const demotext = [
    "01234",
    "56789",
    "10111",
    " ",
    "",
    "12345",
    "function a(props) {",
    "        const b = props.c;",
    "        let c = props.d;",
    "        var d = b + c;",
    "        props.content.forEach( item => {",
    "                if (a === b) {",
    "                        console.log(\"hello!\");",
    "                        throw new Error(\"error text\");",
    "                 }",
    "         ",
    "                 item += d;",
    "        });",
    "        return [ ...props.content ];",
    "}",
    "",
    "a({c:1, d: 2, e: \"3\"});",
    " ",
    "while ( true ) {",
    "        do {",
    "                switch (b):",
    "                        case '1'",
    "                                const e = (args) => [c, ...args];",
    "                                console.log( '1', e );",
    "                        case `2`",
    "                                continue ;",
    "                        case \"3\"",
    "                                break ;",
    "        }",
    "}",
    "",
    "this is very very very looooong string that we need to test positions and scroll positions and just to see this string",
    "",
    "",
    "",
    "",
    "",
].join('\n')