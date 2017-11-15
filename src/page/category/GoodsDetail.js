import React, {Component} from 'react';
import {
    Text,
} from 'react-native';
import {connect} from 'react-redux';

 class GoodsDetail extends Component {
    render() {
        return <Text>GoodsDetail</Text>
    }
}
const mapStateToProps = (state) => ({
    searchReducer: state.searchReducer
});
export default connect(mapStateToProps)(GoodsDetail);