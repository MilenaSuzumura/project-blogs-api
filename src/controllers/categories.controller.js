const categoriesService = require('../services/categories.service');

const registerCategory = async (req, res) => {
  const validate = await categoriesService.verifyParameters(req.body);

  if (validate.status) {
    const { status, message } = validate;
    return res.status(status).json({ message });
  }

  const registerDone = await categoriesService.register(validate);
  return res.status(201).json(registerDone);
};

const exibeCategories = async (_req, res) => {
  const result = await categoriesService.everyCategories();
  return res.status(200).json(result);
};

/* 

const exibeId = async (req, res) => {
  const result = await userService.findById(req.params.id);

  if (!result) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  const { password: _, ...userWithoutPassword } = result.dataValues;
  return res.status(200).json(userWithoutPassword);
}; */

module.exports = {
  registerCategory,
  exibeCategories,
};
