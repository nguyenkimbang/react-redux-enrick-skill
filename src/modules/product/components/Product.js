import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from "react-router"
import { Table } from 'react-bootstrap'
import * as productAction from './../actions/productAction'
import ProductDetail from './modals/ProductDetail'
import Pagination from "react-js-pagination"
import * as rootConst from 'config/constants'



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tbheads: [...this.getTbHeadList()],
      activePage: 1,
      search: ''
    }

    this.showDetail = this.showDetail.bind(this);
  }

  showDetail (product) {
    try {
      this.props.loadProductDetail(product.id)
    } catch (e) {
      //
    }
  }

  changePage(pageNumber) {
    this.setState({activePage: pageNumber}, () => {
      this.loadProductList()
    });
  }

  changeValueSearch (evt) {
    this.setState({search: evt.target.value})
  }

  searchProduct () {
    this.setState({activePage: 1}, () => {
      this.loadProductList()
    })
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('login')
    }

    this.loadProductList();
  }

  loadProductList () {
    this.props.loadProductList({
      page: this.state.activePage,
      limit: rootConst.TOTAL_ITEM_PER_PAGE,
      searchKey: this.state.search
    })
  }

  renderTBody(products) {
    if (products.length === 0) {
      return (
        <tr>
          <td colSpan={this.state.tbheads.length} className="text-center">No result</td>
        </tr>
      )
    }
    return products.map((product, index) => {
      return (
        <tr key={index}>
          {
            this.state.tbheads.map((item, key) => {
              if (item.key === 'action') {
                return <td key={key}><button key={key} type="button" onClick={() => this.showDetail(product)}>View</button></td>
              }
              return <td key={key}>{product[item.key]}</td>
            })
          }
        </tr>
      )
    })
  }

  render() {
    let products = [];
    if (Array.isArray(this.props.products.list)) {
      products = this.props.products.list;
    }
    return (
      <div className="container mb-5">
        <div className="row mt-1">
          <div className="col-12">
            <h1>Product List</h1>
          </div>
          <div className="col-12 d-flex justify-content-end">
            <div className="input-group mb-3 w-50">
              <input type="text" className="form-control" value={this.state.search}
              onChange={this.changeValueSearch.bind(this)}/>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" onClick={this.searchProduct.bind(this)} type="button">Search</button>
              </div>
          </div>
          </div>
        </div>
        <Table responsive>
          <thead>
            <tr>
              {this.state.tbheads.map((item, index) => (
                <th key={index}>{item.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            { this.renderTBody(products) }
          </tbody>
        </Table>
        { this.props.products.totalItem/rootConst.TOTAL_ITEM_PER_PAGE > 1  && <div>
          <Pagination
            itemClass="page-item"
            activePage={this.state.activePage}
            itemsCountPerPage={rootConst.TOTAL_ITEM_PER_PAGE}
            totalItemsCount={this.props.products.totalItem}
            pageRangeDisplayed={rootConst.PAGE_NUMBER}
            onChange={this.changePage.bind(this)}
          />
        </div>}
        <ProductDetail/>
      </div>
    )
  }

  getTbHeadList () {
    return [
      {
        key: 'product_name',
        label: 'Product Name',
        className: '',
      },
      {
        key: 'list_price',
        label: 'Price',
        className: '',
      },
      {
        key: 'model_year',
        label: 'Model Year',
        className: '',
      },
      {
        key: 'brand_name',
        label: 'Brand Name',
        className: '',
      },
      {
        key: 'action',
        label: 'Action'
      }
    ]
  }
}

const mapStateToProp = currentState => {
	return {
		products: {...currentState.stateProduct.product},
    productDetail: {...currentState.stateProduct.productDetail},
		messages: {...currentState.stateMessage}
	}
}

const mapDispatchToProps = (dispatch) => ({
	loadProductList: (params) => dispatch(productAction.productListAction(params)),
  loadProductDetail: (productId) => {
    dispatch(productAction.productDetailAction(productId))
    dispatch(productAction.productShowDetailAction())
  }
})

export default  connect(mapStateToProp, mapDispatchToProps)(withRouter(Dashboard));
