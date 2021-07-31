const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
try{
  const tagData = await Tag.findAll(
    {include: [{model:Product}]}
  );
  res.json(tagData)
} catch (err) {
  res.status(500).json(err)
    console.log(err)
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model:Product}]
    }, {
      where:{
        id:req.params.id
      }
    });
    if (!tagData) {
      console.log(err)
      res.status(400).json({message: "No tag found"});
      return;
    }
    res.json(tagData)
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create({
      tag_name:req.body.tag_name
    });
    res.json(newTag);
  } catch (err) {
    res.status(400).json({message: "Could not create tag!"})
    console.log(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{ 
    const update = await Tag.update({
      tag_name:req.body.tag_name
    },{
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
    res.status(400).json({message: "Could not update tag!"})
    console.log(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id:req.params.id
      }
    });
    if (!deleteTag) {
      console.log(err)
      res.status(400).json({message: "No tag found"});
      return;
    }
    res.json(deleteTag)
  } catch(err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;
