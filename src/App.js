import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import axios from 'axios';
// import QRCode from 'qrcode-generator'
import QRCode from 'qrcode';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState('');
  async function generateQRCode(url) {
    // const qr = QRCode(0, 'H');
    // qr.addData(url);
    // qr.make();

    // const qrCodeImage = qr.createDataURL(10, 4);
    // const qrCodeImgElement = document.createElement('img');
    // const qrCodeImgRef = useRef(null);
    const qrCodeImage = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H' });
    const qrCodeImgElement = document.createElement('img');
    qrCodeImgElement.src = qrCodeImage;
    qrCodeImgElement.style.width = '300px';
    qrCodeImgElement.style.height = '300px';
    qrCodeImgElement.style.position = 'absolute';
    qrCodeImgElement.style.top = "63%";
    qrCodeImgElement.style.left = "42%"

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
      setResult(JSON.stringify(response.data.url));

      await generateQRCode(response.data.url);

    } catch (error) {
      // Handle error
      console.error('API Error:', error);
    }
  };

  return (
    <>
      <div class="login-box">
        <h2>Initiate Payment</h2>

        <form onSubmit={handleSubmit}>
          <div class="user-box">
            <input type="text" id="input1" placeholder='API Key' value={input1} onChange={(e) => setInput1(e.target.value)} required />
            <br />
          </div>
          <div class="user-box">
            <input type="text" id="input2" placeholder='Amount' value={input2} onChange={(e) => setInput2(e.target.value)} required />
            <br />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div class="login-box2" id="result"><h5>{result}</h5></div>
    </>
  );
}

export default App;
