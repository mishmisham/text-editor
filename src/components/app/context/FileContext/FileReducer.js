

export default function FileReducer(state, action) {
    switch (action.type) {
        case 'setTree':
            return {
                ...state,
                tree: action.payload
            };
        default:
          throw new Error();
      }
}