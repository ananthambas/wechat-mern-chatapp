import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import FormInput from "../../components/FormInput/FormInput";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./register.scss"

const Register = () => {

    const {error, isFetching, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage: "Username should be 3-16 characters and shouldn't include any special characters",
            label: "Username",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address",
            label: "Email",
            required: true
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "Password should be 8-20 characters",
            label: "Password",
            pattern: "^[A-Za-z0-9!@#$%^&*]{8,20}$",
            required: true
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Passwords don't match!",
            label: "Confirm Password",
            pattern: values.password,
            required: true
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = values.username;
        const email = values.email;
        const password = values.password;
        login(false, {username, email, password}, dispatch);

    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    console.log(values);
    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                {inputs.map(input => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={handleChange} />
                ))}
                {error && <div className="errorMessage">Registration Failed</div>}
                <button>Register</button>
                <p>If you already have an account, <span onClick={() => navigate("/login")}>Login</span> here</p>
            </form>
        </div>
    );
}

export default Register;