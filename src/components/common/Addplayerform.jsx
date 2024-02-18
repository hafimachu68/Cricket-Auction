import React, { useState } from 'react';
import './addplayerform.css'; // Import your custom CSS file
import Axiosinstance from '../../config/Axiosinstances';
import { toastError, toastSucess } from '../../constants/Plugin';
import { useNavigate } from 'react-router-dom';

export default function Addcourtform() {
  const [formValue, setFormValue] = useState({
    PlayerName: '',
    code: '',
    role: '',
    basepoint: '',
    team:''
  });

  const navigate = useNavigate();
  const [playerimage, setPlayerimage] = useState(null);
  const [selectedimage, setSelectedimage] = useState('');

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const addfileData = (e) => {
    setPlayerimage(e.target.files[0]);
    e.target.files[0]
      ? setSelectedimage(URL?.createObjectURL(e.target.files[0]) ?? null)
      : setSelectedimage(null);
  };

  const addCourtdata = () => {
    let fileData = new FormData();
    fileData.append('image', playerimage);

    Axiosinstance.post('/admin/addPlayerData', fileData, {
      params: formValue,
    })
      .then((response) => {
        toastSucess('Player Data added successfully');
        navigate('/home');
      })
      .catch((err) => {
        toastError('Invalid entry');
        if (err.response.data.message === 'unauthorized user') {
          localStorage.clear();
          console.log(err);
          // navigate('/');
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
                  <label htmlFor="PlayerName" className="form-label">Player Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="PlayerName"
                    name="PlayerName"
                    value={formValue.PlayerName}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="code" className="form-label">CODE</label>
                  <input
                    type="text"
                    className="form-control"
                    id="code"
                    name="code"
                    value={formValue.code}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">ROLE</label>
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    name="role"
                    value={formValue.role}
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
                  <label htmlFor="playerimage" className="form-label">Player Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="playerimage"
                    name="playerimage"
                    onChange={addfileData}
                    required
                  />
                </div>
                {selectedimage && (
                  <img
                    src={selectedimage}
                    alt="Selected-pic"
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
