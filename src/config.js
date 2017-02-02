import Rebase from 're-base'

var config = {
    apiKey: "AIzaSyAMZYxqU95Pt1u8Xap2JnAQ4cq0MmSWtl8",
    authDomain: "food-log-5f1cc.firebaseapp.com",
    databaseURL: "https://food-log-5f1cc.firebaseio.com",
    storageBucket: "food-log-5f1cc.appspot.com",
    messagingSenderId: "346061680809"
  };

const base = Rebase.createClass(config)

export default base
