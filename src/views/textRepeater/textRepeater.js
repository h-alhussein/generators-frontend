import React, { useEffect, useState } from 'react';
import { CButton, CContainer, CForm, CFormInput,CInputGroup,  CRow } from '@coreui/react';
import axios from 'src/axios';
import "./textRepeater.css"

const TextRepeater = () => {
  const [repeated, setrepeated] = useState();
  const [validated,setValidated]= useState(false);
  const [text, setText]= useState("");
  const [count,setCount]=useState(4);

const getRepeated = async () => {
  try {
    const response = await axios.post('/api/v1/txt',JSON.stringify({ text: text, repeater:count }),{
      headers: {
        'Content-Type': 'application/json',
      },
    }
    
    )
    setrepeated(response?.data)
    console.log(repeated)
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
    getRepeated()
    handleCatboot()
    handleCattext()
  setValidated(true)
  }
  
}

const handleCatboot = () => {
  
  const newElement = document.createElement("P"); // Korrigiert: "newElement"
  newElement.append(text); // Fügt den Text als Inhalt hinzu
  document.getElementById("inputField").append(newElement); // Fügt das neue Element zu "textPlace" hinzu
  document.getElementById("validationCustom01").value=""
}
const handleCattext = () => {
  
  const newElement = document.createElement("P"); // Korrigiert: "newElement"
  newElement.append(repeated); // Fügt den Text als Inhalt hinzu
  document.getElementById("inputField").append(newElement); // Fügt das neue Element zu "textPlace" hinzu
  
}
useEffect(() => {
  if(text){
    getRepeated()
  }
  
}, [text,count]);
  return (
    <div>
      <h1>Text Duplikater</h1>
      <h3>Hier kann man einfache Texte duplizieren</h3>
      <CContainer fluid className='repeatedboot'>
<section className='catinput'  style={{ backgroundcolor:"black"}}>
<CRow >
  <div id='inputField'></div>
  
</CRow>

  
    
  </section>
  
  
</CContainer>
<br />
<CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={ handleSubmit}
  
  >
    <CInputGroup className="mb-2">
      <CFormInput
        type="text"
        id="validationCustom01"
        
        autoComplete="off"
        required
        onChange={(param) => { 
          setText(param.target.value)
        }}
        aria-describedby="button-addon2"
      /> 
      <CFormInput id="basic-url" aria-describedby="basic-addon3"
      type='number' value={count} min={2}
      name='length'
      onChange={(e) => setCount(e.target.value)}

    />
        <CButton className='btn-repeater'  onClick= {() => {   
      }} color="primary" type="submit"  >
        SEND
      </CButton>
    </CInputGroup>
  </CForm>


    </div> 
  );
}

export default TextRepeater;
