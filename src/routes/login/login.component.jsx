import { useState } from 'react';
import Button from '../../components/button/button.component';
import axios from 'axios';
import { useAuth } from '../../context/auth.context';
import '../sign-up/sign-up.styles.scss';

function Login() {
  const defaultFormFields = {
    email: '',
    password: '',
  };
  const { login } = useAuth();
  const [formFields, setFormFields] = useState(defaultFormFields);

  const handleFormSubmition = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_BASE_URL}/signin`,
        formFields,
        {
          withCredentials: true,
        }
      );
      const user = response.data.user;

      if (!user) {
        return;
      }

      await login(user);
    } catch (error) {
      console.error(error);
    }
  };

  function handleOnChange(e) {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <div className="page-wrapper form-wrapper">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleFormSubmition}>
        <input
          name="email"
          placeholder="Email"
          value={formFields.email}
          type="email"
          required
          onChange={handleOnChange}
        />
        <input
          name="password"
          placeholder="Password"
          value={formFields.password}
          type="password"
          required
          onChange={handleOnChange}
        />
        <Button inType="submit" text="Login" />
      </form>
    </div>
  );
}

export default Login;
