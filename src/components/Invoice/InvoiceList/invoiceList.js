import { useEffect, useReducer, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "../index.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import InvoiceDetails from "../InvoiceDetails/invoiceDetails";

const invoicesReducer = (state, action) => {
  switch (action.type) {
    case "SET_INVOICES":
      return {
        ...state,
        invoices: action.payload,
      };
    //   break;
    case "ADD_INVOICES":
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      };
    //   break;

    default:
      break;
  }
};
const InvoiceList = () => {
  const [state, dispatch] = useReducer(invoicesReducer, {
    invoices: [],
  });
  const [invoiceItemdata, setInvoiceItemData] = useState({
    itemName: "",
    quantity: "",
    regularPrice: "",
    dealPrice: "",
    itemTax: "",
  });
  const [invoiceData, setInvoiceData] = useState({
    storeName: "",
    orderId: "",
    items: [],
  });
  const [showLoader, setShowLoader] = useState(true);
  const [showInvoice, setShowInVoice] = useState(false);
  const [ActInvoice, setActInvoice] = useState({});
  const [ActDate, setActDate] = useState("");
  const [selectedItemName, setSelectedItemName] = useState("");
  //   const [validated, setValidated] = useState(false);

  useEffect(() => {
    getInvoices();
  }, []);
  const getInvoices = async () => {
    try {
      const res = await axios.get(
        "https://mock-apis-wjjq.onrender.com/invoices"
      );
      if (res.status === 200) {
        dispatch({ type: "SET_INVOICES", payload: res.data });
        setShowLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

const filteredInvoices = state.invoices.filter((invoice) => {
  return (
    (!ActDate || invoice.date === ActDate) &&
    (!selectedItemName ||
      invoice.items.some((item) =>
        item.itemName.toLowerCase().includes(selectedItemName.toLowerCase())
      ))
  );
});
  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };
  const handleInvoiceItemChange = (e) => {
    const { name, value } = e.target;
    setInvoiceItemData({
      ...invoiceItemdata,
      [name]: value,
    });
  };
  const handleAddInvoiceItem = (e) => {
    const newItem = {
      itemName: invoiceItemdata.itemName,
      quantity: Number(invoiceItemdata.quantity),
      regularPrice: Number(invoiceItemdata.regularPrice),
      dealPrice: Number(invoiceItemdata.dealPrice),
      itemTax: Number(invoiceItemdata.itemTax),
      itemTotal:
        Number(invoiceItemdata.dealPrice) * Number(invoiceItemdata.quantity),
    };
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, newItem],
    });
    setInvoiceItemData({
      itemName: "",
      quantity: "",
      regularPrice: "",
      dealPrice: "",
      itemTax: "",
    });
  };
  const calculateTotals = (items) => {
    const totalTax = items.reduce((acc, item) => acc + item.itemTax, 0);
    const totalWithoutTax = items.reduce(
      (acc, item) => acc + item.itemTotal,
      0
    );
    const totalWithTax = totalWithoutTax + totalTax;
    return {
      totalWithTax,
      totalWithoutTax,
    };
  };

  const totals = calculateTotals(invoiceData.items);
  const handleSubmit = async (event) => {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // if (form.checkValidity() === true) {
    event.preventDefault();
    //   event.stopPropagation();
    const newInvoice = {
      ...invoiceData,
      id: state.invoices.length + 1,
      date: new Date().toISOString().split("T")[0],
      grandTotalWithoutTax: totals.totalWithoutTax,
      grandTotalWithTax: totals.totalWithTax,
    };

    try {
      const res = await axios.post(
        "https://mock-apis-wjjq.onrender.com/invoices",
        newInvoice
      );
      if (res.status === 201) {
        alert("Data Added Successfully.");
        setShowLoader(false);
        dispatch({
          type: "ADD_INVOICES",
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
    // }
    // setValidated(true);
    setInvoiceData({
      storeName: "",
      orderId: "",
      date: "",
      items: [],
      grandTotalWithoutTax: "",
      grandTotalWithTax: "",
    });
  };

  const modelInvoiceView = () => {
    return (
      <Modal
        show={showInvoice}
        size="lg"
        onHide={() => setShowInVoice(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {ActInvoice.orderId} | Invoice Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InvoiceDetails invoice={ActInvoice} />
        </Modal.Body>
      </Modal>
    );
  };

  const viewSettings = (id) => {
    setShowInVoice(true);
    const selectedInvoice = state.invoices.find((invoice) => invoice.id === id);
    setActInvoice(selectedInvoice);
  };
  return (
    <div className="container-fluid mt-3 d-flex flex-column justify-content-start align-items-start overflow-auto">
      <h1 style={{ color: "#375158", marginBottom: "12px" }}>Invoices Form</h1>
      <div className="form-card">
        <Form
          //   noValidate
          //   validated={validated}
          onSubmit={handleSubmit}
          className="d-flex flex-column"
        >
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="3"
              //   controlId="validationCustom01"
              className="d-flex flex-column justify-content-start"
            >
              <Form.Label style={{ textAlign: "left", fontWeight: "500" }}>
                Store Name
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Store Name"
                name="storeName"
                value={invoiceData.storeName}
                onChange={handleInvoiceChange}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              //   controlId="validationCustom02"
              className="d-flex flex-column justify-content-start"
            >
              <Form.Label style={{ textAlign: "left", fontWeight: "500" }}>
                Order-ID
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Order-ID"
                name="orderId"
                value={invoiceData.orderId}
                onChange={handleInvoiceChange}
              />
            </Form.Group>
          </Row>
          <h3
            style={{
              fontSize: "25px",
              fontWeight: "500",
              color: "#375158",
              textAlign: "left",
              margin: "10px 0px 15px 0px",
            }}
          >
            Add Item Form
          </h3>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="3"
              // controlId="validationCustom06"
            >
              {/* <Form.Label>Item Name</Form.Label> */}
              <Form.Control
                // required
                type="text"
                placeholder="Item Name"
                name="itemName"
                value={invoiceItemdata.itemName}
                onChange={handleInvoiceItemChange}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="2"
              // controlId="validationCustom07"
            >
              {/* <Form.Label>Deal Price</Form.Label> */}
              <Form.Control
                // required
                type="number"
                placeholder="DealPrice"
                name="dealPrice"
                value={invoiceItemdata.dealPrice}
                onChange={handleInvoiceItemChange}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="2"
              // controlId="validationCustom08"
            >
              {/* <Form.Label>Regular Price</Form.Label> */}
              <Form.Control
                // required
                type="number"
                placeholder="RegularPrice"
                name="regularPrice"
                value={invoiceItemdata.regularPrice}
                onChange={handleInvoiceItemChange}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="2"
              // controlId="validationCustom09"
            >
              {/* <Form.Label>Quantity</Form.Label> */}
              <Form.Control
                // required
                type="number"
                placeholder="Qty"
                name="quantity"
                value={invoiceItemdata.quantity}
                onChange={handleInvoiceItemChange}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="2"
              //  controlId="validationCustom09"
            >
              <Form.Control
                // required
                type="number"
                placeholder="Item Tax"
                name="itemTax"
                value={invoiceItemdata.itemTax}
                onChange={handleInvoiceItemChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="1">
              <Form.Label></Form.Label>
              <Button onClick={handleAddInvoiceItem}>Add</Button>
            </Form.Group>
          </Row>
          <Button type="submit" className="mt-3 mb-3 align-self-end bg-success">
            Submit form
          </Button>
        </Form>
      </div>
      <h1 style={{ color: "#375158", marginBottom: "12px" }}>Invoices List</h1>
      {showLoader && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "500", color: "gold" }}>
            Loading...
          </p>
        </div>
      )}
      {!showLoader && (
        <div className="table-container">
          <div className="d-flex justify-content-start align-items-start">
            <InputGroup className="mb-3 me-3">
              <InputGroup.Text>📅</InputGroup.Text>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                type="date"
                onChange={(e) => setActDate(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text style={{ fontSize: "14px" }}>
                ItemName
              </InputGroup.Text>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                type="search"
                onChange={(e) => setSelectedItemName(e.target.value)}
              />
            </InputGroup>
          </div>
          <Table hover>
            <thead>
              <tr>
                <th style={{ background: "#375158", color: "#ffffff" }}>
                  Order-ID
                </th>
                <th style={{ background: "#375158", color: "#ffffff" }}>
                  Store Name
                </th>
                <th style={{ background: "#375158", color: "#ffffff" }}>
                  Date
                </th>
                <th style={{ background: "#375158", color: "#ffffff" }}>
                  Item
                </th>
                <th style={{ background: "#375158", color: "#ffffff" }}>
                  Without-Tax
                </th>
                <th style={{ background: "#375158", color: "#ffffff" }}>
                  Total-With-tax
                </th>
                <th style={{ background: "#375158", color: "#ffffff" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.orderId}</td>
                  <td>{invoice.storeName}</td>
                  <td>{invoice.date}</td>
                  <td>
                    {invoice.items.map((item) => item.itemName).join(", ")}
                  </td>
                  <td>{invoice.grandTotalWithoutTax}</td>
                  <td>{invoice.grandTotalWithTax}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => viewSettings(invoice.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {showInvoice && <div className="w-100">{modelInvoiceView()}</div>}
    </div>
  );
};
export default InvoiceList;
