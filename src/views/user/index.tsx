import React, { Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Photo } from '../../components/photo/Photo';
import { Btn } from '../../components/btn';
import { Svgicon } from '../../components/svgicon/Svgicon';

import { List } from './list';

import './index.sass';

interface Props extends PropTypes.InferProps<typeof propTypes>, RouteComponentProps<{ id: string }> {}

interface StoryType {
  storyURL: string;
  photo: string;
  isPublished: boolean;
}

type UserType = PropTypes.InferProps<{ login: React.Validator<string>; }>;

const followPropTypes = PropTypes.arrayOf(PropTypes.shape({
  login: PropTypes.string.isRequired,
}).isRequired);

const userPropTypes = PropTypes.shape({
  login: PropTypes.string.isRequired,
  photo: PropTypes.string,
  followings: followPropTypes,
  followers: followPropTypes,
});

const storyPropTypes = PropTypes.shape({
  storyURL: PropTypes.string.isRequired,
  isPublished: PropTypes.bool.isRequired,
}).isRequired;

const propTypes = {
  destination: PropTypes.string.isRequired,
  authInfo: userPropTypes,
  userInfo: userPropTypes,
  storyList: PropTypes.arrayOf(storyPropTypes),
  getStoryList: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  publishStory: PropTypes.func.isRequired,
  unpublishStory: PropTypes.func.isRequired,
  removeStory: PropTypes.func.isRequired,
};

export class User extends React.Component<Props> {
  static propTypes = propTypes;

  componentDidMount() {
    const userId = this.props.match.params.id;

    this.props.getUserInfo(userId);

    this.props.getStoryList({ owner: userId });
  }

  checkLogin = (value?: string) => {
    return !value || this.props.authInfo?.login === value;
  }

  togglePublishment = (story: StoryType): void => {
    if (story.isPublished) {
      this.props.unpublishStory(story.storyURL);
    } else {
      this.props.publishStory(story.storyURL);
    }
  }

  storyListControls = (story: StoryType) => {
    return (
      <Fragment>
        <Btn
          className="user__btn"
          isSmall
          title={story.isPublished ? 'Unpublish' : 'Publish'}
          onClick={() => this.togglePublishment(story)}
        >
          <Svgicon icon={story.isPublished ? 'hide' : 'show'} />
        </Btn>

        <Link
          className="user__btn user__link"
          to={`/edit-story/${story.storyURL}`}
          title="Edit story"
        >
          <Svgicon icon="edit"/>
        </Link>

        <Btn
          className="user__btn"
          isSmall
          title="Remove story"
          onClick={() => this.props.removeStory(story.storyURL)}
        >
          <Svgicon icon="cross"/>
        </Btn>
      </Fragment>
    );
  }

  storyFollowingsControls = (user: UserType) => {
    return (
      <Btn
        className="user__btn"
        isSmall
        onClick={() => this.props.unfollow(user.login)}
      >
        <Svgicon icon="cross"/>
      </Btn>
    );
  }

  storyFollowersControls = (user: UserType) => {
    if (!this.isFollowedFilter(this.context, this.props.userInfo?.followings)) {
      return null;
    }

    return (
      <Btn
        className="user__btn"
        isSmall
        onClick={() => this.props.follow(user.login)}
      >
        <Svgicon icon="follow"/>
      </Btn>
    );
  }

  isFollowedFilter = (user: UserType, userList?: UserType[] | null) => {
    return !!userList && !userList.some((item) => item?.login === user?.login);
  }

  get isUser(): boolean {
    return !!this.props.userInfo && this.checkLogin(this.props.userInfo?.login);
  }

  get isFollowed(): boolean {
    return !!(this.props.userInfo && this.props.userInfo.followers && this.props.userInfo
      .followers.some((item) => this.checkLogin(item?.login)));
  }

  get isFollower(): boolean {
    return !!(this.props.userInfo && this.props.userInfo.followings && this.props.userInfo
      .followings?.some((item) => this.checkLogin(item?.login)));
  }

  render() {
    const { userInfo } = this.props;

    if (!userInfo) {
      return (
        <section className="user">
          <span className="user__text">No user</span>
        </section>
      );
    }

    return (
      <section className="user">
        <h1 className="user__title">{userInfo.login}</h1>

        <Photo
          className="user__photo"
          src={`${this.props.destination}/${userInfo.photo}`}
          alt={userInfo.login}
          width="200"
        />

        { this.props.authInfo?.login && !this.isUser && (
          <div className="user__btn-list">
            { this.isFollower && <span className="user__text">The one of your fans ;)</span> }

            { this.isFollowed && <span className="user__text">You follow the user</span> }

            { !this.isFollowed && (
              <Btn
                className="user__btn"
                onClick={() => this.props.follow(userInfo?.login)}
              >
                Follow
              </Btn>
            )}
          </div>
        )}

        <hr className="user__separator" />

        { this.props.storyList && this.props.storyList[0] && (
          <List
            className="user__stories"
            title="Stories"
            routeName="story"
            routeProp="storyURL"
            propName="title"
            list={this.props.storyList}
            controls={this.isUser ? this.storyListControls : null}
          />
        )}

        { userInfo.followings && userInfo.followings[0] && (
          <List
            className="user__follow-list"
            title="Followings"
            routeName="user"
            routeProp="login"
            propName="login"
            list={userInfo.followings}
            controls={this.isUser ? this.storyFollowingsControls : null}
          />
        )}

        { userInfo.followers && userInfo.followers[0] && (
          <List
            className="user__follow-list"
            title="Followers"
            routeName="user"
            routeProp="login"
            propName="login"
            list={userInfo.followers}
            controls={this.isUser ? this.storyFollowersControls : null}
          />
        )}
      </section>
    );
  }
}
