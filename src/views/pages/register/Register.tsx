import images from "@/assets/images/imageData/ImageData";
import RegistrationForm from "@/composites/RegistrationForm/RegistrationForm";

function Register() {
  return (
    <div className="flex  min-h-[100vh] ">
      <div className=" bg-white w-1/2 flex items-center justify-center">
        <RegistrationForm />
      </div>
      <div className="bg-sidebar-color  w-1/2 ">
        <div className="flex justify-end m-2">
      
        <img src={images.logo} alt="" className="w-20 h-20 " />
        </div>
      </div>
    </div>
  );
}

export default Register;
