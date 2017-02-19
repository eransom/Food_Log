import React, {Component} from 'react'
import { Link } from 'react-router'
import '../App.css'
import axios from 'axios'
import base from '../config'
import { Button } from 'reactstrap';
import Moment from 'moment'


class FoodSearch extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      foodItems: [],
    }
    this.auth = base.auth()
  }



//   componentDidMount (){
//     base.syncstate(`foodItems`, {
//     context: this,
//     state: 'foodItems',
//     asArray: true
//     });
// console.log("user id is ", `${this.props.uid}`)
//   }


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
      Moment.locale('e')
      const formattedDT = Moment().format('MMMM Do, YYYY')
      console.log("uid is ", `${this.props.uid}`)
     base.post(`users/${this.props.uid}/meals/${formattedDT}`, {
     data: {
       newItemsArray
     }
   })
    console.log('newItemsArray In foodItems: ', newItemsArray)
  }

  showMealList() {
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
               {this.getTotalCalories()}
             </div>
    }
  }

  // createNewMealList() {
  //
  //   this.setState({
  //     foodItems: []
  //   })
  //   console.log('newList foodItems', this.state.foodItems)
  // }

  getTotalCalories() {
    let totalCalories = this.state.foodItems.reduce((total, foodObject) => {return foodObject.qty * foodObject.nf_calories +total}, 0)
    console.log('totalCalories is: ', totalCalories)
    if(this.state.foodItems.length !== 0) {
      return <span className="calories">TOTAL: {totalCalories} Calories</span>
    }
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

  render() {



    return (
      <div className="mealDiv">
        <button className="signOut" onClick={this.props.onSignOut}>Sign Out</button>
        <div className="mealListPage">
          <div className="search">
            <input className="searchInput" ref={input => this.searchInput = input} type="text" placeholder="Your Meal" />
            <Button color="primary" className="second-button-login" bsStyle="success" onClick={this.searchFoodItem.bind(this)}>Search</Button>
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
         <div className="budget">
           <h2 className="mealFooter">CALORIE BUDGET: 2000</h2>
           <Link to="monthlyView" className="mealFooter"><h2>To monthly view</h2></Link>
           <h2 className="mealFooter">DAILY TOTAL: 1800</h2>
         </div>
      </div>
    )
  }
}

export default FoodSearch
