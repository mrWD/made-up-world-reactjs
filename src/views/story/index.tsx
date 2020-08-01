import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Btn } from '../../components/btn';
import { Svgicon } from '../../components/svgicon/Svgicon';

import './index.sass';

interface State {
  storyURL: string;
}

interface Props extends PropTypes.InferProps<typeof propTypes>, RouteComponentProps<{ id: string }> {}

const propTypes = {
  className: PropTypes.string,
  currentStory: PropTypes.shape({
    isFirst: PropTypes.bool,
    storyUrl: PropTypes.string,
    storyURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt:  PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    nextPages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired,
    }).isRequired,
  }),
  getStory: PropTypes.func.isRequired,
}

export class Story extends React.Component<Props, State> {
  static propTypes = propTypes;

  constructor(props: Props) {
    super(props);

    this.state = {
      storyURL: props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.getStory({ storyURL: this.state.storyURL });
  }

  nextPage = (pageId: string) => {
    this.props.getStory({ pageId });
  }

  render() {
    const { currentStory } = this.props;

    if (!currentStory) {
      return null;
    }

    const optionList = currentStory.options.map((item, i) => (
      <li className="story-info__el" key={i}>
        <Btn
          className="story-info__btn"
          onClick={() => this.nextPage(currentStory.nextPages[i])}
        >
          {item}
        </Btn>
      </li>
    ));
  
    return (
      <section className="story-info">
        <div className="story-info__head">
          { !currentStory.isFirst && (
            <Btn
              isSmall
              onClick={() => this.props.getStory({ storyURL: this.state.storyURL })}
            >
              <Svgicon icon="return"></Svgicon>
            </Btn>
          )}
  
          <Link className="story-info__link" to={`/user/${currentStory.owner.login}`}>
            {currentStory.owner.login}
          </Link>
        </div>
  
        <h1 className="story-info__title">{currentStory.title}</h1>
  
        <p className="story-info__text">{currentStory.body}</p>
  
        { currentStory.options[0] && <ul className="story-info__list">{optionList}</ul> }
      </section>
    )
  }
};
