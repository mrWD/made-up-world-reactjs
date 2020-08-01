import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Field.sass';

type EventType = React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>;

type InferPropTypes<
  PropTypes,
  DefaultProps = {},
  Props = PropTypes.InferProps<PropTypes>
> = {
  [Key in keyof Props]: Key extends keyof DefaultProps
    ? Props[Key] | DefaultProps[Key]
    : Props[Key]
};

interface Props extends InferPropTypes<typeof Field.propTypes, typeof Field.defaultProps> {};

const CLASS = 'field';

const Field = (props: Props) => {
  const defaultClassList = classNames(CLASS, props.className);

  const handleChange = ({ target }: EventType) => {
    props.handleInput(target.value);
  };

  if (props.type === 'textarea') {
    return (
      <textarea
        className={defaultClassList}
        value={props.value || ''}
        id={props.id}
        rows={props.rows}
        name={props.name}
        placeholder={props.placeholder}
        onChange={handleChange}
      ></textarea>
    );
  }

  if (props.type === 'date') {
    const dataVal = props.value ? moment(props.value).format('DD.MM.YYYY') : props.placeholder;
    const dateClassList = classNames(defaultClassList, 'field_date', {
      'field_empty': !props.value,
    });

    return (
      <input
        className={dateClassList}
        id={props.id}
        type="date"
        value={props.value || ''}
        name={props.name}
        data-value={dataVal}
        onChange={handleChange}
      />
    );
  }

  if (props.type === 'select') {
    const optionList = props.options && props.options.map((item, i) => (
      <option value={item.value} key={`option${i}`}>{item.label}</option>
    ));

    return (
      <select
        className={defaultClassList}
        id={props.id}
        value={props.value || ''}
        name={props.name}
        placeholder={props.placeholder}
        onChange={handleChange}
      >
        {optionList}
      </select>
    );
  }

  return (
    <input
      className={defaultClassList}
      id={props.id}
      value={props.value || ''}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      onChange={handleChange}
    />
  );
};

Field.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  rows: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired),
  handleInput: PropTypes.func.isRequired,
};

Field.defaultProps = {
  id: '',
  rows: 1,
  type: 'text',
  value: '',
  placeholder: '',
};

export { Field }
