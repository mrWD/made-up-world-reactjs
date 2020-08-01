import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DEFAULT_IMG from '../../assets/images/default-user.png';

import './Photo.sass';

interface State {
  srcData: string;
}

interface Props extends PropTypes.InferProps<typeof propTypes> {}

const propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

class Photo extends React.Component<Props, State> {
  static propTypes = propTypes;

  constructor(props: Props) {
    super(props);

    this.state = {
      srcData: props.src || DEFAULT_IMG,
    };
  }

  componentDidMount() {
    this.setState({ srcData: this.props.src });
  }

  handleErr = () => {
    this.setState({ srcData: DEFAULT_IMG });
  }

  render() {
    const className = classNames('photo', this.props.className);

    return (
      <img
        className={className}
        src={this.state.srcData}
        alt={this.props.alt}
        width={this.props.width}
        onError={this.handleErr}
      />
    );
  }
};

export { Photo }
