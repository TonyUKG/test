import './App.css';
import GoogleLogin from 'react-google-login';
import { useState } from 'react';

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  )

  const handleFailure = (result) => {
    alert(result);
  }

  const handleLogin = async (googleData) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  }

  const handleLogout = (googleData) => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  }

  return (
    <div className="App">
      <div class="flex-item">
        <h1>Asset Control</h1>
        <div>
          {
            loginData ? (
              <div>
                <h3>You logged in as {loginData.email}</h3>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Login in with google"
                  onSuccess={handleLogin}
                  onFailure={handleFailure}
                  cookiePolicy={'single_host_origin'}
                ></GoogleLogin>
              )
          }
        </div>
      </div>
      <div class="flex-container">
        {/* <img class="flex-item-right" src="https://sebhastian.com/html-image-not-showing/empty-cache-hard-reload-chrome.png" alt=""></img> */}
        {/* <div class="flex-item-left test">Auto</div> */}

        <footer>
          <hr class="footer-division"></hr>
          <div class="footer-bottom">
            <p> &copy;2022 Konrad. All Rights Reserved  </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
