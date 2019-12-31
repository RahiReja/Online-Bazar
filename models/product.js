const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// here we are defining how our product schema look like in data base in other word what are the fields our product have//
const ProductSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  price:{
      type:Number,
      required:true
  },
  description:{
    type:String,
    required:true
  },

  imageUrl:{
    type: String,
    required:true
  },
  userId:{ // here we are defining the relation betwen user model and product model in other words we are telling product model to search userId from the user model//
    type: Schema.Types.ObjectId,
    ref: 'User',// here we are defining 'User' model which we export in (user.js) model
    required:true
  }
});

// here we are exporting model which will use this schema and the name of the model is defined as 'Product' which we are passing as parameter of 'model' method //
module.exports = mongoose.model('Product',ProductSchema);

/// in the back end mogoose define a class called 'Product' and creates a cronstuctor based on the schema which we define//




// const mongodb = require('mongodb');
// const getDb = require("../util/database").getDb;

// class Product {
//   constructor(title, price, description, imageUrl,id,userid) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id =(id ? new mongodb.ObjectID(id):null);
//     this.userid = userid;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if(this._id){
//          dbOp = db.collection("products").updateOne({_id: this._id}, {$set:this});
//     }else{
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodId)})
//       .next()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(prodId)})
//       .then(products => {
//         console.log(Deleted);
      
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
