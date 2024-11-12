export const brackets = {
    '(': {
        type: 'round-bracket',
        mode: 'open',
        groups: [
            'brackets',
            'function-brackets',
            'mathematic-brackets',
        ],
    },
    ')': {
        type: 'round-bracket',
        mode: 'close',
        groups: [
            'brackets',
            'function-brackets',
            'mathematic-brackets',
        ]
    },
    '{': {
        type: 'figure-bracket',
        mode: 'open',
        groups: [
            'brackets',
            'object-brackets'
        ]
    },
    '}': {
        type: 'figure-bracket',
        mode: 'close',
        groups: [
            'brackets',
            'object-brackets'
        ]
    },
    '[': {
        type: 'square-bracket',
        mode: 'open',
        groups: [
            'brackets',
            'array-brackets'
        ]
    },
    ']': {
        type: 'square-bracket',
        mode: 'close',
        groups: [
            'brackets',
            'array-brackets'
        ]
    },
    '<': {
        type: 'corner-bracket',
        mode: 'open',
        groups: [
            'brackets',
            'operators',
            'tag-brackets',
        ]
    },
    '>': {
        type: 'square-bracket',
        mode: 'close',
        groups: [
            'brackets',
            'operators',
            'tag-brackets',
        ]
    },
}