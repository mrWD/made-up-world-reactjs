import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Btn } from '../../../components/btn';
import { Svgicon } from '../../../components/svgicon/Svgicon';
import { Tooltip } from '../../../components/tooltip/Tooltip';

import './index.sass';

interface Props extends PropTypes.InferProps<typeof propTypes> {}

const propTypes = {
  changedCard: PropTypes.string,
  card: PropTypes.shape({
    isFirst: PropTypes.bool,
    id: PropTypes.string.isRequired,
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
  }).isRequired,
  setFirst: PropTypes.func.isRequired,
  setPin: PropTypes.func.isRequired,
  changePin: PropTypes.func.isRequired,
  removePage: PropTypes.func.isRequired,
};

const addBackground = (value: string) => {
  const color = value
    .substring(value.length - 6)
    .split('')
    .reverse()
    .join('');

  return {
    backgroundColor: `#${color}`,
  };
}

const Card = (props: Props) => {
  const optionList = props.card.options && props.card.options.map((item, i) => (
    <Btn
      className="card__btn tooltip-trigger"
      isSmall
      onClick={props.changePin({ id: props.card.id, index: i })}
    >
      {i + 1}

      { props.card.nextPages && props.card.nextPages[i] && (
        <div className="card__color" style={addBackground(props.card.nextPages[i])}></div>
      )}

      <Tooltip text={item}></Tooltip>
    </Btn>
  ));

  return (
    <article className="card">
      <div className="card__head" style={addBackground(props.card.id)}>
        { props.changedCard && props.changedCard !== props.card.id && (
          <Btn
            className="card__btn card__pin"
            isSmall
            onClick={props.setPin(props.card.id)}
          >
            <Svgicon className="btn__icon" icon="pin"></Svgicon>
          </Btn>
        )}

        { !props.card.isFirst && (
          <Btn
            className="card__btn"
            isSmall
            onClick={props.setFirst(props.card.id)}
          >
            Set as #1
          </Btn>
        )}

        { props.card.isFirst && <span className="card__btn">The #1</span> }

        <Link className="card__btn card__link" to={`/edit-page/${props.card.id}`}>
          <Svgicon className="btn__icon" icon="edit"></Svgicon>
        </Link>

        <Btn className="card__btn" isSmall onClick={props.removePage(props.card.id)}>
          <Svgicon className="btn__icon" icon="cross"></Svgicon>
        </Btn>
      </div>

      <div className="card__body">
        <p className="card__title">{props.card.body}</p>

        { (!props.card.options || !props.card.options[0]) && (
          <Btn
            isSmall
            onClick={props.changePin({ id: props.card.id, index: 0 })}
            >
            <span className="card__color-desc">Bind next page</span>

            { props.card.nextPages && props.card.nextPages[0] && (
              <div className="card__color" style={addBackground(props.card.nextPages[0])}></div>
            )}
          </Btn>
        )}

        {optionList}
      </div>
    </article>
  );
};

Card.propTypes = propTypes;

export { Card }
