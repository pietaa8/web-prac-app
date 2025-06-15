import useTitle from "../Hooks/useTitle";

const Contact = () => {
  useTitle("Contact-LawVault");
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact-us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text_para">
          Got a technical issue? want to send feedback about a beta feature? Let
          us Know.
        </p>
      </div>
    </section>
  );
};

export default Contact;
