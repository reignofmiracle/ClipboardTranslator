import storage from 'electron-json-storage'

class SettingManager {
    constructor() {
    }

    loadSettings(update) {
        storage.get('settings', function (error, data) {
            if (!error) {
                var settings = {
                    'translateFrom': 'en',
                    'translateTo': 'ko',
                    'newline_sentence': false,
                    'fontSize': '30px'
                }

                if (data.translateFrom) settings.translateFrom = data.translateFrom
                if (data.translateTo) settings.translateTo = data.translateTo
                if (data.newline_sentence) settings.newline_sentence = data.newline_sentence
                if (data.fontSize) settings.fontSize = data.fontSize

                update(settings)
            }
        })
    }

    saveSettings(settings) {
        storage.set('settings', settings, function (error) {
            if (error) console.error(error)
        })
    }
}

function createSettingManager() {
    return new SettingManager()
}

export default createSettingManager