import React, {Component} from 'react'
// import { Link } from 'react-router'
import '../App.css'
import axios from 'axios'
import base from '../config'
import { Button } from 'reactstrap';
import Moment from 'moment'
import Calendar from './calendar'


class FoodSearch extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      foodItems: [],
      budget: 0,
    }
    this.auth = base.auth()
  }


  componentDidMount (){
    const formattedDT = Moment().format('MMMM Do, YYYY')

    base.syncState(`users/${this.props.uid}/meals/${formattedDT}`, {
    context: this,
    state: 'foodItems',
    asArray: true
    });
    console.log("uid is ", `${this.props.uid}`)
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
    let newItemsArray = this.state.foodItems.concat(pickedItem)
      this.setState({
        foodItems: newItemsArray,
        results: []
      })
    console.log('this.state.foodItems is: ', newItemsArray)
  }


  showMealList() {
    var totalCalories = this.state.foodItems.reduce((total, foodObject) => {return foodObject.qty * foodObject.nf_calories +total}, 0)
    var remainingCalories = this.state.budget - totalCalories
    console.log('remainingCalories is: ', remainingCalories)

    base.update(`users/${this.props.uid}`, {
      data: {
        calorieBudget: this.state.budget
      }
    })
    console.log('this.state.budget = ', this.state.budget)


    Moment.locale('e')
    const formattedDT = Moment().format('MMMM Do, YYYY')
    if(this.state.foodItems.length !== 0) {
      return <div className="mealList">
               <h2 className="mealHeader">{formattedDT}</h2>
               <div className="mealItemContain">
                  <ul className="mealListUl">
                    {this.state.foodItems.map((result, index) => {
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
               <div className="calorieCount">
                  <div className="setLimitFlex">
                    <input className="setLimitInput" ref={input => this.calGoal = input} />
                    <button className="setLimitBtn" onClick={this.setCalorieGoal.bind(this)}>Set Cal Goal</button>
                    <span className="goal">{this.state.budget}</span>
                  </div>
                  <span className="daily-calories">Goal Remaining: {Math.floor(remainingCalories)} calories</span>
                  <span className="daily-calories">Daily Total: {Math.floor(totalCalories)} calories</span>
               </div>
             </div>
    }
  }

  setCalorieGoal() {
    let budget = this.calGoal.value
    this.setState({
      budget: budget
    })
    console.log('Cal Goal is: ', this.state.budget)
    this.showMealList(budget)
    this.calGoal.value = ""
  }

  // getTotalCalories(budget) {
  //   var totalCalories = this.state.foodItems.reduce((total, foodObject) => {return foodObject.qty * foodObject.nf_calories +total}, 0)
  //   var remainingCalories = budget - totalCalories
  //   console.log('remainingCalories is: ', remainingCalories)
  //   console.log('totalCalories is: ', totalCalories)
  //   console.log('budget is: ', budget)
  //   if(this.state.foodItems.length !== 0) {
  //
  //     return <div className="calorieCount">
  //              <input ref={input => this.calGoal = input} />
  //              <button className="setLimitBtn" onClick={this.setCalorieGoal.bind(this)}>Set Cal Limit</button>
  //              <span className="daily-calories">Budget Left: {remainingCalories} calories</span>
  //              <span className="daily-calories">DAILY TOTAL: {totalCalories} Calories</span>
  //            </div>
  //   }
  // }

  showQuantity(result) {
    if(this.state.foodItems.length !== 0) {
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
    let newQty = this.state.foodItems.map((foodItem) => {
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
    let newQty = this.state.foodItems.map((foodItem) => {
      if(foodItem.item_id === result.item_id && result.qty >= 2) {
        result.qty--
        return result
      } else {
        return foodItem
      }
    })
    this.setState({
      foodItems: newQty
    })
  }

  deleteItem(itemDeleted) {
    var listAfterDelete = this.state.foodItems.filter(result => result !== itemDeleted)
    this.setState({
      foodItems: listAfterDelete
    })
    console.log('After deleteItem mealList is: ', listAfterDelete)
  }

  render() {
    return (
      <div className="mealDiv">
        <button className="signOut" onClick={this.props.onSignOut}>Sign Out</button>
        <div className="mealListPage">
          <div className="search">
            <input className="searchInput" ref={input => this.searchInput = input} type="text" placeholder="Your Meal" />
            <Button color="primary" className="second-button-login"  onClick={this.searchFoodItem.bind(this)}>Search</Button>
          </div>
          <Calendar/>
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
         <div className="budget">
         </div>
      </div>
    )
  }
}

export default FoodSearch
