
import LoginForm from "@/composites/loginForm/LoginForm";
import images from "@/assets/images/imageData/ImageData";
function Login() {
  return (
    <div className="flex  min-h-[100vh] ">
     <LoginForm/>
      <div className="bg-sidebar-color w-1/2 ">
        <div className="flex justify-end m-2 mx-4">
         <img src={images.logo} alt="" className="w-52 h-20 " />
        </div>
      </div>
    </div>
  );
}

export default Login;
``