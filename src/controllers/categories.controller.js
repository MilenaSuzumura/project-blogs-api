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

const getAllCategories = async (_req, res) => {
  const result = await categoriesService.getCategories();
  return res.status(200).json(result);
};

module.exports = {
  registerCategory,
  getAllCategories,
};
