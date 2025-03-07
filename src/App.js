import './App.css';
import Header from './components/Header/header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceList from './components/Invoice/InvoiceList/invoiceList';
import ProductList from './components/Products/ProductList/productList';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
