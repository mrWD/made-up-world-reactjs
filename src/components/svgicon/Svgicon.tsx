import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { svgList } from './svgList';

interface Props extends PropTypes.InferProps<typeof Svgicon.propTypes> {}

const Svgicon = (props: Props) => {
  const { viewBox, data } = svgList[props.icon as keyof typeof svgList];

  return (
    <svg
      className={classNames('svg', props.className)}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox={viewBox}
      dangerouslySetInnerHTML={{ __html: data }}
    >
    </svg>
  )
};

Svgicon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.oneOf(Object.keys(svgList)).isRequired,
};

export { Svgicon }
