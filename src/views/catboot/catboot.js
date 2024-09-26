import { CButton, CContainer, CForm, CFormInput,CInputGroup,  CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import axios from 'src/axios';
import "./catboot.css"

const Catboot = () => {
  const [chat, setChat] = useState();
  const [inPutText,setinputText] = useState();
  const [validated,setValidated]= useState(false);
const getcat = async () => {
  try {
    const response = await axios.post('/api/v1/cat',{
      headers: {
        'Content-Type': 'application/json',
      },
    }
    
    )
    setChat(response?.data)
    console.log(chat)
  } catch (err) {
    alert(err.response.data)
    console.log(err)
  }
}

const handleSubmit = (event) => {
  
  const form = event.currentTarget
  event.preventDefault()
  console.log(form.checkValidity())
  if (form.checkValidity() === false) {
    
    event.stopPropagation()
  }
  if (form.checkValidity() === true){
    getcat()
    handleCatboot()
    handleCattext()
  setValidated(true)
  }
  
}

const handleCatboot = () => {
  
  const newElement = document.createElement("P"); // Korrigiert: "newElement"
  newElement.append(inPutText); // Fügt den Text als Inhalt hinzu
  document.getElementById("inputField").append(newElement); // Fügt das neue Element zu "textPlace" hinzu
  document.getElementById("validationCustom01").value=""
}
const handleCattext = () => {
  
  const newElement = document.createElement("P"); // Korrigiert: "newElement"
  newElement.append(chat); // Fügt den Text als Inhalt hinzu
  document.getElementById("inputField").append(newElement); // Fügt das neue Element zu "textPlace" hinzu
  
}
useEffect(() => {
  getcat()
}, []);
  return (
    <div>
      <h1>catboot</h1>
      <h3>Purrfect Conversations!</h3>
      <CContainer fluid className='chatboot'>
<section className='catinput'  style={{ backgroundcolor:"black"}}>
<CRow >
  <div id='inputField'></div>
  
</CRow>

  
    
  </section>
  
  
</CContainer>
<CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={ handleSubmit}
  
  >
    <CInputGroup className="mb-2 flex">
      <CFormInput
        type="text"
        id="validationCustom01"
        
        autoComplete="off"
        required
        onChange={(param) => { 
          setinputText(param.target.value)
        }}
        aria-describedby="button-addon"
      />
        <CButton  onClick= {() => {   
      }} color="primary" type="submit">
        send
      </CButton>
    </CInputGroup>
  </CForm>


    </div> 
  );
}

export default Catboot;
