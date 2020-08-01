import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Btn } from '../../components/btn';
import { Svgicon } from '../../components/svgicon/Svgicon';
import { Photo } from '../../components/photo/Photo';
import { Pagination } from '../../components/pagination/Pagination';

import './index.sass';

interface Props extends PropTypes.InferProps<typeof propTypes> {}

const propTypes = {
  destination: PropTypes.string,
  pageCount: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  authInfo: PropTypes.shape({ login: PropTypes.string.isRequired }),
  userList: PropTypes.arrayOf(PropTypes.shape({
    login: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    followers: PropTypes.arrayOf(PropTypes.shape({
      login: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  }).isRequired),
  getUserList: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
};

export class UserList extends React.Component<Props> {
  propTypes = propTypes;

  componentDidMount() {
    this.props.getUserList();
  }

  isFollowed = ({ followers }: { followers: Array<{ login: string }>}) => {
    if (!this.props.authInfo?.login) {
      return false;
    }

    return followers.every((item) => this.isNotUser(item?.login));
  }

  isNotUser = (login: string) => {
    return login !== this.props.authInfo?.login;
  }

  render() {
    if (!this.props.userList) {
      return (
        <section className="user-list">
          <h1>All users</h1>
  
          <span>No users</span>
        </section>
      );
    }

    const userList = this.props.userList.map((item, i) => (
      <li className="user-list__item" key={i}>
        <Link className="user-list__link" to={`/user/${item.login}`}>
          <Photo className="user-list__photo"
            src={`${this.props.destination}/${item.photo}`}
            alt={item.login}
            width="50"
          />

          <span className="user-list__text">{item.login}</span>
        </Link>

        { this.isNotUser(item.login) && this.isFollowed(item) && (
          <Btn
            className="user-list__btn"
            isSmall
            onClick={() => this.props.follow(item.login)}
          >
            <Svgicon icon="follow"></Svgicon>
          </Btn>
        )}
      </li>
    ));

    return (
      <section className="user-list">
        <h1>All users</h1>

        <ul className="user-list__containerr">{userList}</ul>

        { this.props.pageCount > 1 && (
          <Pagination
            pageNumber={this.props.pageNumber}
            pageCount={this.props.pageCount}
            onClick={this.props.getUserList}
          />
        )}
      </section>
    )
  }
}
