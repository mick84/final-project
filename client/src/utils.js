export const changeInput = (target, setVal) =>
  setVal((st) => ({ ...st, [target.name]: target.value }));
