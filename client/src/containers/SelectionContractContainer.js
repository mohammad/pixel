import { connect } from 'react-redux';
import { updateSelectedContract } from '../actions/actions';
import { SelectContract } from '../components/SelectContract';


const mapStateToProps = state => {
    return {
        contract: state.contract
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSelectedContract: address => {
            dispatch(updateSelectedContract(address))
        }
    }
}

const SelectContractContainer = connect(mapStateToProps, mapDispatchToProps)(SelectContract);

export default SelectContractContainer;
