import originAxios from 'axios'

export default function baseAxiso(option) {
    return new Promise((resolve, reject)=>{
        const netInstance = originAxios.create({
            // baseURL:process.env.VUE_APP_BASE_API,
            timeout:5000
        })

        netInstance.interceptors.request.use(req=>{
            // 请求拦截
            return req
        }, err => {
            // 请求拦截错误;
            return err
        })
        netInstance.interceptors.response.use(rep=>{
            // 结果拦截
            return rep
        }, err => {
            // 结果拦截错误;
            return err
        })
        netInstance(option).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })

    });
}

