import { Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from "react";
function ProductDetail(props) {
  const [show, setShow] = useState(props.show);
  const [product, setProduct] = useState(props.product);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (Object.keys(product).length === 0) {
  	return null
  }
  return (
    <>
      <Modal show={show} onHide={props.handleCloseDetailModal} size="md" centered="true">
        <Modal.Header closeButton>
          <Modal.Title>Product Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12">
            <label className="col-4 text-right">Product ID:</label>
            <label className="col-8 ml-0 pl-0">{product.product_id ?? ''}</label>
          </div>
          <div className="col-12">
            <label className="col-4 text-right">Product Name:</label>
            <label className="col-8 ml-0 pl-0">{product.product_name ?? ''}</label>
          </div>
          <div className="col-12">
            <label className="col-4 text-right">Brand:</label>
            <label className="col-8 ml-0 pl-0">{product.brand.brand_name ?? ''}</label>
          </div>
          <div className="col-12">
            <label className="col-4 text-right">Model Year:</label>
            <label className="col-8 ml-0 pl-0">{product.model_year ?? ''}</label>
          </div>
          <div className="col-12">
            <label className="col-4 text-right">Price:</label>
            <label className="col-8 ml-0 pl-0">{product.list_price ?? 0}</label>
          </div>
          <div className="col-12">
            <label className="col-4 text-right">Product Name:</label>
            <label className="col-8 ml-0 pl-0">{product.product_name}</label>
          </div>
        </Modal.Body>
        <Modal.Footer  className="justify-content-center">
          <Button variant="secondary" onClick={props.handleCloseDetailModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductDetail;
