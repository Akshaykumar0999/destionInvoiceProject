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

// Reducer function
const invoicesReducer = (state, action) => {
  switch (action.type) {
    case "SET_INVOICES":
      return { ...state, invoices: action.payload };

    case "ADD_INVOICE":
      return { ...state, invoices: [...state.invoices, action.payload] };

    default:
      return state;
  }
};

const InvoiceList = () => {
  const [state, dispatch] = useReducer(invoicesReducer, { invoices: [] });

  const [invoiceItemData, setInvoiceItemData] = useState({
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
  const [showInvoice, setShowInvoice] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(
        "https://mock-apis-wjjq.onrender.com/invoices"
      );
      if (res.status === 200) {
        dispatch({ type: "SET_INVOICES", payload: res.data });
        setShowLoader(false);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  // Filter invoices based on date
  const filteredInvoices = state.invoices.filter((invoice) => {
    return (
      (!selectedDate || invoice.date === selectedDate) &&
      (!selectedItemName ||
        invoice.items.some((item) =>
          item.itemName.toLowerCase().includes(selectedItemName.toLowerCase())
        ))
    );
  });

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleInvoiceItemChange = (e) => {
    const { name, value } = e.target;
    setInvoiceItemData({ ...invoiceItemData, [name]: value });
  };

  const handleAddInvoiceItem = () => {
    const newItem = {
      ...invoiceItemData,
      quantity: Number(invoiceItemData.quantity),
      regularPrice: Number(invoiceItemData.regularPrice),
      dealPrice: Number(invoiceItemData.dealPrice),
      itemTax: Number(invoiceItemData.itemTax),
      itemTotal:
        Number(invoiceItemData.dealPrice) * Number(invoiceItemData.quantity),
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
    return {
      totalWithoutTax,
      totalWithTax: totalWithoutTax + totalTax,
    };
  };

  const totals = calculateTotals(invoiceData.items);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        alert("Invoice Added Successfully.");
        dispatch({ type: "ADD_INVOICE", payload: res.data });
      }
    } catch (error) {
      console.error("Error adding invoice:", error);
    }

    setInvoiceData({ storeName: "", orderId: "", items: [] });
  };

  const viewInvoice = (id) => {
    const selectedInvoice = state.invoices.find((invoice) => invoice.id === id);
    setActiveInvoice(selectedInvoice);
    setShowInvoice(true);
  };

  return (
    <div className="container-fluid mt-3">
      <h1 className="text-primary">Invoices Form</h1>

      <Form onSubmit={handleSubmit} className="form-card">
        <Row className="mb-3">
          <Col md="3">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="storeName"
              value={invoiceData.storeName}
              onChange={handleInvoiceChange}
            />
          </Col>
          <Col md="3">
            <Form.Label>Order ID</Form.Label>
            <Form.Control
              required
              type="text"
              name="orderId"
              value={invoiceData.orderId}
              onChange={handleInvoiceChange}
            />
          </Col>
        </Row>

        <h3 className="text-secondary">Add Item</h3>

        <Row className="mb-3">
          {["itemName", "dealPrice", "regularPrice", "quantity", "itemTax"].map(
            (field, index) => (
              <Col key={index} md="2">
                <Form.Control
                  type={
                    field.includes("Price") || field === "quantity"
                      ? "number"
                      : "text"
                  }
                  placeholder={field}
                  name={field}
                  value={invoiceItemData[field]}
                  onChange={handleInvoiceItemChange}
                />
              </Col>
            )
          )}
          <Col md="1">
            <Button onClick={handleAddInvoiceItem}>Add</Button>
          </Col>
        </Row>

        <Button type="submit" className="mt-3 bg-success">
          Submit
        </Button>
      </Form>

      <h1 className="text-primary">Invoices List</h1>

      {showLoader ? (
        <div className="text-center text-warning">Loading...</div>
      ) : (
        <>
          <div className="d-flex mb-3">
            <InputGroup className="me-3">
              <InputGroup.Text>📅</InputGroup.Text>
              <Form.Control
                type="date"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Item Name</InputGroup.Text>
              <Form.Control
                type="search"
                onChange={(e) => setSelectedItemName(e.target.value)}
              />
            </InputGroup>
          </div>

          <Table hover>
            <thead className="bg-dark text-white">
              <tr>
                {[
                  "Order-ID",
                  "Store Name",
                  "Date",
                  "Items",
                  "Without Tax",
                  "Total With Tax",
                  "Actions",
                ].map((head) => (
                  <th key={head}>{head}</th>
                ))}
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
                    <Button onClick={() => viewInvoice(invoice.id)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <Modal show={showInvoice} onHide={() => setShowInvoice(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Invoice Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InvoiceDetails invoice={activeInvoice} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default InvoiceList;
