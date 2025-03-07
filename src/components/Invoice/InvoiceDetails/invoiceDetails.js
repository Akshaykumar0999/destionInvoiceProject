import "../index.css";
import InvoiceItem from "../InvoiceItem/invoiceItem";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const InvoiceDetails = ({ invoice }) => {
    const generatePDF = () => {
      const input = document.getElementById("invoice-content");

      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL(
          "https://dummyimage.com/300.png/09f/fff"
        );
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190; // A4 width
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save(`invoice-${invoice.orderId}.pdf`);
      });
    };
  return (
    <div className="container-fluid" id="invoice-content">
      <header
        style={{
          borderBottom: "1px dashed black",
          marginBottom: "10px",
          paddingBottom: "10px",
          fontWeight: "500",
        }}
      >
        Invoice Details ({invoice.orderId})
      </header>
      <p style={{ margin: "0px" }}>
        Store:{" "}
        <span
          style={{ marginLeft: "10px", fontWeight: "400", color: "#375158" }}
        >
          {invoice.storeName}
        </span>
      </p>
      <p style={{ margin: "0px" }}>
        Date:{" "}
        <span
          style={{ fontWeight: "400", marginLeft: "10px", color: "#375158" }}
        >
          {invoice.date}
        </span>
      </p>
      <p style={{ margin: "0px" }}>
        Total (Before Tax):{" "}
        <span
          style={{ fontWeight: "400", marginLeft: "10px", color: "#375158" }}
        >
          {invoice.grandTotalWithoutTax} ₨
        </span>
      </p>
      <p style={{ margin: "0px" }}>
        Total (After Tax):{" "}
        <span
          style={{ fontWeight: "400", marginLeft: "10px", color: "#375158" }}
        >
          {invoice.grandTotalWithTax} ₨
        </span>
      </p>
      <p style={{ margin: "10px 0px 10px 0px", fontWeight: "500" }}>
        Items List :-
      </p>
      <div className="table-container">
        <InvoiceItem items={invoice.items} />
      </div>
      <button className="btn btn-secondary" style={{ marginRight: "10px" }}>
        Close
      </button>
      <button className="btn btn-primary" onClick={() => generatePDF()}>
        Print
      </button>
    </div>
  );
};
export default InvoiceDetails;
