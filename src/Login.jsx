import { useState } from "react";

function Login() {
  const [loginUserDetails, setLoginUserDetails] = useState({
    userName: "",
    passWord: "",
  });
const[validUserName,setValidUsername]=useState('');
const[validPassWord,setValidPassword]=useState('');
const[doesNotUserName,setdoesNotUserName]=useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUserDetails({ ...loginUserDetails, [name]:value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userNameReq=loginUserDetails.userName==""?setValidUsername("Required"):loginUserDetails.userName!=""?setValidUsername(""):"";
    const passWrodReq=loginUserDetails.passWord==""?setValidPassword("Required"):loginUserDetails.userName!=""?setValidPassword(""):"";
  if(userNameReq!=""&&passWrodReq!="")
  {
   try {

    await fetch("http://localhost:8080/login/add",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(loginUserDetails)
    })
    .then(res=>{
      return res.json();
    })
    .then(data=>{
      console.log("data",data);
      if(loginUserDetails.userName!=data.body[0].userName)
      {
        console.log("not valid username");
        setdoesNotUserName("not valid username");
      }
      else if(loginUserDetails.userName===data.body[0].userName && loginUserDetails.passWord===data.body[0].passWord)
      {
        console.log("correct");
      }
    })
   } catch (error) {
    console.log("Fetch Data Error:",error);
   }
  }
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="login-container">
          <div className="input-container">
            <label htmlFor="usernameinput">Username:</label>
            <input
              type="text"
              id="usernameinput"
              name="userName"
              onChange={handleChange}
            />
            <span>{validUserName}</span>
          </div>
          <div className="input-container">
            <label htmlFor="passwordinput">PassWord:</label>
            <input
              type="text"
              id="passwordinput"
              name="passWord"
              onChange={handleChange}
            />
            <span>{validPassWord}</span>
          </div>
          <span>{doesNotUserName}</span>
          <div>
            <button>Login</button>
          </div>

        </div>
      </form>
    </>
  );
}
export default Login;
