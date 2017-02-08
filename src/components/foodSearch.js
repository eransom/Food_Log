import React, {Component} from 'react'
import { hashHistory } from 'react-router'
import '../App.css'
import axios from 'axios'
import base from '../config'

class FoodSearch extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      mealList: [],
      //============TAKE total, qty & claories out of state and use the mealList "picked" state to deal with total & qty===//
      calories: [],
      total: ''
    }
    this.auth = base.auth()
  }

  componentDidMount (){
    base.syncState(`mealList`, {
    context: this,
    state: 'mealList',
    asArray: true
    });
  }

  signOut(e){
    e.preventDefault()
    base.unauth()
    hashHistory.push("/")
    console.log('signed out: ')
  }

  searchFoodItem(e) {
    e.preventDefault()
        let searchFoodItem = this.searchInput.value
        let url = `https://api.nutritionix.com/v1_1/search/${searchFoodItem}?results=0:10&fields=item_name,brand_name,item_id,nf_calories&appId=3f9a6ef4&appKey=1a220dbd4131fc2e9fb3f1b57de58cc7`;
        axios.get(url).then((response) => {
          this.setState({
            results: response.data.hits
          })
          console.log('Results are: ', response.data.hits)
          this.searchInput.value = ""
        })
   }

  addToMealList(result) {
    let pickedItem = result.fields
    pickedItem.qty = 1
    console.log('pickedItem is: ', pickedItem)
    let newItemsArray = this.state.mealList.concat(pickedItem)
    this.setState({
      mealList: newItemsArray,
      results: []
    })
    console.log('newItemsArray In Meal List: ', newItemsArray)



    // =======Possibly change this to derive calories and qty from the state of the mealList "picked item"
    let calories = result.fields.nf_calories
    let newCalorieArray = this.state.calories.concat(calories)
    this.setState({
      calories: newCalorieArray
    })
    console.log('newCalorieArray is: ', newCalorieArray)
    function getSum(total, num) {
    return total + Math.round(num);
    }
    //=========Change this up to .reduce from the "item" and not calories or total
    let totalCalories = newCalorieArray.reduce(getSum);
    console.log('Total Calories is: ', totalCalories)
    this.setState ({
      total: totalCalories
    })
  }

  showMealList() {
    if(this.state.mealList.length !== 0) {
      return 'Meal List'
    }
  }

  showQuantity(result) {
    if(this.state.mealList.length !== 0) {
      console.log('result is: ', result)
      return <div className="qty">
               <h5 className="qtyHeader">QTY</h5>
               <div className="qtyButtons">
                 <button className="btn">-</button>
                 <button onClick={this.increaseQty.bind(this)} className="btn">+</button>
               </div>
                 <span className="qtyNum">{result.qty}</span>
               </div>
    }
  }
  // ===============THIS WILL CHANGE ================
  increaseQty() {
    let qty = this.state.qty++
    console.log('qty increment is: ', qty)
  }

// ===================This will have to change based on removing the state of "total"
  caloriesOnPage(){
 if (this.state.total.length !== 0) {
   return `${'Total:'} ${this.state.total} ${'Calories'}`
 }
}



  render() {
    return (
      <div className="App">
        <button onClick={this.signOut.bind(this)} className="signOut">Sign Out</button>
        <input ref={input => this.searchInput = input} type="text" placeholder="Your Meal" />
        <button onClick={this.searchFoodItem.bind(this)}>Search</button>
      <ul>
        {this.state.results.map((result, index) => {
          return (
            <li className="searchItems" key={index} onClick={this.addToMealList.bind(this, result)}>
              <span className="items">{result.fields.brand_name} - </span>
              <span className="items">{result.fields.item_name} - </span>
              <span className="items"> { result.fields.nf_calories} calories</span>
            </li>
            )
          })
        }
       </ul>
         <h2 className="mealList">{this.showMealList()}</h2>
       <ul>
         {this.state.mealList.map((result, index) => {
           return (
             <li className="searchItems" key={index}>
               {this.showQuantity(result)}
               <span className="items">{result.brand_name} - </span>
               <span className="items">{result.item_name} - </span>
               <span className="items"> { result.nf_calories} calories</span>
             </li>
           )
         })
       }
      </ul>
      <span ><strong className="calories">{this.caloriesOnPage()}</strong></span>
      </div>
    )
  }
}

export default FoodSearch
