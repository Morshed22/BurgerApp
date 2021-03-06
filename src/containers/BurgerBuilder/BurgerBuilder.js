import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../componenets/Buger/Burger';
import BuildControls from '../../componenets/Buger/BuildControls/BuildControls';
import Modal from '../../componenets/UI/Modal/Modal';
import OrderSummary from '../../componenets/Buger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../componenets/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalprice: 4,
        purchasable: false,  
        puchasing: false,
        loading:false,
        error : false 
    }
    componentDidMount(){
        axios.get('https://burger-app-e6dd1.firebaseio.com/ingredients.json')
        .then(response =>{
            this.setState({ingredients : response.data});
        }).catch(error =>{
            this.setState({error : true});
        });
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddtion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalprice;
        const newPrice = oldPrice + priceAddtion;
        this.setState({ totalprice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalprice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalprice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }
    purchaseHandler = () => {
        this.setState({ puchasing: true });
    }
    purchaseCancelHandler = () => {
        this.setState({ puchasing: false });
    }
    purchaseContinueHandler = () =>{ 
        this.setState({loading : true});
        const order = {
           ingredients:this.state.ingredients,
            price:this.state.totalprice,
            customer:{
                name:'Max Schwarzuller', 
                address:{
                    street:'Teststreet 1',
                    zipCode:'41351',
                    country:'Germany'
                },
                email:'test@test.com'
            },
            deleveryMethod:'fastest'
        }
        axios.post('/orders.json', order)
          .then(response => {
            this.setState({loading : false, puchasing:false});
          })
          .catch(error => {
            this.setState({loading : false, puchasing:false});
          }); 
    }
    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary =  null

         let burger =  this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
         if (this.state.ingredients) {
           burger = (
             <Aux>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls
                 ingredientAdded={this.addIngredientHandler}
                 ingredientRemoved={this.removeIngredientHandler}
                 disabled={disableInfo}
                 purchasable={this.state.purchasable}
                 price={this.state.totalprice}
                 ordered={this.purchaseHandler}
               />
             </Aux>
           );
           orderSummary = (
             <OrderSummary
               purchaseCancelled={this.purchaseCancelHandler}
               purchaseContinued={this.purchaseContinueHandler}
               ingredients={this.state.ingredients}
               price={this.state.totalprice}
             />
           );
         }
         if (this.state.loading){
            orderSummary = <Spinner/>;
         }
        return (
            <Aux>
                <Modal show={this.state.puchasing} modalClosed={this.purchaseCancelHandler}>
                     {orderSummary}
                </Modal>
                 {burger}
            </Aux> 
        );
    }
};

export default  withErrorHandler(BurgerBuilder, axios) ;