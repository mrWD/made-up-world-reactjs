import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Tooltip } from '../../../components/tooltip/Tooltip';

import './index.sass';

interface Props extends PropTypes.InferProps<typeof Story.propTypes> {}

const Story = (props: Props) => (
  <li className={classNames('story', props.className)}>
    <div className="story__name-wrapper">
      <Link
        className="story__name tooltip-trigger"
        to={{ pathname: `/story/${props.storyURL}` }}
      >
        {props.title}
      </Link>

      <Tooltip text={props.body} />
    </div>

    <Link
      className="story__author"
      to={{ pathname: `/user/${props.owner.login}` }}
    >
      {props.owner.login}
    </Link>

    <span className="story__author">{moment(props.createdAt).format('DD.MM.YYYY')}</span>
  </li>
);

Story.propTypes = {
  className: PropTypes.string,
  storyUrl: PropTypes.string,
  storyURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt:  PropTypes.string.isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired,
  }).isRequired,
};

export { Story };
