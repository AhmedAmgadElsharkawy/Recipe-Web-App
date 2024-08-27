import React from "react";
import Register from "../components/Register";
import Login from "../components/Login";

function Auth (){
    return (
        <div className="auth">
          <Login/>
          <Register/>
        </div>
      );
}

export default Auth;