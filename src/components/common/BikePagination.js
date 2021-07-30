import React from 'react';
// import '../App.scss';
import {Pagination} from 'react-bootstrap'
 
class BikePagination extends React.Component {
 
    renderFirstPage = () => {
        const { numOfPageDisplay, currentPage } = this.props
        return currentPage - Math.floor(numOfPageDisplay/2) > 1 ? <Pagination.Item onClick={() => this.changePage(1)}>{1}</Pagination.Item> : ''
    }
 
    renderLeftEllipsis = () => {
        const { numOfPageDisplay, currentPage, totalItem, perPage } = this.props
        const surplus = parseInt(totalItem) % parseInt(perPage) !== 0 ? 1 : 0
        const totalPage = Math.floor(parseInt(totalItem) / parseInt(perPage)) + surplus
        return currentPage - Math.floor(numOfPageDisplay/2) > 2 && totalPage > numOfPageDisplay + 2 ? <Pagination.Ellipsis disabled/> : ''
    }
 
    renderCenterPage = () => {
        const { numOfPageDisplay, currentPage, totalItem, perPage } = this.props
        const surplus = parseInt(totalItem) % parseInt(perPage) !== 0 ? 1 : 0
        const totalPage = Math.floor(parseInt(totalItem) / parseInt(perPage)) + surplus
 
        let paginElm = ''
        if (totalPage === 1) {
            return paginElm
        }
        let centerPage = []
        let firstPosition = ''
        if (currentPage <= Math.floor(numOfPageDisplay/2) + 1) {
            firstPosition = 1
        } else if (currentPage >= totalPage - Math.floor(numOfPageDisplay/2)) {
            firstPosition = totalPage - numOfPageDisplay + 1
        } else {
            firstPosition = currentPage - Math.floor(numOfPageDisplay/2)
        }
 
        for (let i = 0; i < numOfPageDisplay; i++) {
            let page = firstPosition + i
            if (page > totalPage) {
                break
            }
            centerPage.push(<Pagination.Item key={page} onClick={() => this.changePage(page)} active={page === currentPage}>{page}</Pagination.Item>)
        }
        return centerPage
    }
    renderRightEllipsis = () => {
        const { numOfPageDisplay, currentPage, totalItem, perPage } = this.props
        const surplus = parseInt(totalItem) % parseInt(perPage) !== 0 ? 1 : 0
        const totalPage = Math.floor(parseInt(totalItem) / parseInt(perPage)) + surplus
        return (currentPage + Math.floor(numOfPageDisplay/2) < totalPage - 1 && totalPage > numOfPageDisplay) ? <Pagination.Ellipsis disabled/> : ''
    }
 
    renderLastPage = () => {
        const { numOfPageDisplay, currentPage, totalItem, perPage } = this.props
        const surplus = parseInt(totalItem) % parseInt(perPage) !== 0 ? 1 : 0
        const totalPage = Math.floor(parseInt(totalItem) / parseInt(perPage)) + surplus
        return (currentPage + Math.floor(numOfPageDisplay/2) < totalPage && totalPage > numOfPageDisplay) ? <Pagination.Item onClick={() => this.changePage(totalPage)}>{totalPage}</Pagination.Item> : ''
    }
 
    changePage = (page) => {
        this.props.onPageChange(page)
    }
 
    render() {
        const { currentPage, totalItem, perPage } = this.props
        const surplus = parseInt(totalItem) % parseInt(perPage) !== 0 ? 1 : 0
        const totalPage = Math.floor(parseInt(totalItem) / parseInt(perPage)) + surplus
        if (totalPage < 2) {
            return ''
        }
        return (
            <Pagination >
                <Pagination.First onClick={() => this.changePage(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => this.changePage(currentPage - 1)} disabled={currentPage === 1}/>
                { this.renderFirstPage() }
                { this.renderLeftEllipsis() }
                { this.renderCenterPage() }
                { this.renderRightEllipsis() }
                { this.renderLastPage() }
                <Pagination.Next onClick={() => this.changePage(currentPage + 1)} disabled={currentPage === totalPage}/>
                <Pagination.Last onClick={() => this.changePage(totalPage)} disabled={currentPage === totalPage}/>
            </Pagination>
        );
    }
}
 
export default BikePagination;
