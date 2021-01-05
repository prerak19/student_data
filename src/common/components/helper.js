// get regexp by type
export const getRegExp = (type) => {
  let regx = null;
  switch (type) {
    case 'email':
      regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      break;
    case 'number':
      regx = /^[0-9]*$/;
      break;
    default:
      break;
  }
  return regx;
}

// get object of state form
export const getFormDetails = (form, changeValidation, formValueInKey = null) => {
  let failed;
  for (let val in form.errors) {
    const fieldError = form.errors[val];
    const fieldValue = formValueInKey ? form[formValueInKey] : form[val];
    if (fieldError) {
      failed = true;
    }
    else if (fieldError === null && !fieldValue) {
      failed = true;
      if (changeValidation)
        changeValidation(val, true);
    }
  }
  if (failed) {
    return false;
  }
  else {
    const cloneObj = form;
    delete cloneObj['errors'];
    return cloneObj;
  }
}