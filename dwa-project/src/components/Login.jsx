// import React, { useState } from 'react';
// Import the supabase instance

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

  // const handleLogin = async (e) => {
  //   e.preventDefault(); // Prevent default form submission behavior

  //   setError(''); // Reset error state

  //   try {
  //     const { user, error } = await supabase.auth.signIn({
  //       email: email,
  //       password: password,
  //     });

  //     if (error) {
  //       setError('Invalid credentials. Please try again.');
  //     } else {
  //       // Successful login
  //       onLogin(user);
  //     }
  //   } catch (error) {
  //     setError('An error occurred. Please try again later.');
  //   }
  // };

//   return (
//     <div className=".login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}> {/* Use onSubmit to handle form submission */}
//         <input
//           type="email"
//           className="input"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           className="input"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="btn-login" type="submit">
//           Log In
//         </button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };
// Login.jsx
// Login.jsx
import React, { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react';

const Login = ({ onLogin, setShowAuth }) => {
//   const handleLogin = async (session) => {
//     // Handle the successful login and pass the user data to the parent component (App)
//     const user = session.user;
//     onLogin(user); // Set the user and view to 'showList' in the parent component (App)
//     setShowAuth(false); // Hide the Auth component after successful login
//   };

  const handleSession = (session) => {
    if (session?.user) {
      handleLogin(session);
    }
  };

  return (


    
    <div className="login">
      <header className="App-Header">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google']}
          handleSession={handleSession} // Call handleLogin when the session is available
        />
      </header>
    </div>
  );
};

export default Login;
















