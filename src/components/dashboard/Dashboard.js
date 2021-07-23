import React from 'react'
import { withRouter } from "react-router";
import * as apiUtils from './../../common/apiUtils'
import { Table } from 'react-bootstrap'


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tbheads: [...this.getTbHeadList()],
      products: []
    }
  }

  loadProductData() {
    apiUtils.get('products').then(result => {
      this.setState({ products: result.products.slice(0, 20) })
    }).catch(e => {
      this.setState({ errMsg: 'Login fail!. Please try again.', successMsg: '' })
    })
  }

  renderTBody() {
    return this.state.products.map((product, index) => {
      return (
        <tr key={index}>
          {
            this.state.tbheads.map((item, key) => {
              if (item.key === 'brand_name') {
                return <td key={key}>{product['brand'][item.key]}</td>
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

    this.loadProductData()
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-1">
          <div className="col-12">
            <h1>Product List</h1>
          </div>
          <div className="col-12 text-right">
            <label className=""><b>Total:</b> {this.state.products.length || 0} item(s)</label>
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
      }
    ]
  }
}

export default withRouter(Dashboard)