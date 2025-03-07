import '../index.css'
import Table from 'react-bootstrap/Table';

function InvoiceItem({items}) {
  return (
    <div className="table-container-model">
      <Table>
        <thead>
          <tr>
            <th style={{ background: "#375158", color: "#ffffff" }}>
              Item Name
            </th>
            <th style={{ background: "#375158", color: "#ffffff" }}>
              Quantity
            </th>
            <th style={{ background: "#375158", color: "#ffffff" }}>
              Regular Price
            </th>
            <th style={{ background: "#375158", color: "#ffffff" }}>
              Deal Price
            </th>
            <th style={{ background: "#375158", color: "#ffffff" }}>
              Item Tax
            </th>
            <th style={{ background: "#375158", color: "#ffffff" }}>
              Item Total
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>{item.regularPrice}</td>
              <td>{item.dealPrice}</td>
              <td>{item.itemTax}</td>
              <td>{item.itemTotal}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default InvoiceItem;