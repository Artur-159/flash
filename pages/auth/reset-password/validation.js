import * as yup from "yup";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Գաղտնաբառը պարտադիր է")
    .min(6, "Գաղտնաբառը պետք է լինի առնվազն 6 նիշ"),
  repeat_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Գաղտնաբառերը չեն համընկնում")
    .required("Պետք է հաստատել գաղտնաբառը"),
});

export default validationSchema;
