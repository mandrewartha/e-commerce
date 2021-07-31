const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll(
      {include: [{model:Product}] }
    );
    res.json(categoryData)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      include: [{model:Product}]
    },
    {
      where:{
        id:req.params.id
      }
    }
    );

    if (!categoryId) {
      console.log(err)
      res.status(400).json({message: "No category found"});
      return;
    }
    res.json(categoryId)
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.json(newCategory);
  } catch (err) {
    res.status(400).json({message: "Could not create category!"})
    console.log(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const update = await Category.update({
      category_name:req.body.category_name
    }, {
      where:{
        id:req.params.id
      }
    });
    if(update) {
      res.json(update)
    }else {
      res.status(404).json({message: "Could not update!"})
    }
  } catch (err) {
    res.status(400).json({message: "Could not update category!"})
    console.log(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where: {
        id:req.params.id
      }
    });
    if (!deleteCat) {
      console.log(err)
      res.status(400).json({message: "No category found"});
      return;
    }
    res.json(deleteCat)
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;
