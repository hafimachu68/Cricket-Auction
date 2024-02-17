import React, { useState } from 'react';
import './addplayerform.css'; // Import your custom CSS file
import Axiosinstance from '../../config/Axiosinstances';
import { toastError, toastSucess } from '../../constants/Plugin';
import { useNavigate } from 'react-router-dom';

export default function Addteamform() {
  const [formValue, setFormValue] = useState({
    teamName: '',
    basepoint: '',
    budget:''
  });

  const navigate = useNavigate();
  const [teamimage, setteamimage] = useState(null);
  const [selectedimage, setSelectedimage] = useState('');

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const addfileData = (e) => {
    setteamimage(e.target.files[0]);
    e.target.files[0]
      ? setSelectedimage(URL?.createObjectURL(e.target.files[0]) ?? null)
      : setSelectedimage(null);
  };

  const addteamdata = () => {
    let fileData = new FormData();
    fileData.append('image', teamimage);

    Axiosinstance.post('/admin/addteam', fileData, {
      params: formValue,
      Headers: { 'content-Type': 'multipart/form-data' }
    })
      .then((response) => {
        toastSucess('team Data added successfully');
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
                  <label htmlFor="teamName" className="form-label">TEAM NAME</label>
                  <input
                    type="text"
                    className="form-control"
                    id="teamName"
                    name="teamName"
                    value={formValue.teamName}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="basepoint" className="form-label">BASE POINT</label>
                  <input
                    type="text"
                    className="form-control"
                    id="basepoint"
                    name="basepoint"
                    value={formValue.basepoint}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="budget" className="form-label">BUDGET</label>
                  <input
                    type="text"
                    className="form-control"
                    id="budget"
                    name="budget"
                    value={formValue.budget}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="teamimage" className="form-label">TEAME IMAGE</label>
                  <input
                    type="file"
                    className="form-control"
                    id="teamimage"
                    name="teamimage"
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
                <button type="submit" className="btn text-light" style={{background: '  #010203'}} onClick={addteamdata}>Submit form</button>
                <button type="reset" className="btn  text-light ms-2" style={{background: '  #010203'}}>Reset form</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
