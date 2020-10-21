import { connect } from 'react-redux'
import { Canvas } from '../components/Canvas'

// Magically makes all items within object available as props
const mapStateToProps = state => {
    return {
        tool: state.tool,
        view: state.view,
        contract: state.contract
    }
}


const CanvasContainer = connect(mapStateToProps, null)(Canvas)

export default CanvasContainer