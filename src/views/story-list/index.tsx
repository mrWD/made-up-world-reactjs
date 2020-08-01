import React from 'react';
import { RouterProps } from 'react-router';
import PropTypes from 'prop-types';

import { Pagination } from '../../components/pagination/Pagination';

import { Filters, StateForm } from './filters';
import { Story } from './story';

import './index.sass';

interface Props extends PropTypes.InferProps<typeof propTypes>, RouterProps {}

const propTypes = {
  pageNumber: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  storyList: PropTypes.arrayOf(PropTypes.shape({
    storyUrl: PropTypes.string,
    storyURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt:  PropTypes.string.isRequired,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired),
  getStoryList: PropTypes.func.isRequired,
};

export class StoryList extends React.Component<Props> {
  componentDidMount() {
    const params = new URLSearchParams(this.props.history.location.search);

    this.props.getStoryList(params);
  }

  goToPage = (page: number) => {
    this.props.getStoryList({ page });
  }

  handleSubmit = (form: StateForm) => {
    const search = Object.entries(form).reduce((result, [prop, val]) => {
      if (!val) {
        return result;
      }

      if (!result) {
        return `${prop}=${val}`;
      }

      return `${result}&${prop}=${val}`;
    }, '?');

    this.props.history.push({
      pathname: '/',
      search,
    });

    this.props.getStoryList(form);
  }

  render() {
    if (!this.props.storyList) {
      return (
        <div className="story-list">
         <Filters search={this.props.history.location.search} submit={this.handleSubmit} />

          No stories!
        </div>
      );
    }

    const storyList = this.props.storyList
      .map((item, i) => <Story className="story-list" {...item} key={`story-${i}`} />);

    return (
      <div className="story-list">
        <Filters search={this.props.history.location.search} submit={this.handleSubmit} />

        <ul>{storyList}</ul>

        { this.props.pageCount > 1 && (
          <Pagination
            pageNumber={this.props.pageNumber}
            pageCount={this.props.pageCount}
            onClick={this.goToPage}
          />
        )}
      </div>
    );
  }
}
