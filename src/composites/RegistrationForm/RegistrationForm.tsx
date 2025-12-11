"use client";
import PreAuthInput from "@/components/input/PreAuthInput";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().email().required().label("Email-id"),
  password: Yup.string().required().label("Password"),
});
type Props = {};
const RegistrationForm = (props: Props) => {
  const navigate = useNavigate();
  const [passwordSpecialChar, setPasswordSpecialChar] = useState(false);
  const [position, setPosition] = useState("client");
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const [sucessRegisteration, setSucessRegisteration] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const payload = {
        name: `${values.firstName.trim()} ${values.lastName.trim()}`,
        email: values.email,
        password: values.password,
      };
      console.log("Payload being sent:", payload); 

      try {
        const response = await fetch("http://localhost:8080/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          setErrors({ email: data.message || "Registration failed" });
        } else {
          navigate("/login");
        }
      } catch (err) {
        setErrors({ email: "Something went wrong" });
      } finally {
        setSubmitting(false);
      }
    },
  });
  
  const { values, touched, errors, handleChange, handleSubmit } = formik;
  // const { firstName, lastName, email, password } = values;

  const checkForSpecialChar = () => {
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const containsSpecialCharacter = specialCharacterRegex.test(
      values.password
    );

    if (containsSpecialCharacter) {
      setPasswordSpecialChar(true);
    } else {
      setPasswordSpecialChar(false);
    }
  };
  const passwordLength = values.password.length;
  const checkPassword = () => {
    if (passwordLength < 8) {
      setPasswordCheck(false);
    } else {
      setPasswordCheck(true);
    }
  };
  useEffect(() => {
    checkPassword();
    checkForSpecialChar();
  }, [values.password]);

  const handleModalClose = () => setShowSuccess(false);
  const handleTermModalOpen = () => {
    setShowTerms(false);
  };
  const handleTermModalClose = () => {
    setShowTerms(false);
  };

  return (
    <div className="flex flex-col pr-4 pt-6 ">
      <h1 className="text-2xl font-semibold text-center underline underline-offset-2">
        Register
      </h1>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-1">
          <div className="grid grid-cols-2 gap-x-4">
            <PreAuthInput
              label="First Name "
              placeholder=""
              name="firstName"
              onChange={handleChange}
              value={values.firstName}
              error={errors.firstName}
              touched={touched.firstName}
            />
            <PreAuthInput
              label="Last Name "
              placeholder=""
              name="lastName"
              onChange={handleChange}
              value={values.lastName}
              error={errors.lastName}
              touched={touched.lastName}
            />
          </div>
          <PreAuthInput
            label="Email"
            placeholder="Enter Email"
            name="email"
            onChange={handleChange}
            value={values.email}
            error={errors.email}
            touched={touched.email}
          />
          <PreAuthInput
            label="Password"
            placeholder="Enter Password"
            name="password"
            onChange={handleChange}
            value={values.password}
            error={errors.password}
            touched={touched.password}
            type="password"
          />

          <div className="flex">
            <p className="text-sm opacity-75 ml-2">
              Must be at least 8 character
            </p>
          </div>
          <div className="flex">
            <p className="text-sm opacity-75 ml-2">
              Must contain one special character
            </p>
          </div>
          <label className="flex items-center text-sm" htmlFor="checkbox">
            <input
              className="mr-2 drop-shadow-md "
              type="checkbox"
              id="terms"
              // onChange={handleTermCheck}
              checked={values.terms}
            />
            *I agree to
            <button
              onClick={handleTermModalOpen}
              type="button"
              className="font-medium text-blue-color underline  underline-offset-1 hover:text-link-hover textfigma-main"
            >
              Terms and conditions
            </button>
          </label>
          <Button type="submit" className="bg-sidebar-color" 
          onClick={()=>{
            navigate()
          }}
          >
            Register
          </Button>

          <p className=" text-center my-2 ">
            Already have an account
            <Link to={"/login"} className=" font-semibold">
              Login Now
            </Link>
          </p>
        </form>
      </FormikProvider>
    </div>
  );
};

export default RegistrationForm;
