
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


    
    <div >
      <header >
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
















