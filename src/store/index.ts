import { createStore } from 'vuex'
const MEMBER = 'MEMBER'
//vuex存储状态数据
export default createStore({
    state: {
        member: window.sessionStorage.getItem(MEMBER) || null,
    },
    getters: {},
    mutations: {//提交修改状态数据的方法
        setMember(state: any, _member: any) {
            state.member = _member;
            window.sessionStorage.setItem(MEMBER, _member);
        }
    },
    actions: {}
})