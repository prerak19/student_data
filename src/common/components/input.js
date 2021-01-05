import React from 'react';
import PropTypes from 'prop-types';
import { getRegExp } from './helper';

const changeHandler = (e, onChangeFunc) => {
  // name, value, error (for select), obj (for select), event
  onChangeFunc(e.target.name, e.target.value, null, null, e);
}

const validationHandler = (e, props, reqErrorMsg) => {
  const { value, name } = e.target;
  const { title, isReq, reqType } = props;
  let errorMsg = isReq ? null : undefined;
  if (props.onBlurFunc) {
    props.onBlurFunc(name, value);
  }
  if (!props.validationFunc) return;

  if (!value && isReq)
    errorMsg = reqErrorMsg;
  else if (value && reqType && !getRegExp(reqType).test(value))
    errorMsg = `Please enter valid ${title}.`;
  props.validationFunc(name, errorMsg);
}

const Input = (props) => {
  const { autoComplete, title, type, className, outerClassName,
    placeholder, checked, value, name, error, onChangeFunc, disabled, style, smallSize, onClickFunc } = props;

  const reqErrorMsg = `Please Enter ${title}.`;
  const inputProps = {
    type: type,
    className: className,
    value: value,
    disabled,
    autoComplete
  }
  if (style) inputProps.style = style;
  if (placeholder) inputProps.placeholder = placeholder;
  if (name) inputProps.name = name;
  if (checked) inputProps.checked = checked;
  if (smallSize) inputProps.className = `${inputProps.className} small-input`;
  if (onClickFunc) inputProps.onClick = onClickFunc;

  return (
    <div className={`form-group${outerClassName ? ` ${outerClassName}` : ''}`}>
      <div className='d-flex position-relative'>
        <input
          {...inputProps}
          onChange={(e) => changeHandler(e, onChangeFunc)}
          onBlur={(e) => validationHandler(e, props, reqErrorMsg)}
        />
      </div>
      {error && <span className="req-msg">{error === true ? reqErrorMsg : error}</span>}
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
  className: 'form-control',
  outerClassName: null,
  isReq: null,
  reqType: '',
  value: '',
  onChangeFunc: () => { },
  onBlurFunc: () => { },
  loading: null,
  disabled: false,
}

Input.propTypes = {
  title: PropTypes.string,
  isReq: PropTypes.bool,
  reqType: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  outerClassName: PropTypes.string,
  value: PropTypes.any,
  onChangeFunc: PropTypes.func,
  onBlurFunc: PropTypes.func,
  validationFunc: PropTypes.func,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Input;