const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        }, // here we are defining the relation betwen user model and product model in other words we are telling user model to search productId from the product model//
        quantity: { type: Number, required: true }
      }
    ]
  }
});


//here we are updating the cart of a particular user
userSchema.methods.addToCart = function(product) {// here we are defining the method //
  
// here we are cheking is there any item in the cart / if any item exist in the cart then we compare it with the new item if it matches we updated the quantity other wise we add the new item and update the cart//
  const cartProductIndex = this.cart.items.findIndex(cp => {
     return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  const UpdatedCart = { items: updatedCartItems };
  this.cart = UpdatedCart;
  return this.save();
};

// here we are rmoving the cart item from the cart page//
userSchema.methods.removeFromCart = function(productId){

  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
 });
this.cart.items = updatedCartItems;
return this.save();
}

// here we are clearing the cart after order happens//
userSchema.methods.clearCart= function(){
this.cart = {items : []};
return this.save();

 }

module.exports = mongoose.model("User", userSchema);
// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');
// class User {
//   constructor(username, email,cart,id) {
//     this.username = username;
//     this.email = email;
//     this.cart =cart;
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection("users").insertOne(this)
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//  
//   static findById(userId) {
//     const db = getDb();
//     return db.collection("users")
//       .find({ _id: new mongodb.ObjectId(userId)})
//       .next()
//       .then(user => {
//         console.log(user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

// }
// module.exports = User;
