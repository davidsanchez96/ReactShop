import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
} from 'react-native';
import Badge from "../components/Badge";

const cartIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjI3MDM2RTI3NjBBMTFFNUJDMzVGOUQ3Q0M1OTVEOUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjI3MDM2RTM3NjBBMTFFNUJDMzVGOUQ3Q0M1OTVEOUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMjcwMzZFMDc2MEExMUU1QkMzNUY5RDdDQzU5NUQ5QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMjcwMzZFMTc2MEExMUU1QkMzNUY5RDdDQzU5NUQ5QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pibw6G4AAAPlSURBVHja7FptaE1xGD+Xa7vYhsWKqEWkhS+bRqJtWAzzAYUbPqiR8kFePmyKi0gI+bakFMp8WJGZbLOND17K5OW6MWqTt0LLvBvX7+k+//rvdO62837u7T7127Nzz9n/nt95nv/zduaLRqNKssogJYklRS5FzoPipx/V1dVNUMX9XNsIhCoqKm7FuwDruEoG92bYcvOBVhCYnlBuCcYlUOlAgLUW6vhvliaUWzLB331dCItdhipjCx5KtoDSyLoYRAOJQM6np0IBqbdQY4GFsHSDxvkpLkfgbKAD9/aml1sOUGqBLRxZG1TELkCt8YDBPgJjjJC7yuQoqFSpzrUDEfIGwOmClb5vJHvVB6NumQHVzYejYf5PHspz+4HdwE7c11HdFQr+6CvUPT4s8lj8WKkKfIY2f52U1L0itMemAt9hgDYz5EQgWeYhcvNYXzFbON8FeoDx2GO5HiNXb4oczN4jWa9E45JMh0EFxRL+7hua5ZdOuQYsAkqBM9Ln54Cgw1b7xbVvRCRvs/1cE+vFqs9HSHnHqfyWrgp05sjhCT2B6gKyVC0QBZksYBgw1CFUqR64abcU1UqQXfOx9Hm3w25ZzvqmlWMGsXlXuBglKZgUAs8ox1lJTjyp2XDNTJfIiULivKUDIuy7TqhXosdziVy5tEUUKy0nLzrXJXKrgM/Awz7HDCZccyu7JlXiax2eIoyi5rTfGYpBaWY9h+G0UJ77AgwB/pgaM8Tp8agFmglsYjd1eszwXhBTzy39Fixez+So5XB3KmtxQJHbjKDiMTFNDq5wH4o69By2XlJZjuS6B7tzy8iJUqzUS+T8Fq3TLFUMrQ5zeEG7A/hrF7mXvO8yXKhW6Ps220aORg/c101wMHn7+PdOrQRuSRJXJXRX95gdSVxLaL4yC0gDHgE1wD+LXHAB15TPOcd22B1QhFBfV6uREg5wBd9mYt0afmiynAK2ASfsTAVCbjOxd8BeYJcSm3NOUmJjeCN7kvbWHSZG07V8YBqwj88fB1bbSg77bQPUDCAMTARCwBF2zxr2kmMGlqaCPI+JrQMeAE+BPUAlX3OaOwPbLCdmKTuAnxo3SLIcGKxzXfHOL6Rxjl5f0+vu4UCBneSypaSqli7WaQw9ksU6XkASn+fYSa6dtdYLkgKp9/qhc90I60qNc+QlgXgP1UpyZ1kfVnq/Q6D9d1F1ja7tzHojcBLIBcYB23lPiwcbtjuJUydexodhtlI+H1MEnQx8M/jg1vdxvghoMfMfRAMRettyieu8PIkYpYNCg8RIKBIfVGIv84XQEPY1N8kttpdfSdeJp8ilyKXIpcgJ+S/AANNC9+pEQUUnAAAAAElFTkSuQmCC';
export default class Shopping extends Component {
    static navigationOptions = {
        tabBarLabel: '购物车',
        tabBarIcon: ({tintColor}) => (
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <Image source={{uri: cartIcon, scale: 2}}
                       style={{
                           width: 25,
                           height: 25,
                           tintColor: tintColor,
                       }}
                />
                <Badge badge={12}/>
            </View>
        ),
    }

    render() {
        return <Text>Shopping</Text>
    }
}