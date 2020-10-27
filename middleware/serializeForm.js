const destruct = (key) => {
  let type = '';
  let index = '';
  let prop = '';

  let isIndex = false;
  let isProp = false;

  for (let i = 0; i < key.length; i++) {
    const currentLetter = key[i];

    if (currentLetter === '[') {
      if (!isIndex && !isProp) {
        isIndex = true;
      } else {
        isProp = true;
      }

      continue;
    }

    if (currentLetter === ']') {
      if (isIndex) {
        isIndex = false;
        isProp = true;
      } else {
        isProp = false;
      }

      continue;
    }

    if (!isIndex && !isProp) {
      type += currentLetter;
    }

    if (isIndex) {
      index += currentLetter;
    }

    if (isProp) {
      prop += currentLetter;
    }
  }

  return {
    type, index, prop,
  };
};

const serializeForm = (req, res, next) => {
  const form = req.body;
  const result = {};

  for (let key in form) {
    if (key.includes('[')) {
      const { type, index, prop, } = destruct(key);

      if (!result[type]) result[type] = [];
      if (!result[type][index]) result[type][index] = {};

      result[type][index][prop] = form[key];
    } else {
      result[key] = form[key];
    }
  }

  res.locals.serializedForm = result;
  next();
};

module.exports = serializeForm;
