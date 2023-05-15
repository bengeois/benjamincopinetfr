import emailjs from "emailjs-com";
import React from "react";
import { FaEnvelope, FaMapMarker } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "../../components/form-input/form-input.cmp";
import "./contact.scss";

const ContactPage = () => {
    const [form, setForm] = React.useState({
        name: "",
        email: "",
        telephone: "",
        message: "",
        subject: "",
    });

  const sendEmail = (data) => {
    return new Promise((resolve, reject) => {
      emailjs
          .sendForm(
              "benjamincopinetfr",
              "template_jufwop9",
              data,
              "user_Xi8P00Kv0Ne36u3IvN9oA"
          )
          .then(
              (result) => {
                setForm({
                  name: "",
                  email: "",
                  telephone: "",
                  message: "",
                  subject: "",
                });
                resolve();
              },
              (error) => {
                reject();
              }
          );
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    toast.promise(sendEmail(e.target), {
      pending: "Envoi en cours.",
      success: "Le mail a bien été envoyé. 👌",
      error:
          "Erreur lors de l'envoi. Si le problème persiste, contactez-moi directement à benjamin.copinet@outlook.fr 🤯",
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
      <div className="contact flex-c">
        <div className="contact-backround" />
        <div className="contact-content flex-c">
          <div className="contact-left">
            <h1 className="contact-title">CONTACTEZ MOI</h1>
            <div className="contact-details">
              <h2>Informations de contact:</h2>
              <p>
                <FaEnvelope className="react-icons" />
                <a
                    href="mailto:benjamin.copinet@outlook.fr"
                    target="_blank"
                    rel="noreferrer"
                >
                  benjamin.copinet@outlook.fr
                </a>
              </p>
              <p>
                <FaMapMarker className="react-icons" /> Reims, France
              </p>
            </div>
          </div>
          <form className="contact-form flex-c" onSubmit={handleForm}>
            <legend>
              <h2>
                Remplissez le formulaire et je reviendrai vers vous dès que
                possible!
              </h2>
            </legend>
            <FormInput
                name="name"
                type="text"
                placeholder="Nom"
                value={form.name}
                handleChange={handleChange}
                required
            />
            <FormInput
                name="subject"
                type="text"
                placeholder="Sujet"
                value={form.subject}
                handleChange={handleChange}
                required
            />
            <FormInput
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                handleChange={handleChange}
                required
            />
            <FormInput
                name="telephone"
                type="number"
                placeholder="Téléphone"
                value={form.telephone}
                handleChange={handleChange}
                required
            />
            <FormInput
                name="message"
                type="text"
                placeholder="Message"
                value={form.message}
                handleChange={handleChange}
                textarea="true"
                required
            />
            <input className="contact-button" type="submit" value="ENVOYER" />
          </form>
        </div>
        <ToastContainer />
      </div>
  );

}
export default ContactPage;
