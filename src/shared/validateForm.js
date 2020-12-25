export const validateForm = (controls) => {
  for (let section in controls) {
    for (let question in controls[section]) {
      const isValid = controls[section][question].valid;
      if (!isValid) {
        return false;
      }
    }
  }
  return true;
};
