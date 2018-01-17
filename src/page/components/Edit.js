'use strict';
import React, {Component} from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {connect} from "react-redux";


/**
 * badge组件
 */
class Edit extends Component {

    render() {
        const {editReducer} = this.props;
        let count = editReducer.get('count');
        let editable = editReducer.get('editable');

        return (
            <TouchableOpacity
                style={{padding: 10}}
                onPress={this.props.onPress}
                disabled={count <= 0}
                activeOpacity={0.8}>
                {count > 0 ?
                    editable ?
                        <Text style={{color: '#666'}}
                              allowFontScaling={false}>取消</Text>
                        : <Text style={{color: '#666'}}
                                allowFontScaling={false}>编辑</Text>
                    : null
                }
            </TouchableOpacity>
        );
    }

}


const mapStateToProps = (state) => ({
    editReducer: state.get('editReducer')
});
export default connect(mapStateToProps)(Edit);
