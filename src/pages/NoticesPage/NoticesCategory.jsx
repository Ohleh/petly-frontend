import Loader from 'components/Loader';
import NoticesCategoriesList from 'components/Notices/NoticesCategoriesList/NoticesCategoriesList';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectNotices,
  selectIsLoading,
  selectTotalNotice,
} from 'redux/notices/notices-selectors';

import ReactPaginate from 'react-paginate';
import { fetchNotices } from 'redux/notices/notices-operation';

const NoticesCategory = () => {
  const { categoryName } = useParams();
  const isLoading = useSelector(selectIsLoading);
  const total = useSelector(selectTotalNotice);
  const limit = 4;
  const query = '';
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(total / limit);

  const dispatch = useDispatch();

  useEffect(() => {
    if (query !== '') {
      dispatch(
        fetchNotices({
          categoryName,
          query: query,
          page: currentPage,
          limit: limit,
        })
      );
    } else {
      dispatch(fetchNotices({ categoryName, page: currentPage, limit: limit }));
    }
  }, [dispatch, categoryName, query, currentPage]);

  const notices = useSelector(selectNotices);

  const handlePageClick = event => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      {notices?.length === 0 && !isLoading && (
        <p>List is empty! Try to add pet :)</p>
      )}
      {isLoading && <Loader />}

      <NoticesCategoriesList route={categoryName} notices={notices} />
      <ReactPaginate
        previousLabel={'←'}
        nextLabel={'→'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination__link'}
        nextLinkClassName={'pagination__link'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default NoticesCategory;
