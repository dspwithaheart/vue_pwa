import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialog: false,
    items: [
      {
        src: 'https://images-na.ssl-images-amazon.com/images/I/81Dl5GdAVkL.png',
        title: 'Apple',
        amount: '1',
      },
      {
        src: 'https://5.imimg.com/data5/PW/ND/MY-46595757/fresh-pineapple-281kg-29-500x500.png',
        title: 'Pineapple',
        amount: '2',
      },
      { "src": "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg", 
      "title": "Strawberry", 
      "amount": "5"
      }
    ]
  },
  mutations: {
    appendItem(store, item) {
      store.items.push(item)
    }
  },
  actions: {
  },
  modules: {
  }
})
