import React from 'react';
import PropTypes from 'prop-types';

import { Btn } from '../../components/btn';
import { Svgicon } from '../../components/svgicon/Svgicon';

import './index.sass';

interface Props extends PropTypes.InferProps<typeof Errors.propTypes> {}

const Errors = (props: Props) => {
  if (!props.errors[0]) {
    return null;
  }

  const errorList = props.errors.map((item, i) => (
    <li className="errors__item" key={i}>
      <span className="errors__text">{item}</span>

      <Btn
        className="errors__btn"
        isSmall
        isError
        isText
        onClick={() => props.removeError(item)}
      >
        <Svgicon icon="cross" />
      </Btn>
    </li>
  ));

  return <ul className="errors">{errorList}</ul>;
};

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeError: PropTypes.func.isRequired,
};

Errors.defaultProps = {
  errors: [],
  removeError: () => ({}),
};

export { Errors };
