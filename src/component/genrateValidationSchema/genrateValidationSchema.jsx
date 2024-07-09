import * as Yup from 'yup';

const generateValidationSchema = (inputFields) => {
  let validationObject = {};

  inputFields.forEach((field) => {

    validationObject[field.name] = field.required
      ? Yup.string().required(`This Field is required`)
      : Yup.string();

    if (field.type === 'email') {
      validationObject[field.name] = validationObject[field.name].email('Invalid email');
    }

    if (field.type === 'checkbox') {
      validationObject[field.name] = Yup.boolean().oneOf([true, false], `You must be ${field.label || field.name}`);
    }

    if (field.type == "number") {
      if (field.minLength && field.maxLength) {
        validationObject[field.name] = Yup.number().test('len', 'Invalid Number', value => {
          const length = value.toString().length;
          return length > field['minLength'] && length < field['maxLength'];
        });
      }
      else {
        validationObject[field.name] = Yup.number().required()
      }
    }

    if (field.name == "password2") {
      validationObject[field.name] = Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required(`${field.placeholder} is required`);
    }

    if (field.name === "invoice_to_date") {
      validationObject[field.name] = Yup.date().nullable()
        .typeError('Invalid date format')
        .when('invoice_from_date', (invoice_from_date, schema) => {
          return invoice_from_date
            ? schema.min(
              invoice_from_date,
              'Invoice to date must be greater than or equal to invoice from date'
            )
            : schema;
        })
    }
    if (field.name === "payment_to_date") {
      validationObject[field.name] = Yup.date().nullable()
        .typeError('Invalid date format')
        .when('payment_from_date', (invoice_from_date, schema) => {
          return invoice_from_date
            ? schema.min(
              invoice_from_date,
              'Payment to date must be greater than or equal to Payment from date'
            )
            : schema;
        })
    }
    if (field.name === "dispute_to_date") {
      validationObject[field.name] = Yup.date().nullable()
        .typeError('Invalid date format')
        .when('dispute_from_date', (invoice_from_date, schema) => {
          return invoice_from_date
            ? schema.min(
              invoice_from_date,
              'Dispute to date must be greater than or equal to Dispute from date'
            )
            : schema;
        })
    }

    if (field.type == "url" && validationObject[field.name] == field.required) {
      validationObject[field.name] = Yup.string().url('Please enter a valid URL').required('URL is required')
    }

    if (field.name == "salary") {
      validationObject[field.name] = Yup.number().min(5000);
    }

    if (field.name == "experience") {
      validationObject[field.name] = Yup.number().max(5);
    }
    if (field.name == "transfer_customer"){
      validationObject["transfer_customer"] = Yup.array();
    }
  });

  return Yup.object().shape(validationObject);
};


export default generateValidationSchema;