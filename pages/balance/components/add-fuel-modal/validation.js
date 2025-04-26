import * as yup from "yup";

const validationSchema = yup.object().shape({
  quantity: yup
    .number()
    .typeError("Պետք է լինի թիվ")
    .integer("Թույլատրվում են միայն ամբողջ թվեր")
    .min(1, "Պետք է լինի առնվազն 1")
    .required("Լրացնելը պարտադիր է"),
});

export default validationSchema;
