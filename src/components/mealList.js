import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../App.css'
import axios from 'axios'
import base from '../config'
import { Button } from 'reactstrap';
import Moment from 'moment'
import Calendar from './calendar'


class MealList extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      foodItems: [],
      budget: 2000,
      date: {}
    }
  }

  componentDidMount (){
    const formattedDT = Moment().format('MMMM Do, YYYY')


    base.fetch(`users/${this.props.uid}/calorieBudget`, {
      context: this,
      then(data){
        this.setState({
          budget: data
        })
      }
    })

    this.setState({
      date: formattedDT
    })

    this.ref = base.syncState(`users/${this.props.uid}/meals/${formattedDT}`, {

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
    if(searchFoodItem !== "") {
      axios.get(url).then((response) => {
        this.setState({
          results: response.data.hits
        })
      console.log('Results are: ', response.data.hits)
      this.searchInput.value = ""
    })
   }
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


    if(this.state.foodItems.length !== 0) {
      return <div className="mealList">
               <h2 className="mealHeader">{this.state.date}</h2>
               <div className="mealItemContain">
                  <ul className="mealListUl">
                    <ReactCSSTransitionGroup
                      transitionName="fade"
                      transitionEnterTimeout={300}
                      transitionLeaveTimeout={200}
                      transitionAppear={true}
                      transitionAppearTimeout={300}>
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
                    </ReactCSSTransitionGroup>
                 </ul>
               </div>
               <h6 className="goalDefault">*Default goal is set to 2000</h6>
               <div className="calorieCount">
                  <div className="setLimitFlex">
                    <input className="setLimitInput" ref={input => this.calGoal = input} />
                    <button className="setLimitBtn" onClick={this.setNewCalorieGoal.bind(this)}>Set Cal Goal</button>
                    <span className="goal">{this.state.budget}</span>
                  </div>
                  <span className="daily-calories">Goal Remaining: {Math.floor(remainingCalories)} calories</span>
                  <span className="daily-calories">Daily Total: {Math.floor(totalCalories)} calories</span>
               </div>
             </div>
    }
  }

  setNewCalorieGoal() {
    let budget = this.calGoal.value
    this.setState({
      budget: budget
    })
    console.log('Cal Goal is: ', budget)
    this.showMealList(budget)
    base.update(`users/${this.props.uid}`, {
      data: {
        calorieBudget: budget
      }
    })
    this.calGoal.value = ""
    console.log('this.state.budget is: ', this.state.budget)
  }


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

  getUserMealList(calendarValue){
    const dateKey = calendarValue

    this.setState({
      date: calendarValue
    })
    base.removeBinding(this.ref)
    this.ref = base.syncState(`users/${this.props.uid}/meals/${dateKey}`, {
      context: this,
      state: 'foodItems',
      asArray: true,
      then: console.log('this.state.foodItems is: ', this.state.foodItems)
      });

  }


  render() {
    return (
      <div className="mealDiv">
        <button className="signOut" onClick={this.props.onSignOut}>Sign Out</button>
        <div className="mealListPage">
          <div className="search">
            <input className="searchInput" ref={input => this.searchInput = input} type="text" placeholder="Enter Meal Here" />
            <Button color="primary" className="second-button-login"  onClick={this.searchFoodItem.bind(this)}>Search</Button>
          </div>
          <Calendar userMealList={this.getUserMealList.bind(this)} />
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

export default MealList
