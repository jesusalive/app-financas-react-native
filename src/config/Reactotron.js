import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

const tron = Reactotron.configure({host: '172.17.0.1'})
  .setAsyncStorageHandler(AsyncStorage)
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

console.tron = tron;
tron.clear();
