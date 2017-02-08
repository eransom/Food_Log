import React, {Component} from 'react'
import { hashHistory } from 'react-router'
import '../App.css'
import axios from 'axios'
import base from '../config'

class FoodSearch extends Component {
  constructor() {
    super()
    this.state = {
      foodItems: [],
      results: [],
      item: [],
      calories: [],
      total: '',
      qty: 1
    }
    this.auth = base.auth()
  }

  componentDidMount (){
    base.syncState(`foodItems`, {
    context: this,
    state: 'foodItems',
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
        let searchedItem = this.searchInput.value
        let newFoodItem = {
          item: searchedItem,
        }
        let newFoodItemArray = this.state.foodItems.concat(newFoodItem)
        console.log('Searched Food Item is: ', newFoodItem)
        this.setState({
          foodItems: newFoodItemArray
        })
        let searchFoodItem = this.searchInput.value
        let url = `https://api.nutritionix.com/v1_1/search/${searchFoodItem}?results=0:10&fields=item_name,brand_name,item_id,nf_calories&appId=3f9a6ef4&appKey=1a220dbd4131fc2e9fb3f1b57de58cc7`;
        axios.get(url).then((response) => {
          this.setState({
            results: response.data.hits
          })
          console.log(response.data.hits)
          this.searchInput.value = ""
        })
   }

  addToMealList(result) {
    let pickedItem = result
    console.log('pickedItem is: ', pickedItem)
    let newItemArray = this.state.item.concat(pickedItem)
    this.setState({
      item: newItemArray,
      results: []
    })
    console.log('newItemArray In Meal List: ', newItemArray)
    let calories = result.fields.nf_calories
    let newCalorieArray = this.state.calories.concat(calories)
    this.setState({
      calories: newCalorieArray
    })
    console.log('newCalorieArray is: ', newCalorieArray)
    function getSum(total, num) {
    return total + Math.round(num);
    }
    let totalCalories = newCalorieArray.reduce(getSum);
    console.log('Total Calories is: ', totalCalories)
    this.setState ({
      total: totalCalories
    })
  }

  showMealList() {
    if(this.state.item !== 0) {
      return 'Meal List'
    }
  }

  showQuantity() {
    if(this.state.item !== 0) {
      return <div className="qty">
               <h5 className="qtyHeader">QTY</h5>
               <div className="qtyButtons">
                 <button className="btn">-</button>
                 <button onClick={this.increaseQty.bind(this)} className="btn">+</button>
               </div>
                 <span className="qtyNum">{this.state.qty}</span>
             </div>
    }
  }

  increaseQty() {
    let qty = this.state.qty++
    console.log('qty is: ', qty)
  }

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
         {this.state.item.map((result, index) => {
           return (
             <li className="searchItems" key={index}>
               {this.showQuantity()}
               <span className="items">{result.fields.brand_name} - </span>
               <span className="items">{result.fields.item_name} - </span>
               <span className="items"> { result.fields.nf_calories} calories</span>
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
