const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll(
      {
        include: [{model: Product}]
      }
    );
  res.status(200).json(tagData);
  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(
      req.params.id, 
      {
       include: [{model: Product}],
      },
    );

    if (!tagData){
      res.status(400).json("Could not find category with that id.");
      return;
    }

    res.status(200).json(tagData);

  } catch (err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create({
      tag_name: req.body.tag_name,
    });

  res.status(200).json(newTagData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updatedTagData = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {id: req.params.id}
    }
  );
  
  if (!updatedTagData){
    res.status(400).json("Couldn't find category by that id.");
    return;
  }

  res.status(200).json(updatedTagData);

  } catch (err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deletedTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTagData){
      res.status(400).json("Could not find category with that id.");
      return;
    }

    res.status(200).json(deletedTagData);
  } catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
