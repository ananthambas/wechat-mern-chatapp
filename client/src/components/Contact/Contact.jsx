import "./contact.scss"

const Contact = ({contact}) => {

    // console.log(contact);
    return (
        <div className="contact">
            <div className="contactWrapper">

                {contact?.username}
            </div>
        </div>
    );
}

export default Contact;