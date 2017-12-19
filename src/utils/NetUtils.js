import Toast from 'react-native-root-toast';

export default NetUtils = {
    /**
     * http get 请求简单封装
     * @param url 请求的URL
     * @param successCallback 请求成功回调
     * @param failCallback 请求失败回调
     */
    get: (url, successCallback, failCallback) => {
        //默认参数
        let fetchOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (window.token || '')
            }
        };
        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code) {
                    Toast.show('您的网络不给力:(');
                    failCallback(responseJson.code);
                } else {
                    successCallback(responseJson);
                }
            })
            .catch((err) => {
                failCallback(err);
                Toast.show('您的网络不给力:(');
            });
    },

    /**
     * http post 请求简单封装
     * @param url 请求的URL
     * @param data post的数据
     * @param successCallback 请求成功回调
     * @param failCallback failCallback 请求失败回调
     */
    post: (url, data, successCallback, failCallback) => {
        // let formData = new FormData();
        // Object.keys(data).map(function(key) {
        //     var value = data[key];
        //     formData.append(key, value);
        // });

        let fetchOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (window.token || ''),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                // 'Content-Type': 'multipart/form-data',
            },
            // body: formData
            body: JSON.stringify(data)
        };

        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code) {
                    Toast.show('您的网络不给力:(');
                    failCallback(responseJson.code);
                } else {
                    successCallback(responseJson);
                }
            })
            .catch((err) => {
                failCallback(err);
                Toast.show('您的网络不给力:(');
            });
    },


    /**
     *
     */
    postForm: (url, data, successCallback, failCallback) => {
        let formData = new FormData();
        Object.keys(data).map((key) => {
            formData.append(key, data[key]);
        });

        let fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        };

        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code && responseJson.code !== 'K-000000') {
                    if ('K-000001' === responseJson.code) {
                        Toast.show('您的网络不给力:(');
                    } else if ('K-010102' === responseJson.code) {
                        Toast.show(`短信验证码错误!`);
                    } else {
                        Toast.show(responseJson.message);
                    }
                    failCallback(responseJson.code);
                } else {
                    successCallback(responseJson);
                }

            })
            .catch((error) => {
                console.log(error);
                failCallback();
                Toast.show('您的网络不给力:(');
            });
    },
    /**
     *登录
     */
    login: (url, user, password, successCallback, failCallback) => {
        let formData = new FormData();
        formData.append('user', user);
        formData.append('password', password);

        let fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        };

        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code) {
                    if ('K-000002' === responseJson.code) {
                        Toast.show('账号信息错误!');
                    } else if ('K-000001' === responseJson.code) {
                        Toast.show('您的网络不给力:(');
                    } else {
                        Toast.show(responseJson.message);
                    }
                    failCallback(responseJson.code);
                } else {
                    successCallback(responseJson);
                }

            })
            .catch((error) => {
                console.log(error);
                failCallback();
                Toast.show('您的网络不给力:(');
            });
    },


}