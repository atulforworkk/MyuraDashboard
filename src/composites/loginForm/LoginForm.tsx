import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = (props: Props) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrors({ email: data.message || "Login failed" });
        } else {
          localStorage.setItem("token", data.jwtToken);
          navigate("/home/newtask");
        }
      } catch (err) {
        setErrors({ email: "Something went wrong" });
      } finally {
        setSubmitting(false);
      }
    },
  });
  const { values, handleSubmit, handleChange, handleBlur } = formik;
  return (
    <div className=" bg-white w-1/2 flex items-center justify-center">
      <div className="flex flex-col w-full  justify-center items-center">
        <h1 className="text-3xl font-semibold underline underline-offset-2 text-center my-4">
          Only for admin 
        </h1>
        <form
          className="flex flex-col justify-center items-center w-6/12"
          onSubmit={handleSubmit}
        >
         <div className="flex flex-col w-full">
  <div className="flex items-center gap-4">
    <Label className="w-24">Email-Id</Label>
    <Input
      type="text"
      placeholder="email id"
      className="w-full"
      name="email"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </div>

  {formik.touched.email && formik.errors.email && (
    <div className="text-red-500 text-sm mt-1 ml-24"> {/* ml-24 aligns with label width */}
      {formik.errors.email}
    </div>
  )}
</div>
<div className="flex flex-col w-full my-2">
  <div className="flex items-center gap-4">
    <Label className="w-24">Password</Label>
    <Input
      type="password"
      className="w-full"
      name="password"
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </div>

  {formik.touched.password && formik.errors.password && (
    <div className="text-red-500 text-sm mt-1 ml-24"> {/* ml-24 aligns with label width */}
      {formik.errors.password}
    </div>
  )}
</div>
{/* type="submit" */}
          <Button className="w-full bg-sidebar-color font-bold" onClick={()=>(navigate('/home'))}  >
            Login
          </Button>
          {/* <p>
            New here?{" "}
            <Link to={`/register`} className="font-semibold">
              Register{" "}
            </Link>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
