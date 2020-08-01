import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Btn } from '../../../components/btn';

import './index.sass';

interface State {
  maxLength: number;
}

interface Props extends PropTypes.InferProps<typeof propTypes> {}

const LENGTH_LIMIT = 5;

const propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
  routeProp: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  controls: PropTypes.func,
};

export class List extends React.Component<Props, State> {
  static propTypes = propTypes;

  constructor(props: Props) {
    super(props);

    this.state = {
      maxLength: LENGTH_LIMIT,
    };
  }

  toggleLimit() {
    const maxLength = this.state.maxLength > LENGTH_LIMIT ? LENGTH_LIMIT : this.props.list.length;

    this.setState({
      maxLength,
    });
  }

  render() {
    const className = classNames('list', this.props.className);
    const togglerBtnText = this.props.list.length === this.state.maxLength ? 'Show Less' : 'Show All';
    const itemList = this.props.list
      .slice(0, this.state.maxLength)
      .map((item, i) => (
        <li className="list__item" key={i}>
          <Link
            className="list__link"
            to={`/${this.props.routeName}/${item[this.props.routeProp]}`}
          >
            {item[this.props.propName]}
          </Link>

          { this.props.controls && this.props.controls(item) }
        </li>
      ));

    return (
      <div className={className}>
        <h2 className="list__title">{this.props.title} ({this.props.list.length})</h2>

        { itemList[0] && <ul className="list__content">{itemList}</ul> }

        { this.props.list.length > LENGTH_LIMIT && (
          <Btn isSmall onClick={this.toggleLimit}>{togglerBtnText}</Btn>
        )}
      </div>
    );
  }
};
