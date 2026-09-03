import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
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
          formControls={loginFormControls}
          buttonText={"Login"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>

      <p className="text-center text-sm text-[#5a4634] mt-6">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="font-semibold text-[#a5553a] hover:underline"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}

export default AuthLogin;