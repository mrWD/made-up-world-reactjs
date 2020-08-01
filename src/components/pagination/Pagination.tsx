import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Btn } from '../btn';
import { Svgicon } from '../svgicon/Svgicon';

import './Pagination.sass';

interface Props extends PropTypes.InferProps<typeof Pagination.propTypes> {}

const PAGE_COUNT = 4;

const getLastPage = (page: number, pageNumber: number) => {
  return (Math.ceil(pageNumber / PAGE_COUNT) - 1) * PAGE_COUNT + page;
}

const getPageList = (pageCount: number) => {
  const page = pageCount < PAGE_COUNT ? pageCount : PAGE_COUNT;

  return Array.from(Array(page).keys());
}

const Pagination = (props: Props) => (
  <ul className="pagination">
    { props.pageNumber > 4 && (
      <Fragment>
        <li className="pagination__item">
          <Btn isSmall onClick={() => props.onClick(1)}>
            <Svgicon icon="chevronDouble" />
          </Btn>
        </li>

        <li className="pagination__item">
          <Btn isSmall onClick={() => props.onClick(props.pageNumber - 1)}>
            <Svgicon icon="chevron" />
          </Btn>
        </li>
      </Fragment>
    )}

    { getPageList(props.pageCount).map((page, i) => (
      <li className="pagination__item" key={i}>
        <Btn
          disabled={getLastPage(page, props.pageNumber) === props.pageNumber}
          isSmall
          onClick={() => props.onClick(getLastPage(page, props.pageNumber))}
        >
          {page + 1}
        </Btn>
      </li>
    )) }

    { props.pageNumber <= props.pageCount - 4 && (
      <Fragment>
        <li className="pagination__item">
          <Btn isSmall onClick={() => props.onClick(props.pageNumber + 1)}>
            <Svgicon className="pagination__last-icon" icon="chevron" />
          </Btn>
        </li>

        <li className="pagination__item">
          <Btn isSmall onClick={() => props.onClick(props.pageCount)}>
            <Svgicon className="pagination__last-icon" icon="chevronDouble" />
          </Btn>
        </li>
      </Fragment>
    )}
  </ul>
);

Pagination.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { Pagination }
