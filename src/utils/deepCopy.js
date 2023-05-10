function deepCopyClassInstance(instance) {
  const copy = Object.assign(Object.create(Object.getPrototypeOf(instance)), instance);
  Object.keys(instance).forEach(key => {
    if (typeof instance[key] === 'object' && instance[key] !== null) {
      copy[key] = deepCopyClassInstance(instance[key]);
    }
  });
  return copy;
}

export default deepCopyClassInstance;