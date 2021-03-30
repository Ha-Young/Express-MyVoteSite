const initializeMongoDB = async (model, data) => {
  await model.remove();

  for (let i = 0; i < data.length; i++) {
    await model.create(data[i]);
  }
};

module.exports = initializeMongoDB;
