import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Btn } from '../../../../components/btn';
import { Svgicon } from '../../../../components/svgicon/Svgicon';
import { Field } from '../../../../components/field/Field';

import './index.sass';

interface State {
  form: {
    login: string | null;
    password: string | null;
    passwordConfirm: string | null;
  };
}

interface Props extends PropTypes.InferProps<typeof propTypes> {}

const propTypes = {
  className: PropTypes.string,
  formType: PropTypes.string.isRequired,
  signUp: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export class SignUp extends React.Component<Props, State> {
  propTypes = propTypes;

  constructor(props: Props) {
    super(props);

    this.state = {
      form: {
        login: null,
        password: null,
        passwordConfirm: null,
      },
    };
  }

  handleChange = (prop: string, value: string) => {
    this.setState({
      form: {
        ...this.state.form,
        [prop]: value,
      },
    });
  }

  handleSubmit = () => {
    if (this.props.formType === 'signup') {
      this.props.signUp(this.state.form);
    }

    if (this.props.formType === 'signin') {
      this.props.signIn(this.state.form);
    }
  }

  render() {
    return (
      <form className="sign-up">
        <Btn
          className="sign-up__close"
          isSmall
          onClick={() => this.props.close()}
        >
          <Svgicon icon="cross" />
        </Btn>

        <label className="sign-up__label" htmlFor="login">Username</label>

        <Field
          className="sign-up__field"
          id="login"
          value={this.state.form.login}
          name="login"
          type="text"
          handleInput={(value) => this.handleChange('login', value)}
        />

        <label className="sign-up__label" htmlFor="password">Password</label>

        <Field
          className="sign-up__field"
          id="password"
          value={this.state.form.password}
          name="password"
          type="password"
          handleInput={(value) => this.handleChange('password', value)}
        />

        { this.props.formType === 'signup' && (
          <Fragment>
            <label className="sign-up__label" htmlFor="passwordConfirm">Confirm Password</label>

            <Field
              className="sign-up__field"
              id="passwordConfirm"
              value={this.state.form.passwordConfirm}
              name="passwordConfirm"
              type="password"
              handleInput={(value) => this.handleChange('passwordConfirm', value)}
            />
          </Fragment>
        )}

        <Btn className="sign-up__btn" onClick={this.handleSubmit}>
          {this.props.formType === 'signup' ? 'Sign Up' : 'Sign In'}
        </Btn>
      </form>
    )
  }
}
