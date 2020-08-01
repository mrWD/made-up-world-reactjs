import React from 'react';
import { RouterProps, RouteComponentProps } from 'react-router';
import PropTypes from 'prop-types';

import { Btn } from '../../components/btn';
import { Svgicon } from '../../components/svgicon/Svgicon';
import { Field } from '../../components/field/Field';

import './index.sass';

interface Form {
  title: string;
  body: string;
  options: (string | null)[];
}

interface State {
  show: boolean;
  showItem: boolean;
  form: Form;
}

interface Props extends PropTypes.InferProps<typeof propTypes>, RouteComponentProps<{ id: string }>, RouterProps {}

const OPTIONS_LIST = 4;

const pagePropTypes = PropTypes.shape({
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
});

const propTypes = {
  currentStory: pagePropTypes,
  pageList: PropTypes.arrayOf(pagePropTypes),
  getStory: PropTypes.func.isRequired,
  savePage: PropTypes.func.isRequired,
};

const optionList = Array.from(Array(OPTIONS_LIST).keys());

export class EditPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      show: false,
      showItem: false,
      form: {
        title: '',
        body: '',
        options: [],
      },
    };
  }

  componentDidMount() {
    const { id: pageId } = this.props.match.params;

    if (pageId || this.props.pageList) {
      const body = {
        pageId,
        storyURL: this.props.pageList && this.props.pageList[0]?.storyURL,
      };

      this.props.getStory(body);
    }
  }

  componentWillReceiveProps(newProps: Props) {
    const { form } = this.state;

    if (newProps.currentStory) {
      Object.entries(newProps.currentStory).forEach(([key, val]) => {
        if (!form.hasOwnProperty(key)) {
          return;
        }

        if (form[key as keyof Form] === val) {
          return;
        }

        this.setState({
          form: {
            ...form,
            [key]: val,
          },
        });
      });
    }
  }

  removeOption(index: number) {
    this.setState({
      form: {
        ...this.state.form,
        options: this.state.form.options.map((item, i) => i !== index ? item : null),
      },
    });
  }

  clearOptions() {
    this.setState({
      form: {
        ...this.state.form,
        options: [],
      },
    });
  }

  handleSave() {
    const body = {
      ...this.state.form,
      pageId: this.props.match.params.id,
      storyURL: this.props.pageList && this.props.pageList[0]?.storyURL,
    };

    const callback = (storyURL: string) => {
      this.props.history.push(`/edit-story/${storyURL}`);
    };

    this.props.savePage(body, callback);
  }

  handleChange = (prop: string, value: string) => {
    this.setState({
      form: {
        ...this.state.form,
        [prop]: value,
      },
    });
  }

  get hasTitle() {
    return this.props.currentStory && this.props.currentStory.title;
  }

  render() {
    const pageList = optionList.map((item, i) => (
      <li className="edit-page__el" key={i}>
        <Field
          className="edit-page__option"
          value={this.state.form.options[item]}
          placeholder="Add option of choice"
          name={`choice${i}`}
          handleInput={this.handleChange}
        />

        <Btn onClick={() => this.removeOption(item)}>
          <Svgicon className="btn__icon" icon="cross"></Svgicon>
        </Btn>
      </li>
    ));

    return (
      <form className="edit-page">
        { this.hasTitle && <h1>{this.props.currentStory?.title}</h1> }

        { !this.hasTitle && (
          <Field
            className="edit-page__field"
            value={this.state.form.title}
            name="title"
            placeholder="Name of your story"
            handleInput={this.handleChange}
          />
        )}

        <Field
          className="edit-page__field edit-page__field_area"
          value={this.state.form.body}
          rows={10}
          type="textarea"
          name="body"
          placeholder="Text of your story"
          handleInput={this.handleChange}
        />

        <ul className="edit-page__list">{pageList}</ul>

        <Btn className="edit-page__btn" onClick={this.clearOptions}>Clear all</Btn> 

        <Btn className="edit-page__btn" onClick={this.handleSave}>Save</Btn>
      </form>
    );
  }
}
