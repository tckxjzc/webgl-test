import {TYPE} from 'redux/action'

export default (state = {effect: 0, shade: 0,prev:0}, action) => {
    let data = Object.assign({}, state);
    let diff=0;
    switch (action.type) {
        //开始一个请求
        case TYPE.FETCHING_START:
            diff=1;
            break;
        //完成一个请求
        case  TYPE.FETCHING_FINISH:
            diff=-1;
            break;
        default :
            return state
    }
    if(action.shade){
        data.shade=data.shade+diff;
    }else{
        data.effect=data.effect+diff;
    }
    data.prev=state.shade;
    return data;
};