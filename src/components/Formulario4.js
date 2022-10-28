import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/form4.css";
const gender = [
  {
    key: "M",
    value: "male",
  },
  {
    key: "F",
    value: "female",
  },
];
const Formulario4 = () => {
  const { t } = useTranslation();
  const initialState = {
    data: [],
    gender: gender,
    form: {
      identification: "",
      firstName: "",
      secondName: "",
      lastName: "",
      secondLastName: "",

      relationShip: "",
      phoneNumber: "",
      passportNumber: "",
      gender: "",
    },
    modalInsertar: false,
    modalEditar: false,
    havePassport: false,
    date: "",
  };
  const [state, dispatch] = useState(initialState);
  const relationShipData = [
    {
      key: "Father_Mother",
      value: "Padre / Madre",
    },
    {
      key: "Husband_Wife",
      value: "Esposo / Esposa",
    },
    {
      key: "Daughter_Son",
      value: "Hijo / Hija",
    },
    {
      key: "Relative",
      value: "Familiar",
    },
  ];

  const onSubmit = () => {
    const isValid = validateValues(state.form, state.havePassport);
    if (isValid) {
      console.log("todo bien", isValid);
    } else {
      console.log("campos requeridos");
      window.confirm(t("requiredFlieds"));
    }
    console.log("values to submit", state);
  };
  const validateValues = (values, havePassport) => {
    /* if(!havePassport){
      values["passportNumber"]="null"
    }else{
      if(values["passportNumber"]=="null"){
        values["passportNumber"]="";
      }
    }*/

    const keys = Object.keys(values);
    for (let i = 0; i < keys.length; i++) {
      if (havePassport) {
        if (values[keys[i]].length <= 0) {
          return false;
        }
      } else {
        if (keys[i] != "passportNumber" && values[keys[i]].length <= 0) {
          return false;
        }
      }
    }

    return true;
  };
  return (
    <div className="page-wrapper bg-gra-01 p-t-130 p-b-100 font-poppins">
      <div className="wrapper wrapper--w680">
        <div className="card card-4">
          <div className="card-heading"></div>

          <div className="card-body">
            <h2 className="title">{t("healthInsurance")}</h2>
            <div className="row row-space">
              <div className="col-2">
                <div className="input-group">
                  <label className="label">{t("identification")}</label>
                  <input
                    className="input--style-4"
                    type="text"
                    name="identification"
                    onChange={(e) => {
                      const init = {
                        ...state,
                        form: {
                          ...state.form,
                          identification: e.target.value,
                        },
                      };
                      dispatch(init);
                    }}
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
                    onChange={(e) => {
                      const init = {
                        ...state,
                        form: {
                          ...state.form,
                          firstName: e.target.value,
                        },
                      };
                      dispatch(init);
                    }}
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
                    onChange={(e) => {
                      const init = {
                        ...state,
                        form: {
                          ...state.form,
                          secondName: e.target.value,
                        },
                      };
                      dispatch(init);
                    }}
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
                    onChange={(e) => {
                      const init = {
                        ...state,
                        form: {
                          ...state.form,
                          lastName: e.target.value,
                        },
                      };
                      dispatch(init);
                    }}
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
                    onChange={(e) => {
                      const init = {
                        ...state,
                        form: {
                          ...state.form,
                          secondLastName: e.target.value,
                        },
                      };
                      dispatch(init);
                    }}
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
                      onChange={(e) => {
                        const init = {
                          ...state,
                          form: {
                            ...state.form,
                            birthdate: e.target.value,
                          },
                        };
                        dispatch(init);
                      }}
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
                      {t(state.gender[0].value)}
                      <input
                        type="radio"
                        name="gender"
                        value={state.gender[0].value}
                        id={state.gender[1].value}
                        onChange={() => {
                          const init = {
                            ...state,
                            form: {
                              ...state.form,
                              gender: t(state.gender[0].value),
                            },
                          };
                          dispatch(init);
                          // setState(data);
                        }}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="radio-container m-r-45">
                      {t(state.gender[1].value)}
                      <input
                        type="radio"
                        name="gender"
                        value={state.gender[1].value}
                        id={state.gender[1].value}
                        onChange={() => {
                          const init = {
                            ...state,
                            form: {
                              ...state.form,
                              gender: t(state.gender[1].value),
                            },
                          };
                          dispatch(init);
                        }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-space">
              <div className="col-2">
                <div className="input-group">
                  <label className="label">{t("phoneNumber")}</label>
                  <input
                    className="input--style-4"
                    type="text"
                    name="phone"
                    onChange={(e) => {
                      const init = {
                        ...state,
                        form: {
                          ...state.form,
                          phoneNumber: e.target.value,
                        },
                      };
                      dispatch(init);
                    }}
                  />
                </div>
              </div>
              <div className="col-2">
                <label className="label">{t("relationShip")}</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    const item = relationShipData.filter(
                      (item) => item.key == e.target.value
                    );
                    if (item.length > 0) {
                      const init = {
                        ...state,
                        form: {
                          ...state.form,
                          relationShip: item[0].value,
                        },
                      };
                      dispatch(init);
                    }
                    //this.handleChange(e);
                  }}
                >
                  <option defaultValue>{t("selectRelationShip")}</option>
                  {relationShipData &&
                    relationShipData.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="row row-space">
              <div className="col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    checked={state.havePassport}
                    id="flexCheckDefault"
                    onClick={() => {
                      const init = {
                        ...state,
                        form: {
                          ...state.form,
                          passportNumber: "",
                        },
                        havePassport: !state.havePassport,
                      };

                      dispatch(init);
                    }}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    {t("have_passport")}
                  </label>
                </div>
                {state && state.havePassport && (
                  <div className="input-group" style={{ marginTop: "20px" }}>
                    <label className="label">{t("passport_number")}</label>
                    <input
                      className="input--style-4"
                      type="passport_number"
                      name="passport_number"
                      onChange={(e) => {
                        const init = {
                          ...state,
                          form: {
                            ...state.form,
                            passportNumber: e.target.value,
                          },
                        };
                        dispatch(init);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-t-15">
              <button
                className="btn btn--radius-2 btn--blue"
                onClick={() => {
                  onSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulario4;
