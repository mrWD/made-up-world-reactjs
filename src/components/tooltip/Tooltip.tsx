import React from 'react';
import PropTypes from 'prop-types';

import './Tooltip.sass';

interface Props extends PropTypes.InferProps<typeof Tooltip.propTypes> {}

const Tooltip = (props: Props) => (
  <div className="tooltip">
    <span className="tooltip__text">{props.text}</span>
  </div>
);

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export { Tooltip }
