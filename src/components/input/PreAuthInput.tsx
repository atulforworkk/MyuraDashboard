import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import Error from "../error/Error";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: string | undefined;
  touched: boolean | undefined;
}

const PreAuthInput = ({
  label,
  name,
  error,
  touched,
  ...props
}: InputProps) => {
  return (
    <div>
      <Label htmlFor={name}>{label} </Label>
      <Input className="shadow-none" id={name} {...props} />
      {/* <Error touched={touched} error={error} /> */}
    </div>
  );
};

export default PreAuthInput;
