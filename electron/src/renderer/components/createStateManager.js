import storage from 'electron-json-storage'

class StateManager {
    constructor() {
    }

    getState(update) {
        storage.get('state', function (error, data) {
            if (!error) {
                var state = {
                    'translateFrom': 'en',
                    'translateTo': 'ko',
                    'newline_sentence': false,
                    'fontSize': '30px'
                }

                if (data.translateFrom) state.translateFrom = data.translateFrom
                if (data.translateTo) state.translateTo = data.translateTo
                if (data.newline_sentence) state.newline_sentence = data.newline_sentence
                if (data.fontSize) state.fontSize = data.fontSize

                update(state)
            }
        })
    }

    setState(settings) {
        storage.set('state', settings, function (error) {
            if (error) console.error(error)
        })
    }
}

function createStateManager() {
    return new StateManager()
}

export default createStateManager