import * as React from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { CloseEye, Eye } from "@/lib/svgExport";

const InputPassword = ({ ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input {...props} type={showPassword ? "text" : "password"} />
      <div
        className="absolute top-0 w-10 h-10 cursor-pointer right-0 bottom-0 flex justify-center items-center"
        onClick={() => setShowPassword(!showPassword)}
      >
        <Image
          alt={showPassword ? "show" : "hide"}
          src={showPassword ? Eye : CloseEye}
          className="w-1/2 h-1/2 "
        />
      </div>
    </div>
  );
};

export default InputPassword;
