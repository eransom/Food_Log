import React, {Component} from 'react'
import Link from 'react-router'
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
      item: ""
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
    console.log('signed out: ')
  }

  addFoodItem(e) {
    e.preventDefault()
        let item = this.searchInput.value
        let newFoodItem = {
          item: item,
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

  addToMealList() {
    let item = this.itemClicked.value
    let newItem = {
      item: item
    }
    let newItemArray = this.state.item.concat(newItem)
    this.setState({
      mealList: newItemArray
    })
    console.log('In Meal List: ', newItemArray)
  }

  render() {
    return (
      <div className="App">
        <br />
        <button onClick={this.signOut.bind(this)} onMouseUp={()=>hashHistory.goBack()} className="log-in">Sign Out</button>
        <br />
        <br />
        <br />
        <input ref={input => this.searchInput = input} type="text" placeholder="Your Meal" />
        <br />
        <button onClick={this.addFoodItem.bind(this)}>Search</button>
        <br />
        <br />
        {this.state.results.map((result, index, id) => {
          return (
            <div>
              <a href="#" onClick={this.addToMealList.bind(this)} ref={item => this.itemClicked = item} key={index}>{result.fields.item_name} </a>
              <span key={id}>{result.fields.nf_calories} calories</span>
            </div>
          )
        })}
          <h2>Meal List</h2>
          <ul>
            <li>{this.state.item}</li>
          </ul>
      </div>
    )
  }
}

export default FoodSearch
