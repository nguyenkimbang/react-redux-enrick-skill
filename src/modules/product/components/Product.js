import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from "react-router"
import { Table } from 'react-bootstrap'
import rootActionConfig from 'core/actions'
import rootMessage from 'core/messages'
import ProductDetail from './modals/ProductDetail'
import Pagination from "components/common/BikePagination"
import * as rootConst from 'config/constants'
import iconDetail from 'assets/images/details.svg'
import iconPlus from 'assets/images/plus.svg'
import ShoppingCart from './Cart'
import { ToastContainer, toast } from 'react-toastify';



class Product extends React.Component {
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
      const pointerS = {cursor: 'pointer'};
      return (
        <tr key={index}>
          {
            this.state.tbheads.map((item, key) => {
              if (item.key === 'action') {
                return <td key={key} className="text-center">
                  <div className="col-12 d-flex justify-content-center">
                    <div className="" style={pointerS} onClick={() => this.showDetail(product)}>
                      <img src={iconDetail} alt="icon detail" width="20px" height="20px"/>
                    </div>
                    <div className="ml-2" style={pointerS} onClick={() => this.props.addCartAction({
                      product_id: product.id,
                      list_price: product.list_price,
                      product_name: product.product_name
                    })}>
                      <img src={iconPlus} alt="icon plus" width="23px" height="23px"/>
                    </div>
                  </div>
                </td>
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
      <div className="container mb-5 mt-3">
        <div className="row mt-1">
          <div className="col-12 d-flex">
            <h1>Product List</h1>
            <div className="ml-auto">
              <ShoppingCart/>
            </div>
          </div>
          <div className="col-12 mt-4 d-flex justify-content-end">
            <div className="input-group mb-3 w-50">
              <input type="text" className="form-control" value={this.state.search}
              onChange={this.changeValueSearch.bind(this)}/>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" onClick={this.searchProduct.bind(this)} type="button">Search</button>
              </div>
          </div>
          </div>
        </div>
        <Table responsive  className="mt-1">
          <thead>
            <tr>
              {this.state.tbheads.map((item, index) => (
                <th className={item.className} key={index}>{item.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            { this.renderTBody(products) }
          </tbody>
        </Table>
        { this.props.products.totalItem/rootConst.TOTAL_ITEM_PER_PAGE > 1  && <div>
          <Pagination
            onPageChange={this.changePage.bind(this)}
            {...{
              currentPage: this.state.activePage,
              totalItem: this.props.products.totalItem,
              perPage: rootConst.TOTAL_ITEM_PER_PAGE,
              numOfPageDisplay: rootConst.PAGE_NUMBER
            }}
          />
        </div>}
        <ProductDetail/>
        <ToastContainer
          position="top-right"
          autoClose={2000}
        />
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
        label: 'Action',
        className: 'text-center'
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
	loadProductList: (params) => dispatch(rootActionConfig.product.productListAction(params)),
  loadProductDetail: (productId) => {
    dispatch(rootActionConfig.product.productDetailAction(productId));
    dispatch(rootActionConfig.product.productShowDetailAction());
  },
  addCartAction: (product) => {
    dispatch(rootActionConfig.cart.addCartAction(product));
    toast(rootMessage.cart.ADD_CART_SUCCESS);
  }
})

export default connect(mapStateToProp, mapDispatchToProps)(withRouter(Product));
