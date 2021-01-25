import { createStore } from 'vuex'

export default createStore({
  state(){
    return {
      activeTasks: 0
    }
  },
  mutations: {
    incrementActiveCount(state){
      state.activeTasks++
      //При перезагрузке страницы activeTasks сбрасывается на 0, так и должно быть?
    }
  },
  getters: {
    activeTasks(state){
      return state.activeTasks
    }
  }
})
