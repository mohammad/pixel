export function updateTool(tool) {
    return {
        type: 'UPDATE_TOOL',
        tool: tool
    }
}

export function updateGridView(updatedView) {
    return {
        type: 'UPDATE_VIEW',
        view: updatedView
    }
}

export function updateSelectedContract(address) {
    return {
        type: 'UPDATE_SELECTED',
        address: address
    }
}

