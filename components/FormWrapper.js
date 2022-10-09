import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AnimateHeight from "react-animate-height";

const FormWrapper = (props) => {
  const [open, setOpen] = useState(false);

  let {children} = props;
  let {titleOpen, titleClosed} = props;

  return (
    <div className="bg-primary bg-opacity-50 p-2 md:py-2 md:px-4 mt-8 max-w-xl mx-auto">
      <div
        className="flex items-center justify-between hover:cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="m-0">
          {open ? titleOpen : titleClosed}
        </p>
        <FontAwesomeIcon icon={faPlusCircle} className="h-4" />
      </div>
      <AnimateHeight duration={250} height={open ? "auto" : 0} className="max-w-xl mx-auto">
        <div className="pt-8">
          {children}
        </div>
      </AnimateHeight>
    </div>
  );
};

export default FormWrapper;
