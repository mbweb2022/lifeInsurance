import logo from "./logo.svg";
import "./App.css";
import FormularioInmed from "./components/FormularioInmed";
import { useTranslation, Trans } from "react-i18next";
import Formulario from "./components/Formulario";
import { useEffect } from "react";
import Formulario4 from "./components/Formulario4";
const lngs = {
  en: { nativeName: "English" },
  es: { nativeName: "Español" },
};
function App() {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.scr = "./vendor/jquery/jquery.min.js";
  //   script.scr = "./vendor/select2/select2.min.js";
  //   script.scr = "./vendor/datepicker/moment.min.js";
  //   script.scr = "./vendor/datepicker/daterangepicker.js";
  //   script.scr = "./vendor/jquery/jquery.min.js";

  //   script.async = true;

  
  // }, []);
  // const { t, i18n } = useTranslation();
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <div>
    //       {Object.keys(lngs).map((lng) => (
    //         <button
    //           type="submit"
    //           key={lng}
    //           onClick={() => i18n.changeLanguage(lng)}
    //           disabled={i18n.resolvedLanguage === lng}
    //         >
    //           {lngs[lng].nativeName}
    //         </button>
    //       ))}
    //     </div>
    //     <p>
    //       <Trans i18nKey="description.part1">
    //         Edit <code>src/App.js</code> and save to reload.
    //       </Trans>
    //     </p>

    //   </header>
    // </div>
    //<FormularioInmed/>
    <Formulario4 />
  );
}

export default App;
