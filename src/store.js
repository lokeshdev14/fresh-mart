import { configureStore, createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:'products',
    initialState:{
        veg:[
           {name:'Tomato',price:30,image:'/images/tomato.jpeg'},
           {name:'Potato',price:40,image:'/images/potato.jpeg'},
           {name:'Cabbage',price:43,image:'/images/cabbage.jpeg'},
           {name: 'Carrot', price:35,image:'/images/carrot.jpeg'},
          {name: 'Onion', price: 28,image:'/images/onion.jpeg'},
          {name: 'Spinach', price: 25,image:'/images/spinach.jpeg'},
          {name: 'Cauliflower', price: 45,image:'/images/cauliflower.jpeg'},
          {name: 'Brinjal', price: 32,image:'/images/brinjal.jpeg'},
          {name: 'Capsicum', price: 38,image:'/images/capsicum.jpeg'},
          {name: 'Beetroot', price: 30,image:'/images/beetroot.jpeg'},
          {name: 'Green Peas', price: 50,image:'/images/green peas.jpeg'},
          {name: 'Bottle Gourd', price: 27,image:'/images/bottle guard.jpeg'},
          {name: 'Lady Finger', price: 34,image:'/images/ladyfinger.jpeg'}

        ],
        nonveg:[
            {name: 'Chicken', price: 160,image:'/images/chicken.jpeg'},
           {name: 'Mutton', price: 480,image:'/images/mutton.jpeg'},
          {name: 'Eggs (dozen)', price: 70,image:'/images/eggs.jpeg'},
          {name: 'Fish (Rohu)', price: 220,image:'/images/fish.jpeg'},
         {name: 'Prawns', price: 350,image:'/images/prawns.jpeg'},
          {name: 'Crab', price: 300,image:'/images/crabs.jpeg'},
         {name: 'Duck Meat', price: 250,image:'/images/duck.jpeg'},
        {name: 'Turkey', price: 400,image:'/images/turkey.jpeg'},
        {name: 'Quail', price: 180,image:'/images/quail.jpeg'},
          {name: 'Salmon', price: 600,image:'/images/salmon.jpeg'}


        ],
        milkItems:[
            {name: 'Curd', price: 30,image:'/images/curd.jpeg'},
{name: 'Yogurt', price: 35,image:'/images/yogurt.jpeg'},
{name: 'Greek Yogurt', price: 50,image:'/images/greekyogurt.jpeg'},
{name: 'Buttermilk', price: 20,image:'/images/buttermilk.jpeg'},
{name: 'Lassi', price: 25,image:'/images/lassi.jpeg'},
{name: 'Paneer', price: 90,image:'/images/paneer.jpeg'},
{name: 'Cheese', price: 110,image:'/images/cheese.jpeg'},
{name: 'Butter', price: 60,image:'/images/butter.jpeg'},
{name: 'Ghee', price: 120,image:'/images/ghee.jpeg'},
{name: 'Cream', price: 55,image:'/images/cream.jpeg'},
{name: 'Whipping Cream', price: 70,image:'/images/whippingcream.jpeg'},
{name: 'Sour Cream', price: 65,image:'/images/sour cream.jpeg'},
{name: 'Milkshake', price: 40,image:'/images/milkshake.jpeg'},
{name: 'Ice Cream', price: 80,image:'/images/ice cream.jpeg'}


        ],
        reducers:{}
    }
});

const savedCart = localStorage.getItem("cart");
const localStorageCart = savedCart ? JSON.parse(savedCart) : [];


const cartSlice=createSlice({
    name:'cart',
    initialState:localStorageCart,
    reducers:{
        addToCart:(state,inputItem)=>{
            const item=state.find(item=>item.name===inputItem.payload.name);
            if(item)
            {
                item.quantity+=1;
            }
            else{
                state.push({...inputItem.payload,quantity:1});
            }
            
            
        },
        removeCart: (state, inputItem) => {
            return state.filter(item => item.name !== inputItem.payload.name);
          },
          IncreamentCart:(state,inputItem)=>{
            let item=state.find(item=>item.name===inputItem.payload.name);
            if(item)
            {
                item.quantity+=1;
            }
          },
          DecreamentCart:(state,inputItem)=>{
            let item=state.find(item=>item.name===inputItem.payload.name);
            if(item.quantity===1)
            {
                return state.filter(item => item.name !== inputItem.payload.name);
            }
            else{
                item.quantity-=1;
            }
          },
          clearCart:()=>{
            return [];
          }
         
    }
});
const savedOrders = localStorage.getItem("orders");
const localStorageOrder = savedOrders ? JSON.parse(savedOrders) : [];
const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    list: localStorageOrder,
    nextOrderId: 1,
  },
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: state.nextOrderId,
        ...action.payload,
      };
      state.list.push(newOrder);
      state.nextOrderId += 1;
    }
  }
});


export let{addToCart,removeCart,IncreamentCart,DecreamentCart,clearCart}=cartSlice.actions;
export let{addOrder}=orderSlice.actions;
const store=configureStore({
    reducer:{
        products:productSlice.reducer,
        cart:cartSlice.reducer,
        orders:orderSlice.reducer
    }
});
store.subscribe(()=>{
  const state=store.getState();
  localStorage.setItem("cart",JSON.stringify(state.cart));
  localStorage.setItem("orders",JSON.stringify(state.orders));

});

export default store;