import React from 'react'
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import * as apiUtils from 'common/apiUtils'
import { Table } from 'react-bootstrap'
import * as productAction from './../actions/productAction'
import ProductDetail from './modals/ProductDetail'
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tbheads: [...this.getTbHeadList()],
      productDetail: {},
      show: false,
      activePage: 1
    }
    this.product = {};
    this.showDetail = this.showDetail.bind(this);
    this.handleCloseDetailModal = this.handleCloseDetailModal.bind(this);
  }

  showDetail (product) {
    this.setState({productDetail: {...product}, show: true})
  }

  handleCloseDetailModal () {
    this.setState({show: false})
  }

  changePage(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  loadProductPerPage(pageNumber) {
    const offset = (parseInt(pageNumber) -1) * 10;
    const limit = offset + 10;
    return this.product = [...this.props.products].slice(offset, limit);
  }

  renderTBody() {
    return this.product.map((product, index) => {
      return (
        <tr key={index}>
          {
            this.state.tbheads.map((item, key) => {
              if (item.key === 'brand_name') {
                return <td key={key}>{product['brand'][item.key]}</td>
              } else if (item.key === 'action') {
                return <td key={key}><button key={key} type="button" onClick={() => this.showDetail(product)}>View</button></td>
              }
              return <td key={key}>{product[item.key]}</td>
            })
          }
        </tr>
      )
    })
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('login')
    }

    this.props.loadProductList()
  }

  render() {
    this.product = this.loadProductPerPage(this.state.activePage);
    return (
      <div className="container">
        <div className="row mt-1">
          <div className="col-12">
            <h1>Product List</h1>
          </div>
          <div className="col-12 text-right">
            <label className=""><b>Total:</b> {this.product.length || 0} item(s)</label>
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
            { this.renderTBody() }
          </tbody>
        </Table>
        <div>
          <Pagination
            itemClass="page-item"
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.props.products.length}
            pageRangeDisplayed={5}
            onChange={this.changePage.bind(this)}
          />
        </div>
        {this.state.show === true &&
        <ProductDetail show={this.state.show} product={this.state.productDetail} handleCloseDetailModal={this.handleCloseDetailModal}/>}
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
		products: [...currentState.stateProduct.products],
		messages: {...currentState.stateMessage}
	}
}

const mapDispatchToProps = dispatch => ({
	loadProductList: () => dispatch(productAction.productListAction())
})

export default  connect(mapStateToProp, mapDispatchToProps)(withRouter(Dashboard));
