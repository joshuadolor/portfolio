import { useForm } from "react-hook-form";
import { useStateContext } from "../../contexts/ContextProvider";
import { useRef, useEffect } from "react";

const inputStyles = `w-full rounded-lg bg-primary-300
px-5 py-4 text-black`;

const ContactSection = () => {
  const { setSection } = useStateContext();
  const ref = useRef(null);
  useEffect(() => {
    if (ref) {
      setSection(ref);
    }
  }, [ref]);

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
  };

  return (
    <section ref={ref} id="contact" className="py-20 lg:h-screen md:h-screen">
      <div className="text-white md:hidden sm:block xs:block font-bold text-2xl">
        Contact Me
      </div>
      <p className="my-7">
        Let's work together to create something awesome. Contact me to get
        started.
      </p>

      <div className="w-full mt-10 justify-between gap-8 md:flex">
        <form
          onSubmit={onSubmit}
          action="https://formsubmit.co/dev.joshuadolor@gmail.com"
          method="POST"
        >
          <div className="mb-5">
            <input
              className={inputStyles}
              type="text"
              placeholder="Name"
              {...register("name", {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.name && (
              <div className="mt-1 text-red-300 text-sm">
                {errors.name.type === "required" && "This field is required."}
                {errors.name.type === "maxLength" &&
                  "Max length is 100 characters."}
              </div>
            )}
          </div>

          <div className="mb-5">
            <input
              className={inputStyles}
              type="text"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email && (
              <div className="mt-1 text-red-300 text-sm">
                {errors.email.type === "required" && "This field is required."}
                {errors.email.type === "pattern" && "Invalid email address."}
              </div>
            )}
          </div>

          <div className="mb-5">
            <textarea
              className={inputStyles}
              placeholder="Message"
              rows={4}
              cols={50}
              {...register("message", {
                required: true,
                maxLength: 2000,
              })}
            />
            {errors.message && (
              <div className="mt-1 text-red-300 text-sm">
                {errors.message.type === "required" &&
                  "This field is required."}
                {errors.message.type === "maxLength" &&
                  "Max length is 2000 characters."}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="rounded-xl  bg-[#f2c542] text-gray-700 hover:shadow-md hover:outline text-sm py-2 px-4"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
