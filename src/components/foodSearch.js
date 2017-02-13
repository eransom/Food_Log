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
  }

  showMealList() {
    if(this.state.mealList.length !== 0) {
      return <div className="mealList">
               <h2 className="mealHeader">Breakfast</h2>
               <div className="mealItemContain">
                  <ul className="mealListUl">
                    {this.state.mealList.map((result, index) => {
                      return (
                        <li className="mealListItems" key={index}>
                          {this.showQuantity(result)}
                          <span className="itemsBrand">{result.brand_name} - </span>
                          <span className="itemsName">{result.item_name} - </span>
                          <span className="items"> { result.nf_calories} calories</span>
                          <span><button className="delete-btn" onClick={this.deleteItem.bind(this, result)}>X</button></span>
                        </li>
                        )
                      })
                    }
                 </ul>
               </div>
               {this.getTotalCalories()}
             </div>
    }
  }

  getTotalCalories() {
    let totalCalories = this.state.mealList.reduce((total, foodObject) => {return foodObject.qty * foodObject.nf_calories +total}, 0)
    console.log('totalCalories is: ', totalCalories)
    if(this.state.mealList.length !== 0) {
      return <span className="calories">TOTAL: {totalCalories} Calories</span>
    }
  }

  showQuantity(result) {
    if(this.state.mealList.length !== 0) {
      return <div className="qty">
               <h5 className="qtyHeader">QTY</h5>
               <div className="qtyButtons">
                 <button onClick={this.decreaseQty.bind(this, result)} className="qtyNumBtn">-</button>
                 <button onClick={this.increaseQty.bind(this, result)} className="qtyNumBtn">+</button>
               </div>
               <span className="qtyNum">{result.qty}</span>
            </div>
      }
    }

  increaseQty(result) {
    let newQty = this.state.mealList.map((foodItem) => {
      if(foodItem.item_id === result.item_id) {
        result.qty++
        return result
      } else {
        return foodItem
      }
    })
    this.setState({
      mealList: newQty
    })
  }

  decreaseQty(result) {
    let newQty = this.state.mealList.map((foodItem) => {
      if(foodItem.item_id === result.item_id && result.qty >= 2) {
        result.qty--
        return result
      } else {
        return foodItem
      }
    })
    this.setState({
      mealList: newQty
    })
  }

  deleteItem(itemDeleted) {
    var listAfterDelete = this.state.mealList.filter(result => result !== itemDeleted)
    this.setState({
      mealList: listAfterDelete
    })
    console.log('After deleteItem mealList is: ', listAfterDelete)
  }

  render() {
    return (
      <div>
        <button className="signOut" onClick={this.signOut.bind(this)}>Sign Out</button>
        <div className="search">
          <input ref={input => this.searchInput = input} type="text" placeholder="Your Meal" />
          <button onClick={this.searchFoodItem.bind(this)}>Search</button>
        </div>
        <ul className="searchList">
          {this.state.results.map((result, index) => {
            return (
              <li className="searchItems" key={index} onClick={this.addToMealList.bind(this, result)}>
                <span className="searchSpan1">{result.fields.brand_name} - </span>
                <span className="searchSpan2">{result.fields.item_name} - </span>
                <span className="searchSpan3"> { result.fields.nf_calories} calories</span>
              </li>
              )
            })
          }
         </ul>
          {this.showMealList()}
      </div>
    )
  }
}

export default FoodSearch
