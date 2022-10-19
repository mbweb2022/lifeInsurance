import { useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
// import "../styles/Form.css";
const lngs = {
  en: { nativeName: "English" },
  es: { nativeName: "Español" },
};

function FormularioInmed() {
  const { t, i18n } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div>
        {Object.keys(lngs).map((lng) => (
          <button
            type="submit"
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            disabled={i18n.resolvedLanguage === lng}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div> */}
      <div className="row">
        <div className="col">
          <Trans htmlFor="exampleInputEmail1" i18nKey="email">Email address</Trans>
          <input
            {...register("email")}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="col">
          <label htmlFor="exampleInputPassword1" style={{ textColor: "black" }}>
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            {...register("email")}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="col">
          <label htmlFor="exampleInputPassword1" style={{ textColor: "black" }}>
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
      </div>

      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default FormularioInmed;
