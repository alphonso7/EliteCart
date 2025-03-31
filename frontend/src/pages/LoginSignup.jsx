import React from 'react'
import{useState} from 'react'

const LoginSignup = () => {

  const [state, setState] = useState("Login")

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async() =>{
    console.log("Login executed", formData);
    let responseData;
    await fetch('http://localhost:3000/login',{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((resp) => resp.json())
    .then((data)=> {responseData = data})
    if (responseData.success) {   
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.errors || "Login failed");
    }
  }

  const Signup = async() =>{
    console.log("Sign up executed", formData)
    let responseData;
    await fetch('http://localhost:3000/signup',{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    .then((resp) => resp.json())
    .then((data)=> {responseData = data})
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-4">{state}</h2>
      
      {state === "Sign up" && (
        <div className="mb-3">
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="mb-3">
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={() => (state === "Login" ? login() : signup())}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>

      <div className="text-center text-sm text-gray-600">
        {state === "Sign up" ? (
          <p>
            Already have an account? 
            <span 
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Don't have an account? 
            <span 
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setState("Sign up")}
            >
              Sign up here
            </span>
          </p>
        )}
=======
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">{state}</h2>
        <div className="name">
          {state==="Sign up"?<input name='username'value={formData.username} onChange={handleChange} type="text" placeholder='Name'/>:<></>}
        </div>
        <div className="email">
          <input name='email' value={formData.email} onChange={handleChange} type="email" placeholder='email' />
        </div>
        <div className="password">
          <input name='password' value={formData.password} onChange={handleChange} type="password" placeholder='password' />
        </div>
        <div className="continue">
          <button onClick={() => {state==="Login"?login():Signup()}} >Continue</button>
        </div>
        <div className="already">
          {state==="Sign up"?<p>Already have an account? <span onClick={()=> {setState("Login")}} >Login here</span> </p>:<></>}
          {state==="Login"?<p>Create an account? <span onClick={()=> {setState("Sign up")}} >Click here</span> </p>:<></>}
          
          
        </div>
>>>>>>> dev
      </div>
    </div>
  </div>
  )
}

export default LoginSignup
