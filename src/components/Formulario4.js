import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/form4.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PageNotFound from "./PageNotFound";

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
      birthDate: "",
      kinship: "",
      nationality:"",
      phoneNumber: "",
      passport: "",
      gender: "",
    },
    formInsured: {
      nationality: "",
    },
    modalInsertar: false,
    modalEditar: false,
    havePassport: false,
    date: "",
  };
  const [state, dispatch] = useState(initialState);
  const [mbt, setMbt] = useState(null);
  const [isAviable, setIsAviable] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [errorMessageCode, setErrorMessage] = useState("");
  const [userInsuredData, setuserInsuredData] = useState(null);
  const [succesfulModal, setSuccesfulModal] = useState(false);

  const [isAnError, setIsAnError] = useState(false);
  const [todaysDate,setTodaysDate]= useState();
  const useQuery = () => new URLSearchParams(window.location.search);

  let query = useQuery();
  useEffect(() => {
    //  let mbt = query.get("mbt");
    var date = new Date();
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();
    var todaysDate = day + "/" + month + "/" + year;
    var hoy = year + "-" + month + "-" + day;

    setTodaysDate(hoy);

    setMbt(query.get("mbt"));
    initChckerPolize(query.get("mbt"));
  }, []);


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
  const initChckerPolize = async (mbt) => {
    try {
      const response = await fetch(
        "https://rjhi2d01ca.execute-api.us-east-1.amazonaws.com/production",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            mbt: mbt,
            type: "life",
          },
        }
      );
      const responseJson = await response.json();
      //console.log("response", responseJson);
      //console.log("status", response.status);

      if (response.status == 200) {
        setIsAviable(true);
        setuserInsuredData(responseJson.data);
      } else {
        setIsAnError(true);

        setIsAviable(false);
        setErrorMessage(responseJson.messages[0].message);
      }
    } catch (e) {
      console.error("error al realizar request", e);
    }
  };
  const onSubmit = async () => {
    try {
      const isValid = validateValues(state.form, state.havePassport);
      if (isValid) {
        //console.log("todo bien", isValid);

        const txData = fillDataJsonApi();
        if (txData.result) {
          const response = await fetch(
            "https://rjhi2d01ca.execute-api.us-east-1.amazonaws.com/production",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                mbt: mbt,
                type: "life",
              },
              body: JSON.stringify(txData.dataSend),
            }
          );
          const responseJson = await response.json();
          //console.log("responseJson send", responseJson);
          if (response.status == 200) {
            setSuccesfulModal(true);
            setIsAviable(false);
            //console.log("response 200", responseJson);
          } else {
            setIsAnError(true);
            setErrorMessage(responseJson.messages[0].message);
            setIsAviable(false);
          }
        }
      } else {
        //console.log("campos requeridos");
        window.confirm(t("requiredFlieds"));
      }
      //console.log("values to submit", state);
    } catch (e) {
      setErrorMessage("unexpected_Error");
      setIsAnError(true);
      setIsAviable(false);
      //console.log("error al enviar data ", e);
    }
  };
  const validateValues = (values, havePassport) => {
    //console.log(state);
    const keys = Object.keys(values);
    for (let i = 0; i < keys.length; i++) {
      if (havePassport) {
        if (values[keys[i]].length <= 0) {
          return false;
        }
      } else {
        if (keys[i] != "passport" && values[keys[i]].length <= 0) {
          return false;
        }
      }
    }

    return true;
  };

  const fillDataJsonApi = () => {
    const transaction = {
      result: false,
      dataSend: {
        data: {
          insuredID: "2c9778bd-4e13-4a66-baec-434e14fa1df6",
          code: "ABCDEF",
          insured: {
            passport: "null",
            nationality: "ecuatoriano",
          },
          beneficiary: {
            firstName: "", //
            secondName: "", //
            lastName: "", //
            secondLastName: "", //
            identification: "", //
            passport: "null", //
            nationality: "",
            kinship: "", //
            birthDate: "", //
            code: "",
            codeDate: "",
          },
        },
      },
    };
    if (userInsuredData) {
      transaction.dataSend.data.beneficiary = {
        ...transaction.dataSend.data.beneficiary,
        ...state.form,
      };
      
      transaction.dataSend.data.beneficiary.code=userInsuredData.code.id.S;

      /*transaction.dataSend.data.beneficiary.codeDate= ;*/
      transaction.dataSend.data = {
        ...transaction.dataSend.data,
        ...{
          insuredID: userInsuredData.mbUser.id.S,
          code: userInsuredData.code.id.S,
          
        },
      };
      transaction.dataSend.data.insured = {
        ...transaction.dataSend.data.insured,
        ...{
          passport:
            userInsuredData.mbUser.identificationType.S == "P"
              ? userInsuredData.mbUser.identificationNumber.S
              : "",
          nationality: state.formInsured.nationality,
        },
      };



      transaction.result = true;
    } else {
      transaction.result = false;
    }
    //console.log("datoa send filled", transaction);
    //console.log("userInsuredData ", userInsuredData);
    return transaction;
  };
  const handleCloseSuccess = () => {
    setSuccesfulModal(false);
    window.location.assign("https://www.moneyblinks.com/");
  };

  return (
    <>
      {isAnError ? (
        <PageNotFound
          message={t(errorMessageCode)}
          messageTitle={t("something_wrong")}
        ></PageNotFound>
      ) : (
        <div className="page-wrapper bg-gra-01 p-t-130 p-b-100 font-poppins">
          <div className="wrapper wrapper--w680">
            <div className="card card-4">
              <div className="card-heading"></div>

              <div className="card-body">
                <h2 className="title">{t("healthInsurance")}</h2>
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">{t("nacionalityInsured")}</label>
                      <input
                        required
                        className="input--style-4"
                        type="text"
                        readOnly={!isAviable}
                        name="nacionalityInsured"
                        onChange={(e) => {
                          const init = {
                            ...state,
                            formInsured: {
                              ...state.formInsured,
                              nationality: e.target.value,
                            },
                          };
                          dispatch(init);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <h2 style={{ fontSize: "18px" }} className="title">
                  {t("beneficiary")}
                </h2>
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">{t("identification")}</label>
                      <input
                        required
                        maxLength={10}
                        className="input--style-4"
                        type="text"
                        pattern="[0-9]{10}"
                        name="identification"
                        value={state.form.identification}
                        readOnly={!isAviable}
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
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">{t("nationality")}</label>
                      <input
                        required
                      
                        className="input--style-4"
                        type="text"
                   
                        name="nationality"
                        value={state.form.nationality}
                        readOnly={!isAviable}
                        onChange={(e) => {
                          const init = {
                            
                            ...state,
                            form: {
                              ...state.form,
                              nationality: e.target.value,
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
                        required
                        className="input--style-4"
                        type="text"
                        name="first_name"
                        readOnly={!isAviable}
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
                        required
                        className="input--style-4"
                        type="text"
                        name="second_name"
                        readOnly={!isAviable}
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
                        required
                        className="input--style-4"
                        type="text"
                        name="lastname"
                        readOnly={!isAviable}
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
                        required
                        className="input--style-4"
                        type="text"
                        name="second_lastname"
                        readOnly={!isAviable}
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
                          required
                          className="input--style-4 js-datepicker"
                          type="date"
                          min="1920-01-01"
                          max={todaysDate}
                          name="birthday"
                          readOnly={!isAviable}
                          onChange={(e) => {
                            const init = {
                              ...state,
                              form: {
                                ...state.form,
                                birthDate: e.target.value,
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
                            required
                            type="radio"
                            name="gender"
                            value={state.gender[0].value}
                            id={state.gender[1].value}
                            readOnly={!isAviable}
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
                            required
                            type="radio"
                            readOnly={!isAviable}
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
                        pattern="[0-9]{10}"
                        name="phone"
                        maxLength={10}
                        required
                        value={state.form.phoneNumber}
                        readOnly={!isAviable}
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
                      required
                      readOnly={!isAviable}
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
                              kinship: item[0].value,
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
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        required
                        checked={state.havePassport}
                        readOnly={!isAviable}
                        id="flexCheckDefault"
                        onClick={() => {
                          const init = {
                            ...state,
                            form: {
                              ...state.form,
                              passport: "",
                            },
                            havePassport: !state.havePassport,
                          };

                          dispatch(init);
                        }}
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckDefault"
                      >
                        {t("have_passport")}
                      </label>
                    </div>
                    {state && state.havePassport && (
                      <div
                        className="input-group"
                        style={{ marginTop: "20px" }}
                      >
                        <label className="label">{t("passport_number")}</label>
                        <input
                          required
                          className="input--style-4"
                          type="passport_number"
                          name="passport_number"
                          readOnly={!isAviable}
                          onChange={(e) => {
                            const init = {
                              ...state,
                              form: {
                                ...state.form,
                                passport: e.target.value,
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
                    className="boton button2"
                    disabled={!isAviable}
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
          <Modal
            show={showModal}
            onHide={() => {
              setShowModal(false);
              //window.location.assign("https://www.moneyblinks.com/");
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>{t(errorMessageCode)}</Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
          <Modal show={succesfulModal} onHide={handleCloseSuccess}>
            <Modal.Body
              style={{
                backgroundColor: "#47c9a2",
                width: "100%",
                height: "230px",
              }}
            >
              <div className="modalHeader">
                <div className="icon-box">
                  <i className="material-icons">&#xE876;</i>
                </div>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseSuccess}
                >
                  &times;
                </button>
              </div>
            </Modal.Body>
            <div
              style={{
                height: "200px",
                width: "100%",

                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ height: "200px", width: "100%" }}>
                <h4 className="modeSubtitle">{t("great")}</h4>
                <p className="modeSubtitle2">{t("data_submitted")}</p>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Formulario4;
