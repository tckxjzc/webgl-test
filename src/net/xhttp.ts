import store from '../redux/store';
import createLoadingAction from "../redux/action/createLoadingAction";
import {TYPE} from "../redux/action";

export const LOADING_TYPE={
    NONE:"none",
    SHADE:'shade'
};

type Options = {
    init?: RequestInit,
    convert?: Boolean,
    loading?: 'shade' | 'none',
    data?: Object,
    authentication?: Boolean,
    [name: string]: any
};


let defaultOptions: RequestInit = {};

function xhttp(url: string, options: Options = {}) {
    let option: RequestInit = Object.assign({}, defaultOptions, options.init);
    //是否转换
    if (options.convert) {
        option.body = options.data.toFormData();
    }
    //开始请求
    let promise = fetch(url, option);

    //加载条显示控制
    if (options.loading != LOADING_TYPE.NONE) {
        let flag=options.loading == LOADING_TYPE.SHADE;
        store.dispatch(createLoadingAction(TYPE.FETCHING_START,flag ));
        promise.then(()=>{
            store.dispatch(createLoadingAction(TYPE.FETCHING_FINISH,flag ));
        },()=>{
            store.dispatch(createLoadingAction(TYPE.FETCHING_FINISH,flag ));
        });
    }

    return promise;

}


export default xhttp;
