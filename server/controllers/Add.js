const mongoose = require("mongoose");
const CarouselHome = require("../models/CarouselHome");
const Categories = require("../models/Categories");
const Products = require("../models/Product");



exports.addHomeCarousel = async (req, res) => {
  try {
    if (req.file) {
      const carouselAdd = new CarouselHome({
        title: req.body.title,
        desc: req.body.desc,
        select: req.body.select,
        photo: req.file.filename,
        categoryId: req.body.categoryId
      });
      await carouselAdd.save();
      const swipers = await CarouselHome.find();
      return res.status(201).json({ success: true, data: swipers });
    } else {
      const carouselAdd = new CarouselHome({
        title: req.body.title,
        desc: req.body.desc,
        select: req.body.select,
        photo: "noimage.jpg",
        categoryId: req.body.categoryId
      });
      await carouselAdd.save();
      const swipers = await CarouselHome.find();
      return res.status(201).json({ success: true, data: swipers });
    }
  } catch (error) {
    return res.status(400).send("ERROR ADDING: " + error);
  }
};
exports.show = async (req, res) => {
  try {
    await CarouselHome.find()
      .then((result) => res.json(result))
      .catch((err) => {
        return res.status(400).send("ERROR: " + err);
      });
  } catch (error) {
    return res.status(400).send("ERROR: " + error);
  }
};
exports.addCategory = async (req, res) => {
  try {
    const categories = new Categories({
      name: req.body.name,
      photo: req.file.filename,
    });
    await categories.save();
    const categoriesFind = await Categories.find();
    return res.status(202).json({ success: true, data: categoriesFind });
  } catch (error) {
    return res.status(400).send("ERROR: " + error);
  }
};
exports.showCategory = async (req, res) => {
  await Categories.find()
    .then((result) => res.json(result))
    .catch((err) => {
      return res.status(400).send("ERROR: " + err);
    });
};

var Images = []

exports.addProduct = async (req, res) => {
  imageToArray(req.files)
  if (req.files) {
    const product = new Products({
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      categoryId: req.body.categoryId,
      photo: Images,
      gender: req.body.gender
    });
    await product.save();
    Images = []
  } else {
    const product = new Products({
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      categoryId: req.body.categoryId,
      photo: "noimg.jpg",
      gender: req.body.gender
    });
    await product.save();
    Images = []
  }
  const ProductFind = await Products.find();
  return res.status(202).json({ success: true, data: ProductFind });
};
exports.showProducts = async (req, res) => {
  await Products.find()
    .sort({ photo: -1 })
    .limit(8)
    .then((result) => res.json(result))
    .catch((err) => {
      return res.status(400).send("ERROR: " + err);
    });
};
exports.categoryFind = async (req, res) => {
  const categoryFind = await Products.aggregate([
    {
      $match: {
        categoryId: mongoose.Types.ObjectId(req.params.id),
      },
    },
  ]);
  return res.status(201).json({ success: true, data: categoryFind });
};
exports.productMore = async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);
  return res.status(201).json({ success: true, data: product });
};




function imageToArray(images) {
  for (var i = 0; i < images.length; i++) {
    Images.push(images[i].filename)
  }
  return
}