const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll(
      {
        include: [{model: Product}]
      }
    );
  res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findByPk(
      req.params.id, 
      {
       include: [{model: Product}],
      },
    );

    if (!categoryData){
      res.status(400).json("Could not find category with that id.");
      return;
    }

    res.status(200).json(categoryData);

  } catch (err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategoryData = await Category.create({
      category_name: req.body.category_name,
    });

  res.status(200).json(newCategoryData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updatedCategoryData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {id: req.params.id}
    }
  );
  
  if (!updatedCategoryData){
    res.status(400).json("Couldn't find category by that id.");
    return;
  }

  res.status(200).json(updatedCategoryData);

  } catch (err){
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deletedCategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedCategoryData){
      res.status(400).json("Could not find category with that id.");
      return;
    }

    res.status(200).json(deletedCategoryData);
  } catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
