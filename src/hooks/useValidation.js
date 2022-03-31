import { useState } from "react";

const useValidation = (keys) => {
  const [errors, setErrors] = useState({});

  const validate = (dataObj) => {
    let errObj = { hasError: false };

    Object.entries(dataObj).forEach(([key, value]) => {
      if (keys.includes(key)) {
        if (!value) {
          errObj[key] = `${key} is Required!`;
          errObj.hasError = true;
        }
      }
    });
    setErrors(errObj);

    return errObj;
  };

  return { errors, validate };
};

export default useValidation;
