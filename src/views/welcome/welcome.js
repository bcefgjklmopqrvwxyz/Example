import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import { CButton, CCardHeader, CCol, CRow, CCard, CCardBody } from "@coreui/react";
import Dropzone from "react-dropzone";
import Loading from "../common/Loading";

const Welcome = () => {
  let history = useHistory()
  const [appliedDateSelectedValue, setAppliedDateSelectedValue] = useState(""); // applied date select value
  const [files, setFiles] = useState([]);
  const [imageData, setImageData] = useState('');
  const [loading, setLoading] = useState(false); // For Loading

  useEffect(() => {
    let flag = localStorage.getItem(`LoginProcess`);

    if (flag == "true") {
      console.log("Login process success")
    } else {
      history.push(`/Login`);
    }

  })

  const selectAppliedDateHandleChange = (val) => {
    let date = "";
    if (val != null) {
      date = moment(val).format("YYYY-MM-DD");
    }
    setAppliedDateSelectedValue(date);
  };

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  }

  const removeFile = () => {
    setFiles([]);
  }

  const handleDropImage = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setImageData(dataUrl.split(',')[1]);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }
  console.log(imageData)

  console.log(loading)
  const loadingClick = () => {
    setLoading(true);
  }

  return (
    <>
      <h1>Welcome to Core Ui</h1>
      <CRow>
        <CCol lg="6">

          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            libInstance={moment}
          >
            <KeyboardDatePicker
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
              clearable
              format="yyyy/MM/dd"
              style={{
                borderRadius: "5px",
                overflow: "hidden",
                borderBottom: "1px solid #98847e",
                width: "100%",
              }}
              value={
                appliedDateSelectedValue == "" ||
                  appliedDateSelectedValue == null
                  ? null
                  : appliedDateSelectedValue
              }
              placeholder="Select Date"
              onChange={(val) => selectAppliedDateHandleChange(val)}

            />
          </MuiPickersUtilsProvider>
        </CCol>
        <CCol lg="6">
          <h3>Your selected date is {appliedDateSelectedValue}</h3>
        </CCol>
      </CRow>
      <br></br>

      <CCard>
        <CCardHeader>
          <h4>File Upload</h4>
        </CCardHeader>
        <CCardBody>
          <Dropzone onDrop={handleDrop}>{({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <CButton className="btn-behance">Select Files</CButton>
            </div>
          )}
          </Dropzone>
          <div style={{ display:"flex", marginTop:"20px" }}>
            {files.map((a) => (
              <>
                <li style={{ marginTop:"5px" }} key={a.name}> {a.name} </li>
                <CButton className="btn-danger" style={{ marginLeft:"20px" }} onClick={removeFile}>Delete File</CButton>
              </>
            ))}
          </div>
        </CCardBody>
      </CCard>

      <div>
        <Dropzone onDrop={handleDropImage}>{({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <CButton className="btn-behance">Select Photo</CButton>
          </div>
        )}
        </Dropzone>

        {imageData && (
          <img style={{ width: "100px", marginTop: "20px" }} src={`data:image/jpeg;base64,${imageData}`} alt="Upload image" />
        )}
      </div>
      <br></br>

      <Loading start={loading} />
      <CButton onClick={loadingClick} className="btn-dark">Loading</CButton>
    </>
  )
}

export default Welcome;