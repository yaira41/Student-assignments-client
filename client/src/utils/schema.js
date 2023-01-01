import * as yup from "yup";

const validId = /^(?<!\d)\d{9}(?!\d)/;

export const schema = yup.object().shape({
  // name: yup.string().required("נא להכניס שם מלא"),
  id: yup
    .string()
    .matches(validId, { message: "תעודת זהות אינה תקינה" })
    .max(9, "שדג")
    .required("נא להכניס תעודת זהות מלאה"),
});
