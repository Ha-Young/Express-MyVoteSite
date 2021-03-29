/**
 * Used to generate validator for mongoose model schema
 * @param {string} type - property schema type name
 * @param {string} name - property name
 * @param {(number|boolean)} [val] - any value to fit in schema type
 * @return {(Object|Array)} return Schema type value array if (type === min, max, required)
 */
module.exports = function (type, name, val) {
  if (typeof type !== 'string') {
    throw new Error('handleSchemaTypeError: type should be string');
  }

  if (typeof name !== 'string') {
    throw new Error('handleSchemaTypeError: name should be string');
  }

  const typeName = type.toLowerCase();

  switch (typeName) {
    case 'min':
      if (!Number.isInteger(val)) {
        throw new Error('handleSchemaTypeError: value should be integer if type is min/max');
      }

      return [val, `${name} must be above ${val}`];
    case 'max':
      if (!Number.isInteger(val)) {
        throw new Error('handleSchemaTypeError: value should be integer if type is min/max');
      }

      return [val, `${name} must be below ${val}`];
    case 'required':
      if (typeof val !== 'boolean') {
        throw new Error('handleSchemaTypeError: value shold be boolean if type is required');
      }

      return [val, `Problem must have ${name}`];
    case 'validate':
      return {
        validator: Number.isInteger,
        message: `${name} ({VALUE}) is NOT an integer`
      };
    default:
      throw new Error('handleSchemaTypeError: NOT allowed schema type name');
  }
};
