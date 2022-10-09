import { useState } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "./FormWrapper";

const PublicVenueForm = (props) => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    let response;
    setFormData(data);
    try {
      response = await fetch("/api/submitVenue", {
        method: "POST",
        body: JSON.stringify(data),
        type: "application/json",
      });
      setIsSubmitting(false);
      setHasSubmitted(true);
    } catch (err) {
      setFormData(err);
    }
  };

  return (
    <FormWrapper titleOpen={`Adding a new venue...`} titleClosed={`Add a new venue`}>
      <form onSubmit={handleSubmit(onSubmit)} className="submit-form" disabled>
        {/* <input {...register("venueId")} type="hidden" name="venueId" value={venueId} /> */}
        <div>
          <label>
            <span className="text-gray-700">{`What's the name of the venue?`}</span>
          </label>
          <input name="name" {...register("name")} placeholder="The name of the venue." />
        </div>
        <div>
          <label>
            <span className="text-gray-700">{`What's the address of the venue?`}</span>
          </label>
          <input name="address" {...register("address")} placeholder="The address of the venue." />
        </div>
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        <div
          className={
            !hasSubmitted && !isSubmitting
              ? "w-full flex items-end"
              : isSubmitting && !hasSubmitted
              ? "w-full flex items-end"
              : "w-full flex items-center"
          }
        >
          <input
            type="submit"
            value={
              !hasSubmitted && !isSubmitting
                ? "Submit"
                : isSubmitting && !hasSubmitted
                ? "Submitting"
                : "Thanks for your submission."
            }
            className={"submit-button border-none"}
          />
        </div>
      </form>
    </FormWrapper>
  );
};

export default PublicVenueForm;
