import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/form4.css";
const Formulario4 = () => {
  const { t } = useTranslation();
  return (
    <div className="page-wrapper bg-gra-01 p-t-130 p-b-100 font-poppins">
      <div className="wrapper wrapper--w680">
        <div className="card card-4">
          <div className="card-heading"></div>

          <div className="card-body">
            <h2 className="title">{t("healthInsurance")}</h2>
            <form>
              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">{t("identification")}</label>
                    <input
                      className="input--style-4"
                      type="text"
                      name="identification"
                    />
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">{t("firstName")}</label>
                    <input
                      className="input--style-4"
                      type="text"
                      name="first_name"
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">{t("secondName")}</label>
                    <input
                      className="input--style-4"
                      type="text"
                      name="second_name"
                    />
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">{t("lastName")}</label>
                    <input
                      className="input--style-4"
                      type="text"
                      name="lastname"
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">{t("secondLastName")}</label>
                    <input
                      className="input--style-4"
                      type="text"
                      name="second_lastname"
                    />
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">{t("birthdate")}</label>
                    <div className="input-group-icon">
                      <input
                        className="input--style-4 js-datepicker"
                        type="text"
                        name="birthday"
                      />
                      <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">{t("gender")}</label>
                    <div className="p-t-10">
                      <label className="radio-container m-r-45">
                        {t("male")}
                        <input type="radio" checked="checked" name="gender" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="radio-container">
                        {t("female")}
                        <input type="radio" name="gender" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">{t("email")}</label>
                    <input
                      className="input--style-4"
                      type="email"
                      name="email"
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">{t("phoneNumber")}</label>
                    <input
                      className="input--style-4"
                      type="text"
                      name="phone"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="input-group">
                            <label className="label">Subject</label>
                            <div className="rs-select2 js-select-simple select--no-search">
                                <select name="subject" defaultChecked="default">
                                    <option disabled="disabled" value="default">Choose option</option>
                                    <option value="1">Subject 1</option>
                                    <option value="2">Subject 2</option>
                                    <option value="3">Subject 3</option>
                                </select>
                                <div className="select-dropdown"></div>
                            </div>
                        </div> */}
              {/* <div class="sel sel--black-panther">
                <select name="select-profession" id="select-profession">
                  <option value="" disabled>
                    Profession
                  </option>
                  <option value="hacker">Hacker</option>
                  <option value="gamer">Gamer</option>
                  <option value="developer">Developer</option>
                  <option value="programmer">Programmer</option>
                  <option value="designer">Designer</option>
                </select>
              </div> */}

              <div className="p-t-15">
                <button className="btn btn--radius-2 btn--blue" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulario4;
