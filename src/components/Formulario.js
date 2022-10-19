import React from "react";
import "../styles/main.css";
const Formulario = () => {
  return (
    <div>
        <div className="page-wrapper bg-blue p-t-100 p-b-100 font-robo">
          <div className="wrapper wrapper--w680">
            <div className="card card-1">
              <div className="card-heading"></div>
              <div className="card-body">
                <h2 className="title">Registration Info</h2>
                <form method="POST">
                  <div className="input-group">
                    <input
                      className="input--style-1"
                      type="text"
                      placeholder="NAME"
                      name="name"
                    />
                  </div>
                  <div className="row row-space">
                    <div className="col-2">
                      <div className="input-group">
                        <input
                          className="input--style-1 js-datepicker"
                          type="text"
                          placeholder="BIRTHDATE"
                          name="birthday"
                        />
                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <div className="rs-select2 js-select-simple select--no-search">
                          <select name="gender" defaultValue="default">
                            <option disabled="disabled" value="default">
                              GENDER
                            </option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                          </select>
                          <div className="select-dropdown"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="input-group">
                    <div className="rs-select2 js-select-simple select--no-search">
                      <select name="className" defaultValue="default">
                        <option disabled="disabled" value="default">
                          className
                        </option>
                        <option value="1">className 1</option>
                        <option value="2">className 2</option>
                        <option value="3">className 3</option>
                      </select>
                      <div className="select-dropdown"></div>
                    </div>
                  </div>
                  <div className="row row-space">
                    <div className="col-2">
                      <div className="input-group">
                        <input
                          className="input--style-1"
                          type="text"
                          placeholder="REGISTRATION CODE"
                          name="res_code"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-t-20">
                    <button className="btn btn--radius btn--green" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Formulario;
