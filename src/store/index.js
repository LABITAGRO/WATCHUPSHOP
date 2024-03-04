// store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // Assuming you have reducers

const store = createStore(rootReducer);

export default store;
