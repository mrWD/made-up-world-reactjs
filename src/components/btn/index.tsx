import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.sass';

interface ClassState {
  isSmall?: boolean | null;
  isText?: boolean | null;
  isError?: boolean | null;
}

interface Props extends PropTypes.InferProps<PropsWithChildren<typeof Btn.propTypes>> {}

const getClassList = ({ isSmall, isText, isError }: ClassState) => ({
  'btn_small': isSmall,
  'btn_text': isText,
  'btn_error': isError,
});

const Btn = (props: Props) => (
  <button
    className={classNames('btn', props.className, getClassList(props))}
    disabled={!!props.disabled}
    type="button"
    title={props.title as string}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

Btn.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isSmall: PropTypes.bool,
  isText: PropTypes.bool,
  isError: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export { Btn }
