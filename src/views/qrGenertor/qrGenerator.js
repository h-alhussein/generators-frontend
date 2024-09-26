import { CButton, CCol, CForm, CFormInput, CImage } from '@coreui/react';
import React, { useState } from 'react';
import axios from 'src/axios';
import img from '../../assets/img/qr.png'
import './qrGenerator.css';


const QrGenerator = () => {
  
  const [qr, setQr] = useState();
  const [website,setwebsite] = useState();
  const [validated,setValidated]= useState(false);
const getQr = async (params) => {

  
  
  try {
    const response = await axios.post('/api/v1/generate-code', {website:website},{
      headers: {
        'Content-Type': 'application/json',
      },
    }
    
    )
    setQr(response?.data)
  } catch (err) {
    alert(err.response.data)
    console.log(axios.baseURL)
  }

}

const downloadQRCode = () => {
  const link = document.createElement("a");
  link.href = `data:image/png;base64,${qr}`;
  link.download = "qrcode.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Clean up
};
const handleSubmit = (event) => {
  const form = event.currentTarget
  event.preventDefault()
  console.log(form.checkValidity())
  if (form.checkValidity() === false) {
    
    event.stopPropagation()
  }
  if (form.checkValidity() === true){
  
  setValidated(true)
  getQr()
  }
  
}

  return (
    <div className="justify-content-center">
      <span className="clearfix flex">
              <h1 className="display-3 qr-h1">QR-Generator</h1>
              <h4 className="pt-3 qr-h1">Generate your own QR-Code</h4>
              <p className="qr-h1">
                Please, Write the Text in the Below Feld. to Generate a QR.Code for it
              </p>
              
            </span>


<CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onClick={handleSubmit}
  
  >
    <CCol md={0}>
      <CFormInput
        type="text"
        id="validationCustom01"
        feedbackInvalid="Dieses Feld darf nicht leer sein."
        autoComplete="off"
        required
        onChange={(param) => { 
          setwebsite(param.target.value)
        }}
      />
    </CCol>

    
    <CCol xs={12}>
      <CButton className='d-grid gap-2 col-3 mx-auto' onClick= {() => {    
      }} color="primary" type="submit" >
        Generate
      </CButton>
    </CCol>
  </CForm>

<br />

 <div>
      {qr ? (
      <div className="clearfix">
      <CImage align="center" rounded src={`data:image/png;base64,${qr}`} alt="QR Code" width={255} height={255} />
      <br />
      <CButton color='primary' className='d-grid gap-2 col-3 mx-auto' onClick={downloadQRCode}>Download QR Code</CButton>
      <br />
      <br />
    </div>
      ) : (
        
          <div>
            <CImage align="center" className='defaultImage' rounded src={img} alt="QR Code" width={255} height={255} /> 
            <br />
            <br />
            </div> 
      )}
      
      </div>
    
    </div>
    
  );
}


export default QrGenerator;
