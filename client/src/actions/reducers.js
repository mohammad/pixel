import { combineReducers } from 'redux'
import { BRUSH } from '../models/tools'
import { SHOW_GRID } from '../models/views'


function updateTool(state = BRUSH, action) {
    switch (action.type) {
        case 'UPDATE_TOOL':
            return action.tool
        default:
            return state
    }
}

function updateGridView(state = SHOW_GRID, action) {
    switch (action.type) {
        case 'UPDATE_VIEW':
            return action.view
        default:
            return state
    }
}

function updateSelectedContract(state = null, action) {
    switch (action.type) {
        case 'UPDATE_SELECTED':
            return action.address
        default:
            return state
    }
}


export default combineReducers({
    tool: updateTool,
    view: updateGridView,
    contract: updateSelectedContract
})
