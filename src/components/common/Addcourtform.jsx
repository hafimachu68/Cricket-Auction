import React, { useState } from 'react';
// import {
//   MDBValidation,
//   MDBValidationItem,
//   MDBInput,
//   MDBBtn,
//   MDBFile,
//   MDBCheckbox
// } from 'mdb-react-ui-kit';
import './addcourtform.css'; // Import your custom CSS file
import Axiosinstance from '../../config/Axiosinstances';
import { toastError, toastSucess } from '../../constants/Plugin';
import { useNavigate } from 'react-router-dom';

export default function Addcourtform() {
  const [formValue, setFormValue] = useState({
    courtName: '',
    location: '',
    type: '',
    about: '',
    team:''
  });

  const navigate = useNavigate();
  const [courtimage, setCourtimage] = useState(null);
  const [selectedimage, setSelectedimage] = useState('');

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const addfileData = (e) => {
    setCourtimage(e.target.files[0]);
    e.target.files[0]
      ? setSelectedimage(URL?.createObjectURL(e.target.files[0]) ?? null)
      : setSelectedimage(null);
  };

  const addCourtdata = () => {
    let fileData = new FormData();
    fileData.append('image', courtimage);

    Axiosinstance.post('/admin/addCourtData', fileData, {
      params: formValue,
      Headers: { 'content-Type': 'multipart/form-data' }
    })
      .then((response) => {
        toastSucess('Court Data added successfully');
        navigate('/home');
      })
      .catch((err) => {
        toastError('Invalid entry');
        if (err.response.data.message === 'unauthorized user') {
          localStorage.clear();
          navigate('/');
        }
      });
  };

  return (
    <div className="container-fluid s">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mg">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="courtName" className="form-label">Player Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="courtName"
                    name="courtName"
                    value={formValue.courtName}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">CODE</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={formValue.location}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">ROLE</label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    name="type"
                    value={formValue.type}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="team" className="form-label">TEAM</label>
                  <input
                    type="text"
                    className="form-control"
                    id="team"
                    name="team"
                    value={formValue.team}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="about" className="form-label">PRICE</label>
                  <input
                    type="text"
                    className="form-control"
                    id="about"
                    name="about"
                    value={formValue.about}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="courtimage" className="form-label">Player Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="courtimage"
                    name="courtimage"
                    onChange={addfileData}
                    required
                  />
                </div>
                {selectedimage && (
                  <img
                    src={selectedimage}
                    alt="Selected Image"
                    className="img-fluid"
                  />
                )}
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="agreeTerms" required />
                  <label className="form-check-label" htmlFor="agreeTerms">Agree to terms and conditions</label>
                </div>
                <button type="submit" className="btn text-light" style={{background: '  #010203'}} onClick={addCourtdata}>Submit form</button>
                <button type="reset" className="btn  text-light ms-2" style={{background: '  #010203'}}>Reset form</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
