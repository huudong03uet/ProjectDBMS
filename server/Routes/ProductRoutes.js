import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./../Models/ProductModel.js";
import Shop from "./../Models/ShopModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const productRoute = express.Router();

// GET ALL PRODUCT
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);
// get product with filter (keyword is object)
// name, price, brand, shop, color
productRoute.get(
  "/full",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name 
    // check undefined price
    console.log(req.query)
    const price_max = Number(req.query.price_max) || 1000000000
    const price_min = Number(req.query.price_min) || 0
    const brand =  req.query.brand
    const shop =  req.query.shop
    const color =  req.query.color
    const gender = req.query.gender
    const order_by = req.query.order_by
    // find product with name, price, brand, shop, color
    const keyword = {
      name: {
        $regex: name,
        $options: "i",
      },
      price : {
        $gte: price_min,
        $lte: price_max,
      },
      Brand: {
        $regex: brand,
        $options: "i",
      },
      shop_name: {
        $regex: shop,
        $options: "i",
      },
      Color: {
        $regex: color,
        $options: "i",
      },
      Category_by_gender: {
        $regex: gender,
        $options: "i",
      },
   };
   console.log(keyword)
    // delete keyword which undefined
    for (const key in keyword) {
      if (keyword[key].$regex === "undefined" || keyword[key].$regex === "") {
        delete keyword[key];
      }
    }
    // sort order by order_by
    let sort = {}
    if (order_by === "Price_high") {
      sort = { price: -1 }
    } else if (order_by === "Price_low") {
      sort = { price: 1 }
    } else if (order_by === "Rating_high") {
      sort = { rating: -1 }
    } else if (order_by === "Rating_low") {
      sort = { rating: 1 }
    } else if (order_by === "Name"){
      sort = { name: 1 }
    } else {
      sort = { _id: -1 }
    }
    const sort_ = sort;
    console.log(sort_)
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(sort_);
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })


);




// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRoute.get(
  "/all",
  // protect,
  // admin,
  // asyncHandler(async (req, res) => {
  //   const products = await Product.find({}).sort({ _id: -1 });
  //   res.json(products);
  // })
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json( products);
  })
);

// GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

productRoute.get(
  "/shops/:name",
  asyncHandler(async (req, res) => {
    //const shops = await Shop.findById(req.params.id);
    // get by name
    const shops = await Shop.findOne({ shop_name: req.params.name });
    if (shops) {
      res.json(shops);
    } else {
      res.status(404);
      throw new Error("Shop not Found");
    }
  })
);

// PRODUCT REVIEW
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// shop REVIEW
productRoute.post(
  "/shops/:name/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const shop = await Shop.findOne({ shop_name: req.params.name });
    if (shop) {
      const alreadyReviewed = shop.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        // res.status(400);
        // throw new Error("Shop already Reviewed");
      }
      
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      
      shop.reviews.push(review);
      
      shop.numReviews = shop.reviews.length;
      
      shop.rating =
        shop.reviews.reduce((acc, item) => item.rating + acc, 0) /
        shop.reviews.length;
        
      await shop.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Shop not Found");
    }
  })
);

// DELETE PRODUCT
productRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// CREATE PRODUCT
productRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock, Brand, Category_by_gender, shop_name, Original_Price, Color } = req.body;
    const productExist = await Product.findOne({ name });
    if (productExist) {
      res.status(400);
      throw new Error("Product name already exist");
    } else {
      const product = new Product({
        name,
        price,
        description,
        image,
        countInStock,
        Brand,
        Category_by_gender,
        shop_name,
        Original_Price,
        Color,
        user: req.user._id,
      });
      if (product) {
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
      } else {
        res.status(400);
        throw new Error("Invalid product data");
      }
    }
  })
);

// UPDATE PRODUCT
productRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.countInStock = countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
export default productRoute;
