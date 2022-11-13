import { type } from '@testing-library/user-event/dist/type';
import React from 'react'
import ReactPaginate from 'react-paginate';

import styles from "./Pagination.module.scss";

type paginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<paginationProps> = ({ currentPage, onChangePage}) => {
  return (
    <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={currentPage - 1}
  />
  )
}
export default Pagination