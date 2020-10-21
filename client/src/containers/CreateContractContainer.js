import { connect } from 'react-redux';
import { updateSelectedContract } from '../actions/actions';
import { CreateContract } from '../components/CreateContract';


const mapDispatchToProps = dispatch => {
    return {
        updateSelectedContract: address => {
            dispatch(updateSelectedContract(address))
        }
    }
}

const CreateContractContainer = connect(null, mapDispatchToProps)(CreateContract)

export default CreateContractContainer
