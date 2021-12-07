import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import FormInput from "../../components/FormInput/FormInput";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "../register/register.scss"

const Login = () => {

    const {isFetching, error, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const inputs = [
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
            // pattern: "^[A-Za-z0-9!@#$%^&*]{8,20}$",
            // required: true
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = values.email;
        const password = values.password;
        login(true, {email, password}, dispatch);

    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    console.log(values);
    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {inputs.map(input => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={handleChange} />
                ))}
                {error && <div className="errorMessage">Login Failed</div>}
                <button>Login</button>
                <p>If you don't have an account, <span onClick={() => navigate("/register")}>Register</span> now</p>
            </form>
        </div>
    );
}

export default Login;