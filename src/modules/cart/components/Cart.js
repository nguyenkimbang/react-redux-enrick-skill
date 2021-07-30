import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from "react-router"
import { Table } from 'react-bootstrap'
import rootActionConfig from 'core/actions'
import rootMessage from 'core/messages'
import moment from 'moment'
import DatePicker from "react-datepicker"
import iconTrash from 'assets/images/trash-bin.svg'
import { ToastContainer, toast } from 'react-toastify';


class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tbheads: [...this.getTbHeadList()],
      activePage: 1,
      search: ''
    }
    this.changeQuantity = this.changeQuantity.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.changeRequiredDate = this.changeRequiredDate.bind(this);
  }

  removeCartItem (product_id) {
    try {
      this.props.remove(parseInt(product_id))
    } catch (e) {
      //
    }
  }

  changeQuantity (evt, product_id) {
    let quantity = evt.target.value.trim();
    if (quantity === '') {
      quantity = 1;
    }

    this.props.edit({quantity, product_id});
  }

  changeRequiredDate (date, product_id) {
    let required_date = date;
    if (!moment(required_date).isValid()) {
      required_date = new Date();
    }

    this.props.edit({required_date, product_id});
  }

  order = () => {
    let customerId = 1;
    if (localStorage.getItem('customerInfo')) {
      const user = JSON.parse(localStorage.getItem('customerInfo'));
      customerId = user.customer_id;
    }
    this.props.order({
      customerId,
      itemList: this.props.carts
    })
  }
  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('login')
    }
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
      const totalPrice = parseFloat(product['price']) * parseInt(product['quantity']);
      const pointerS = {cursor: 'pointer'};

      return (
        <tr key={index}>
          {
            this.state.tbheads.map((item, key) => {
              if (item.key === 'action') {
                return <td key={key} className="text-center">
                  <div className="col-12 d-flex  justify-content-center">
                    <div className="" style={pointerS} onClick={() => this.removeCartItem(product['product_id'])}>
                      <img src={iconTrash} alt="icon trash-bin" width="20px" height="20px"/>
                    </div>
                  </div>
                </td>
              } else if (item.key === 'total_price') {
                return <td key={key}>{totalPrice}</td>
              } else if (item.key === 'required_date') {
                return <td key={key}>{moment(product['required_date']).isValid() &&<DatePicker className="form-control" selected={new Date(product['required_date'])} minDate={new Date()} onChange={(date) => this.changeRequiredDate(date, product['product_id'])} />}</td>
              } else if (item.key === 'quantity') {
                return <td key={key}><input type="number" className="form-control" min="1" value={parseInt(product[item.key])} onChange={(e) => {this.changeQuantity(e, product['product_id'])}}/></td>
              }
              return <td key={key}>{product[item.key]}</td>
            })
          }
        </tr>
      )
    })
  }

  render() {
    let carts = [];
    if (Array.isArray(this.props.carts)) {
      carts = this.props.carts;
    }
    return (
      <div className="container mb-5 mt-3">
        <div className="row mt-1">
          <div className="col-12">
            <h1>Cart Items</h1>
          </div>
        </div>
        <Table responsive className="mt-5">
          <thead>
            <tr>
              {this.state.tbheads.map((item, index) => (
                <th className={item.className} key={index}>{item.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            { this.renderTBody(carts) }
          </tbody>
        </Table>
        {carts.length > 0 && <div className="cold-12 d-flex justify-content-end mt-3">
          <button className="btn btn-primary" onClick={this.order}>Submit</button>
        </div>}
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
        key: 'quantity',
        label: 'Quantity',
        className: '',
      },
      {
        key: 'price',
        label: 'Price',
        className: '',
      },
      {
        key: 'total_price',
        label: 'Total Price',
        className: '',
      },
      {
        key: 'required_date',
        label: 'Required Date',
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
		carts: [...currentState.cart.list]
	}
}

const mapDispatchToProps = (dispatch) => ({
	edit: (params) => {
    dispatch(rootActionConfig.cart.editCartItemAction(params));
    toast(rootMessage.cart.UPDATE_CART_SUCCESS);
  },
  remove: (params) => {
    dispatch(rootActionConfig.cart.removeCartItemAction(params));
    toast(rootMessage.cart.REMOVE_CART_SUCCESS);
  },
  order: (params) => dispatch(rootActionConfig.cart.order(params))
})

export default connect(mapStateToProp, mapDispatchToProps)(withRouter(Cart));
