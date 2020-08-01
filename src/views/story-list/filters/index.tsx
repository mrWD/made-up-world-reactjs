import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Btn } from '../../../components/btn';
import { Field } from '../../../components/field/Field';
import { Svgicon } from '../../../components/svgicon/Svgicon';

import './index.sass';

export interface StateForm {
  title: string;
  from: string;
  to: string;
  owner: string;
  sortBy: string;
}

interface State {
  isVisible: boolean;
  form: StateForm;
}

interface Props extends PropTypes.InferProps<typeof propTypes> {}

const propTypes = {
  search: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
};

const sortList = [
  { label: 'Title', value: 'title' },
  { label: 'Title Reverse', value: '-title' },
  { label: 'Author', value: 'owner' },
  { label: 'Author Reverse', value: '-owner' },
  { label: 'Date', value: 'createdAt' },
  { label: 'Date Reverse', value: '-createdAt' },
];

const mapFieldToArgs = {
  title: {
    type: 'text',
    placeholder: 'Title',
  },
  from: {
    type: 'date',
    placeholder: 'From date',
  },
  to: {
    type: 'date',
    placeholder: 'To date',
  },
  owner: {
    type: 'text',
    placeholder: 'Owner',
  },
  sortBy: {
    sortList,
    type: 'select',
    placeholder: 'Sort By',
  },
};

export class Filters extends React.Component<Props, State> {
  propTypes = propTypes;

  constructor(props: Props) {
    super(props);

    const params = new URLSearchParams(props.search);

    this.state = {
      isVisible: true,
      form: {
        title: params.get('title') || '',
        from: params.get('from') || '',
        to: params.get('to') || '',
        owner: params.get('owner') || '',
        sortBy: params.get('sortBy') || 'createdAt',
      },
    };
  }

  toggleVisibility = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  handleInput = (prop: string, value: string) => {
    this.setState({
      form: {
        ...this.state.form,
        [prop]: value,
      },
    });
  }

  render() {
    const iconName = this.state.isVisible ? 'cross' : 'filter';
    const classList = classNames('filters__item', {
      'filters__item_hidden': !this.state.isVisible,
    });

    const fieldList = Object.entries(this.state.form).map(([key, value]) => (
      <div className={key === 'title' ? 'filters__item' : classList} key={key}>
        <Field
          className="filters__field"
          options={sortList}
          value={value}
          type={mapFieldToArgs[key as keyof typeof mapFieldToArgs].type}
          name={key}
          placeholder={mapFieldToArgs[key as keyof typeof mapFieldToArgs].placeholder}
          handleInput={val => this.handleInput(key, val)}
        />
      </div>
    ));

    return (
      <form className="filters">
        {fieldList}

        <div className="filters__item">
          <Btn
            className="filters__btn"
            onClick={() => this.props.submit(this.state.form)}
          >
            Find
          </Btn>

          <Btn className="filters__toggler" onClick={this.toggleVisibility}>
            <Svgicon icon={iconName} />
          </Btn>
        </div>

        <hr className="filters__separator" />
      </form>
    );
  }
}
