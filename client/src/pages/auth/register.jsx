import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
        navigate("/auth/login");
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }

  return (
    <>
      <h1 className="text-center text-3xl font-serif tracking-wide text-[#a5553a] mb-8">
        ARMANE
      </h1>

      <div
        className="
          [&_form]:space-y-6
          [&_label]:hidden
          [&_div.grid]:gap-0
          [&_input]:bg-transparent
          [&_input]:border-0
          [&_input]:border-b
          [&_input]:border-[#c9a98b]
          [&_input]:rounded-none
          [&_input]:px-0
          [&_input]:py-2
          [&_input]:text-[#5a4634]
          [&_input]:placeholder:text-[#a68a6d]
          [&_input:focus]:ring-0
          [&_input:focus]:border-[#a5553a]
          [&_input:focus-visible]:ring-0
          [&_input:focus-visible]:ring-offset-0
          [&_button[type=submit]]:bg-[#a5553a]
          [&_button[type=submit]]:hover:bg-[#8f4630]
          [&_button[type=submit]]:text-white
          [&_button[type=submit]]:font-semibold
          [&_button[type=submit]]:rounded-md
          [&_button[type=submit]]:py-3
          [&_button[type=submit]]:mt-4
        "
      >
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>

      <p className="text-center text-sm text-[#5a4634] mt-6">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-[#a5553a] hover:underline"
        >
          Login
        </Link>
      </p>
    </>
  );
}

export default AuthRegister;