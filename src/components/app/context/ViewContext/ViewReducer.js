

export default function ViewReducer(state, action) {
    switch (action.type) {
        case 'setViews':
            return {
                ...state,
                views: action.payload
            };
        case 'setCurrentView':
            return {
                ...state,
                currentView: action.payload
            };
        default:
          throw new Error();
      }
}