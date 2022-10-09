import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "./FormWrapper";

const PublicEventForm = (props) => {
  let { venue } = props;

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
      response = await fetch("/api/submitEvent", {
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

  let eventType = "event";
  if (venue.type == "theater") {
    eventType = "movie";
  }

  return (
    <FormWrapper
      titleOpen={`Adding event at ${venue.name}`}
      titleClosed={`Add event at ${venue.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="submit-form" disabled>
        <input {...register("venueId")} type="hidden" name="venueId" value={venue._id} />
        <input {...register("eventType")} type="hidden" name="eventType" value={eventType} />
        <div>
          <label>
            <span className="text-gray-700">{`What's the name of the event?`}</span>
          </label>
          <input name="name" {...register("name")} placeholder="The name of the event." />
        </div>
        <div>
          <label>
            <span className="text-gray-700">When does the event start?</span>
          </label>
          <input
            name="startTime"
            min={dayjs().format("YYYY-MM-DDThh:mm")}
            {...register("startTime")}
            type="datetime-local"
          />
        </div>
        <div>
          <label>
            <span className="text-gray-700">Is there a link/URL for this event?</span>
          </label>
          <input name="url" {...register("url")} placeholder="https:// ..." />
        </div>
        <div>
          <label>
            <span className="text-gray-700">Please provide a short description for the event.</span>
          </label>
          <input
            name="description"
            {...register("description")}
            placeholder="..."
            type="textarea"
          />
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

export default PublicEventForm;
