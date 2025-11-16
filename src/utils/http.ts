import { useUserStore } from "@/stores/user/user";

/* 基础地址 */
const baseUrl = 'http://localhost:8080'

/* 拦截器对象 */
const httpIterceptor = {
    // 请求前拦截
    invoke: (options: UniApp.RequestOptions | UniApp.UploadFileOption) => {
        // 1.非http请求需拼接地址
        if (!options.url.startsWith('http')) {
            options.url = baseUrl + options.url;
        }
        // 2.请求超时处理10s
        options.timeout = 10000;
        // 3.小程序请求头标识
        options.header = {
            ...options.header,
            'source-client': 'miniapp'
        }
        // 4.添加token请求头标识
        const userStore = useUserStore();
        const token = userStore.token;
        if (token) {
            options.header.Authorization = token;
        }
    }
}


/* 拦截器配置 */
uni.addInterceptor('request', httpIterceptor);
uni.addInterceptor('uploadFile', httpIterceptor);

/* 返回类型 */
type Data<T> = {
    code: string,
    msg: string,
    data: T
}

/* 封装Promise 请求函数 */
export function http<T>(options: UniApp.RequestOptions | UniApp.UploadFileOption): Promise<Data<T>> {
    return new Promise<Data<T>>((resolve, reject) => {
        uni.request({
            ...options,
            // 请求成功
            success: (res: UniApp.RequestSuccessCallbackResult) => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data as Data<T>);
                } else if (res.statusCode === 401) {
                    useUserStore().clearToken();
                    uni.navigateTo({ url: '/pages/login/login' })
                    reject(res);
                } else {
                    uni.showToast({
                        title: (res.data as Data<T>).msg || '请求错误',
                        icon: 'none'
                    })
                    reject(res);
                }
            },
            // 请求失败
            fail: (err: UniApp.GeneralCallbackResult) => {
                uni.showToast({
                    title: '请求错误',
                    icon: 'none'
                })
                reject(err);
            }
        })
    })
}