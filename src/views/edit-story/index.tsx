import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Btn } from '../../components/btn';

import { Card } from './card';

import './index.sass';

interface State {
  pinnedIndex: number;
  indexParent: string;
  changes: Array<{
    isFirst?: boolean;
    id: string;
    nextPages: string[];
  }>;
}

interface Page extends PropTypes.InferType<typeof pagePropTypes> {}

interface Props extends PropTypes.InferProps<typeof propsTypes> {}

const pagePropTypes = PropTypes.shape({
  isFirst: PropTypes.bool,
  isPublished: PropTypes.bool,
  storyUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
  storyURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt:  PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  nextPages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  owner: PropTypes.shape({ login: PropTypes.string.isRequired }).isRequired,
}).isRequired;

const propsTypes = {
  pageList: PropTypes.arrayOf(pagePropTypes),
  saveStory: PropTypes.func.isRequired,
  removeStory: PropTypes.func.isRequired,
  unpublishStory: PropTypes.func.isRequired,
  publishStory: PropTypes.func.isRequired,
  removePage: PropTypes.func.isRequired,
};

const groupPageList = (filteredArr: Page[], arr: Page[][]): Page[][] => {
  const index: number = arr.length;
  const newArr = [...arr, []];
  const nextPages: string[] = arr[arr.length - 1].reduce((res: string[], item) => (
    Array.from(new Set(res.concat(item?.nextPages || [])))
  ), []);

  const newFilteredArr = filteredArr.filter((item) => {
    const isConvinient = !nextPages.includes(item.id);
    const some = newArr[index]
      .some((prevItem) => prevItem.nextPages?.includes(item.id));

    if (!isConvinient && !some) {
      newArr[index] = Array.from(new Set([...(newArr[index]), item]));
    }

    return isConvinient || some;
  });

  newArr[index].sort((item1, item2) => {
    const index1 = nextPages.indexOf(item1.id);
    const index2 = nextPages.indexOf(item2.id);

    if (index1 < index2) {
      return -1;
    }

    return 1;
  });

  if (!newArr[index][0]) {
    newArr.splice(index, 1);
  }

  if (!newFilteredArr.length) {
    return newArr;
  }

  if (filteredArr.length === newFilteredArr.length) {
    return [...newArr, filteredArr];
  }

  return groupPageList(newFilteredArr, newArr);
};

export class EditStory extends React.Component<Props, State> {
  static propsTypes = propsTypes;

  constructor(props: Props) {
    super(props);

    this.state = {
      pinnedIndex: 0,
      indexParent: '',
      changes: [],
    };
  }

  cancelChanges = () => {
    this.setState({
      changes: [],
    });
  }

  changePin = ({ id, index }: { id: string, index: number}) => {
    this.setState({
      indexParent: id,
      pinnedIndex: index,
    });
  }

  setFirst = (id: string) => {
    this.setState({
      changes: this.state.changes.map((item) => {
        if (item.id === id) {
          return { ...item, isFirst: true };
        }
  
        if (item.isFirst) {
          return { ...item, isFirst: false };
        }
  
        return item;
      }),
    });
  }

  setPin = (target: string) => {
    if (!this.props.pageList) {
      return;
    }

    const { indexParent: id } = this.state;
    const currentPage = this.props.pageList.find(item => item.id === id);

    if (!currentPage) {
      this.changePin({ id: '', index: 0 });

      return;
    }

    const hasChange = this.state.changes.find(item => item.id === id);
    const { nextPages } = currentPage;

    if (!this.state.changes[0]) {
      nextPages[this.state.pinnedIndex] = target;

      this.setState({
        changes: [{ id, nextPages }],
      })

      this.changePin({ id: '', index: 0 });

      return;
    }

    if (!hasChange) {
      nextPages[this.state.pinnedIndex] = target;

      this.setState({
        changes: this.state.changes.concat({ id, nextPages }),
      })

      this.changePin({ id: '', index: 0 });

      return;
    }

    this.setState({
      changes: this.state.changes.map((item) => {
        if (item.id === id) {
          item.nextPages[this.state.pinnedIndex] = target;
        }
  
        return item;
      }),
    });

    this.changePin({ id: '', index: 0 });
  }

  saveChanges = () => {
    if (this.props.pageList) {
      this.props.saveStory({
        storyURL: this.props.pageList[0].storyURL,
        changes: this.state.changes,
      });

      this.cancelChanges();
    }
  }

  get groupedPageList() {
    const { pageList } = this.props;

    if (!pageList) {
      return null;
    }

    const first = pageList.find((item) => item.isFirst);

    if (!first) {
      return [pageList];
    }

    const newArr = [[first]];
    const filtered = pageList.filter((item) => !item.isFirst);

    return groupPageList(filtered, newArr);
  }

  render() {
    if (!this.props.pageList || !this.props.pageList[0] || !this.groupedPageList) {
      return (
        <section className="edit-story">
          <h1 className="edit-story__title">Story was not found</h1>
        </section>
      );
    }

    const { title, storyURL, isPublished } = this.props.pageList[0];
    const arrList = this.groupedPageList.map((elemList, i) => (
      <ul className="edit-story__list" key={i}>
        { elemList.map((item, k) => (
          <li className="edit-story__item" key={k}>
            <Card
              card={item}
              changedCard={this.state.indexParent}
              changePin={this.changePin}
              setFirst={this.setFirst}
              setPin={this.setPin}
              removePage={this.props.removePage}
            />
          </li>
        ))}
      </ul>
    ));

    return (
      <section className="edit-story">
        <h1 className="edit-story__title">{title}</h1>

        {arrList}

        { this.state.changes[0] && (
          <Fragment>
            <Btn className="edit-story__btn" onClick={this.cancelChanges}>
              Cancel Changes
            </Btn>
  
            <Btn className="edit-story__btn" onClick={this.saveChanges}>
              Save Changes
            </Btn>
          </Fragment>
        )}
  
        { !this.state.changes[0] && (
          <Fragment>
            <Link className="edit-story__btn edit-story__link" to="/edit-page">Add New Page</Link>
  
            <Btn
              className="edit-story__btn"
              onClick={() => this.props.removeStory(storyURL)}
              >
              Remove Story
            </Btn>
  
            { isPublished && (
              <Btn
                className="edit-story__btn"
                onClick={() => this.props.unpublishStory(storyURL)}
                >
                Unpublish Story
              </Btn>
            )}
  
            { !isPublished && (
              <Btn
                className="edit-story__btn"
                onClick={() => this.props.publishStory(storyURL)}
                >
                Publish Story
              </Btn>
            )}
          </Fragment>
        )}
      </section>
    );
  }
};
