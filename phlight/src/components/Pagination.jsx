import React from 'react';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    const currentPage = props.currentPage;
    const changePage = props.changePage;
    const totalPages = props.totalPages;
    const pages = props.pages;
    return (totalPages > 1 &&
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
            <li className={`page-item ${1 === currentPage ? `disabled` : ''}`}>
                <button className="page-link" onClick={() => changePage(currentPage - 1)} disabled={1 === currentPage}>Previous</button>
            </li>
            {pages.map(i =>
                <li key={i} className={`page-item ${i === currentPage ? `active` : ''}`}>
                <button className="page-link" onClick={() => changePage(parseInt(i))}>{i}</button>
                </li>
            )}
            <li className={`page-item ${currentPage === totalPages ? `disabled` : ''}`}>
                <button className="page-link" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </li>
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
    pages: PropTypes.array.isRequired
};

export default Pagination;

