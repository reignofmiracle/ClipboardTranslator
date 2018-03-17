import { remote } from 'electron'

export default function createContextMenu(state, setState) {
    let menu = new remote.Menu()
    menu.append(new remote.MenuItem({
        label: 'FontSize', submenu: [
            new remote.MenuItem({ label: '20px', type: 'radio', click: (v) => setState({ fontSize: v.label }) }),
            new remote.MenuItem({ label: '30px', type: 'radio', click: (v) => setState({ fontSize: v.label }) }),
            new remote.MenuItem({ label: '40px', type: 'radio', click: (v) => setState({ fontSize: v.label }) }),
            new remote.MenuItem({ label: '50px', type: 'radio', click: (v) => setState({ fontSize: v.label }) }),
            new remote.MenuItem({ label: '60px', type: 'radio', click: (v) => setState({ fontSize: v.label }) }),
            new remote.MenuItem({ label: '70px', type: 'radio', click: (v) => setState({ fontSize: v.label }) })
        ]
    }))
    menu.append(new remote.MenuItem({
        label: 'NewLine Sentence', type: 'checkbox', click: (v) => setState({ newline_sentence: v.checked })
    }))

    menu.items[0].submenu.items.find(function (elem) { return elem.label == state.fontSize }).checked = true
    menu.items[1].checked = state.newline_sentence
    return menu
}