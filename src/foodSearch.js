import React, {Component} from 'react'
import { hashHistory } from 'react-router'
import './App.css'
import axios from 'axios'
import base from './config'

class FoodSearch extends Component {
  constructor() {
    super()
    this.state = {
      foodItems: [],
      results: [],
      mealList: [],
      item: []
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
        console.log('FoodItem is: ', newFoodItem)
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
        })
  }

  addToMealList(result) {
    let pickedItem = `${result.fields.brand_name}-${result.fields.item_name}-${result.fields.nf_calories}-calories`
    console.log('Item is: ', pickedItem)
    // let newItem = {
      // item: item
    // }
    let newItemArray = this.state.item.concat(pickedItem)
    this.setState({
      item: newItemArray
    })
    console.log('In Meal List: ', newItemArray)
  }






  render() {
    return (
      <div className="App">
        <br />
        <button onClick={this.signOut.bind(this)} className="log-in">Sign Out</button>
        <br />
        <br />
        <br />
        <input ref={input => this.searchInput = input} type="text" placeholder="Your Meal" />
        <br />
        <button onClick={this.searchFoodItem.bind(this)}>Search</button>
        <br />
        <br />
        {this.state.results.map((result, index) => {
          return (
            <ul className="searchItems" href="" key={index} onClick={this.addToMealList.bind(this, result)} ref={item => this.itemClicked = item}>
              <li className="items">{result.fields.brand_name} - </li>
              <li className="items">{result.fields.item_name} - </li>
              <li className="items"> { result.fields.nf_calories} calories</li>
            </ul>
          )
        })}
          <h2>Meal List</h2>
          <ul className="mealList">
            <li>{this.state.item}</li>
          </ul>
      </div>
    )
  }
}

export default FoodSearch
