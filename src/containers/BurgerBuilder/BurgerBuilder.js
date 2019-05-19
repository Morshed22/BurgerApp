import React, {Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../componenets/Buger/Burger';
import BuildControls from '../../componenets/Buger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese:0.4,
    meat:1.3,
    bacon : 0.7
};
class BurgerBuilder extends Component{
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalprice : 4
    }
    addIngredientHandler = (type)=>{
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
          ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceAddtion = INGREDIENT_PRICES[type];  
      const oldPrice = this.state.totalprice;
      const newPrice = oldPrice + priceAddtion;
      this.setState({totalprice:newPrice, ingredients : updatedIngredients})
    }
    render (){
        return (
        <Aux>
            <Burger ingredients = {this.state.ingredients}/>
            <BuildControls ingredientAdded = {this.addIngredientHandler}/>
        </Aux>
   );   
}
};
export default BurgerBuilder;