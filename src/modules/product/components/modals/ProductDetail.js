import React from 'react';
import {connect} from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import * as productAction from './../../actions/productAction'

class ProductDetail extends React.Component {
  hideModal () {
    this.props.hideModal();
  }

  render() {
    if (this.props.product === null) {
      return null
    }
    return (
      <>
        <Modal show={this.props.show} size="md" centered="true" onHide={this.hideModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Product Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-12">
              <label className="col-4 text-right">Product ID:</label>
              <label className="col-8 ml-0 pl-0">{this.props.product.id ?? ''}</label>
            </div>
            <div className="col-12">
              <label className="col-4 text-right">Product Name:</label>
              <label className="col-8 ml-0 pl-0">{this.props.product.product_name ?? ''}</label>
            </div>
            <div className="col-12">
              <label className="col-4 text-right">Brand:</label>
              <label className="col-8 ml-0 pl-0">{this.props.product.brand_name ?? ''}</label>
            </div>
            <div className="col-12">
              <label className="col-4 text-right">Model Year:</label>
              <label className="col-8 ml-0 pl-0">{this.props.product.model_year ?? ''}</label>
            </div>
            <div className="col-12">
              <label className="col-4 text-right">Price:</label>
              <label className="col-8 ml-0 pl-0">{this.props.product.list_price ?? 0}</label>
            </div>
            <div className="col-12">
              <label className="col-4 text-right">Category Name:</label>
              <label className="col-8 ml-0 pl-0">{this.props.product.category_name}</label>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button variant="secondary" onClick={this.hideModal.bind(this)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

const mapStateToProp = state => {
  return {
    product: {...state.stateProduct.productDetail},
    show: state.stateProduct.modal.show
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(productAction.productHiedeDetailAction())
})

export default connect(mapStateToProp, mapDispatchToProps)(ProductDetail);
