import React, {Component} from 'react';
import {
    Text,
    Image,
} from 'react-native';
const menuIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjI2RTZDRjM3NjBBMTFFNUJDMzVGOUQ3Q0M1OTVEOUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjI2RTZDRjQ3NjBBMTFFNUJDMzVGOUQ3Q0M1OTVEOUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMjZFNkNGMTc2MEExMUU1QkMzNUY5RDdDQzU5NUQ5QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMjZFNkNGMjc2MEExMUU1QkMzNUY5RDdDQzU5NUQ5QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlKQscEAAAGiSURBVHja7JgxS8NAGIZbtQoODs5qpYigkyDq7ujmDxCHlgyC6KIVcRNKBwXBLXMXQRAsopubi6s4uvgfHMQQn4MbQkkvGYRc6/vBy5eU3Nd7ch+991qO47g0rDFSGuIQnOAEJzjBCU5wgvMvxpI3YRguk25RBe0GQfCSNojnFkgdNO8BQ4QemWvDCUdcoiV7fY1W+xRsoQ2PFqmOGllt+ZC47jqKPXnWgV9pH5Z7jzy03DZpnGW+cVXjuU3SoqmBijo3me/+MS+b+X5mwuUN4ApdKmC0FQhOcIITnOBknHs25xPjUFCbjfLbMXYP1YqaeMJERNahPGedCtqkpr2tWkOaVviMdO7RIh1bK+Zsy7nEddVRbHYQ2/IATdi23HeMa9pnamlvrADj3M11KpBx1lYgOMEJTnCCG1zjbKxVhU3yI2PsNJop2DgbhxIx17dMh8KALdI9GkU7DOr0KWz+s7xDU54s0itzXc9qyyMLZuLUUezQIzATa3na8gKtWOiWo9gVMm9q0hO49z81zvq1FJzgBCc4wQlOcIIT3H+C+xVgAMHNYTAfrxIUAAAAAElFTkSuQmCC';
export default class Goods extends Component {
    static navigationOptions = {
        tabBarLabel:'商品分类',
        tabBarIcon:({tintColor})=>(
            <Image source={{uri: menuIcon, scale: 2}}
                   style={{
                       width: 25,
                       height: 25, tintColor: tintColor
                   }}
            />
        ),
    }
    render() {
        return <Text>Goods</Text>
    }
}