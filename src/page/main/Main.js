import React, {Component} from 'react';
import {
    Image,
    SectionList,
    StyleSheet,
    View,
    Text,
    Dimensions,
    InteractionManager,
    TouchableOpacity,
} from 'react-native';
import {getMain} from "../../action/mainActions";
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';
import FloorOne from '../components/FloorOne';
import FloorTwo from '../components/FloorTwo';
import FloorThree from '../components/FloorThree';
import FloorFour from '../components/FloorFour';
import FloorFive from '../components/FloorFive';

const homeIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjI2RTZDRUY3NjBBMTFFNUJDMzVGOUQ3Q0M1OTVEOUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjI2RTZDRjA3NjBBMTFFNUJDMzVGOUQ3Q0M1OTVEOUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMjZFNkNFRDc2MEExMUU1QkMzNUY5RDdDQzU5NUQ5QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMjZFNkNFRTc2MEExMUU1QkMzNUY5RDdDQzU5NUQ5QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtmJkfYAAAbISURBVHja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';
const WIDTH = Dimensions.get('window').width;

class Main extends Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: '首页',
        tabBarIcon: ({focused, tintColor}) => (
            <Image source={{uri: homeIcon, scale: 2}}
                   style={{
                       width: 25,
                       height: 25, tintColor: tintColor
                   }}
            />

        ),
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(getMain());
        })
    }

    refreshing() {

    }


    render() {
        const sections = [];
        const {mainReducer} = this.props;
        let floors = mainReducer.data.floors;
        for (let i = 0; i < floors.length; i++) {
            let data = [];
            data.push(floors[i]);
            sections.push({data: data, renderItem: this._renderItemFloorOne});
        }
        sections.push({title: ' ', data: []});
        return (
            <View>
                <SectionList
                    ListHeaderComponent={() => this._renderTableHeader()}
                    renderItem={({item}) => <Text> 324</Text>}
                    renderSectionHeader={({section}) => {
                        return (
                            section.title ?
                                <Text> {section.title}</Text> :
                                null
                        );
                    }
                    }
                    stickySectionHeadersEnabled={false}
                    keyExtractor={item => item.title}
                    removeClippedSubviews={false}
                    sections={sections}
                    onRefresh={() => {
                        let timer = setTimeout(() => {
                            clearTimeout(timer)
                            alert('刷新成功')
                        }, 4000)
                    }}
                    refreshing={false}
                    onEndReachedThreshold={0}
                    onEndReached={
                        () => {
                            alert('刷新成功')
                        }
                    }
                />
            </View>
        );


    }

    _renderTableHeader = () => {
        const {mainReducer} = this.props;
        let banner = mainReducer.data.sliders;
        return (
            <Swiper
                style={{}}
                height={WIDTH * 0.55}>
                {
                    banner.map((slider, i) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                key={i}
                            >
                                <Image source={{uri: slider.img}} style={styles.slide}/>
                            </TouchableOpacity>
                        )
                    })
                }
            </Swiper>
        );
    }

    _renderItemFloorOne = ({item}) => {
        switch (item.template) {
            case '1':
                return (

                    <FloorOne data={item}/>
                );
                break;
            case '2':
                return (

                    <FloorTwo data={item}/>
                );
                break;
            case '3':
                return (

                    <FloorThree data={item}/>
                );
                break;
            case '4':
                return (

                    <FloorFour data={item}/>
                );
                break;
            case '5':
                return (

                    <FloorFive data={item}/>
                );
                break;
            default:
                return (
                    null
                );
                break;
        }

    };
}

const styles = StyleSheet.create({
    customDot: {
        backgroundColor: 'white',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },

    customActiveDot: {
        backgroundColor: 'red',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },
    slide: {
        width: WIDTH,
        height: 0.55 * WIDTH
    }
});

const mapStateToProps = (state) => ({
    mainReducer: state.mainReducer
});
export default connect(mapStateToProps)(Main);