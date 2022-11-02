import i18next from "i18next";
import React from "react";

function Example() {
  i18next.init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          key: "hello world",
        },
      },
    },
  });
 // console.log(i18next.t("key"));
  return <div>{i18next.t("key")}</div>;
}

export default Example;
