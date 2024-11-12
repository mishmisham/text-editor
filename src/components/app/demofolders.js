
export const demofolders = {

    currentView: {
        view: 1,
        file: null
    },

    views: [
        [
            6, 4
        ],
        [
            5
        ]
    ],
    
    tree: [
        {
            id: 1,
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut',
            type: 'folder',
        },
        {
            id: 2,
            name: 'folder 2',
            type: 'folder',
        },
        {
            id: 3,
            name: 'folder 3',
            type: 'folder',
            parent: 2
        },
        {
            id: 4,
            name: 'index.js',
            type: 'file',
            parent: 1,
            content: 'import { myCoolComponent } from "./code.js;"'
        },
        {
            id: 5,
            name: 'code.js',
            type: 'file',
            parent: 1,
            content: ' // TODO: add comment highlight to analyser \n        console.log("qwerty, hello world!")',
            textSettings: {
                commentaries: {},
                highlights: []
            }
        },
        {
            id: 6,
            name: 'text.txt',
            type: 'file',
            parent: 2,
            content: 'qwerty йцукенг',
            textSettings: {
                commentaries: {},
                highlights: []
            }
        },
        {
            id: 7,
            name: 'lorem epson.txt',
            type: 'file',
            parent: 3,
            content: 'Lorem ipsum qwerty dolor sit amet, consectetur adipiscing elit. qwerty Sed do eiusmod tempor incididunt ut',
            textSettings: {
                commentaries: {},
                highlights: []
            }
        },
        {
            id: 8,
            name: '.gitignore',
            type: 'file',
            content: '/node_modules\n/.pnp\n.pnp.js',
            textSettings: {
                commentaries: {},
                highlights: []
            }
        }
    ],
}