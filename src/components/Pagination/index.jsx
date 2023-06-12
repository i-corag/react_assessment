import ReactPaginate from 'react-paginate';
import './pagination.css'

const Pagination = ({ changePage, posts }) => {

    return (
        <ReactPaginate
            previousLabel={'← Vorige pagina'}
            nextLabel={'Volgende pagina →'}
            pageCount={posts?.last_page || 0}
            onPageChange={changePage}
            containerClassName={'paginationBtns'}
            disabledClassName={'paginationDisable'}
            activeClassName={'paginationActive'}
        />
    )
}

export default Pagination