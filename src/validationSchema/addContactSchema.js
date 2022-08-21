import * as Yup from "yup";

export const AddContactSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  address: Yup.string().required("Please enter address"),
  phonenumber: Yup.string()
    .min(10, "Must be exactly of 10 digits")
    .max(10, "Must be exactly of 10 digits")
    .required("Please enter a valid Phone Number")
});
