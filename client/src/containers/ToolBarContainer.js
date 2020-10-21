import { connect } from 'react-redux'
import { updateTool, updateGridView } from '../actions/actions'
import { ToolBar } from '../components/Toolbar'


// Magically makes all items within object available as props
const mapStateToProps = state => {
    return {
        tool: state.tool
    }
}

// Magically makes all actions within object available as props
const mapDispatchToProps = dispatch => {
    return {
        updateTool: tool => {
            dispatch(updateTool(tool))
        },
        updateGridView: view => {
            dispatch(updateGridView(view))
        }
    }
}

const ToolBarContainer = connect(mapStateToProps, mapDispatchToProps)(ToolBar)

export default ToolBarContainer
