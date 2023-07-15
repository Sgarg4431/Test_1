import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import axios from 'axios';
import QRCode from 'qrcode-generator'

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState('');
  function generateQRCode(url) {
    const qr = QRCode(0, 'H');
    qr.addData(url);
    qr.make();
  
    const qrCodeImage = qr.createDataURL(10, 4);
    const qrCodeImgElement = document.createElement('img');
    qrCodeImgElement.src = qrCodeImage;
  
    // Append the QR code image to the document body
    document.body.appendChild(qrCodeImgElement);
  }
  
  const handleSubmit = async (event) => {
  
    event.preventDefault();
  
    try {
      // Prepare API request
      const apiUrl = 'https://api.blockpay.co.za/merchant/initiatePaymentRequest'; // Replace with your API endpoint
      const requestData = {
        k: input1,
        a: input2
      };
  
      // Make API call using Axios
      const response = await axios.post(apiUrl, requestData);
  
      // Process API response
      setResult(JSON.stringify(response.data));
      console.log(response.data);
      generateQRCode(response.data.url);
    } catch (error) {
      // Handle error
      console.error('API Error:', error);
    }
  };
 
  return (
    <div>
      <h1>Example</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="input1">API key</label>
        <input type="text" id="input1" value={input1} onChange={(e) => setInput1(e.target.value)} required />
        <br />
        <label htmlFor="input2">Amount</label>
        <input type="text" id="input2" value={input2} onChange={(e) => setInput2(e.target.value)} required />
        <br />
        <button type="submit">Submit</button>
      </form>

      <div id="result">{result}</div>
    </div>
  );
}

export default App;
