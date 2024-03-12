import { useEffect, useState } from "react";

function Signin() {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    phoneNumber: "",
    passWord: "",
  });
  const [userNameReq, setUserNameReq] = useState("");
  const [phoneNumberReq, setphoneNumberReq] = useState("");
  const [passWordReq, setpassWordReq] = useState("");
  const [conformPassword, setConformPassword] = useState();
  const[userNameExists,setUserNameExists]=useState('');
  function handleChange(e) {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    console.log(name, value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // userNameValidation
    const userNameRequired =
      userDetails.userName.length === 0
        ? "required"
        : userDetails.userName.length <= 4
        ? "mustfilled 8 character"
        : "";
    setUserNameReq(userNameRequired);

    // phoneNumberValidation
    const validPhoneNumber = /^(0|[1-9]\d*)$/.test(userDetails.phoneNumber);
    const phoneNumberRequired =userDetails.phoneNumber.length==0?"required":!validPhoneNumber
      ? "digits only"
      : userDetails.phoneNumber.length > 10 ||
        userDetails.phoneNumber.length < 10
      ? "must filled 10 digits"
      : "";
    //password validation
    const passWordRequired =userDetails.passWord.length==0?"required":
      userDetails.passWord === conformPassword
        ? ""
        : "mismatch password";
    setpassWordReq(passWordRequired);
    setphoneNumberReq(phoneNumberRequired);
    if (
      userNameRequired == "" &&
      validPhoneNumber &&
      userDetails.phoneNumber.length === 10 &&
      userDetails.passWord === conformPassword
    ) {
      try {
        await fetch("http://localhost:8080/signin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("data",data);
          if(data.body==="username already exists")
          {
            setUserNameExists("username already exists")
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("vijay");
      } catch (error) {
        console.log("fetch data error",error)
      }
    }
  };
  return (
    <>
      <form action="">
        <div>
          <label htmlFor="">Username:</label>
          <input
            type="text"
            name="userName"
            value={userDetails.userName}
            onChange={handleChange}
          />
          <span>{userNameReq}</span>
        </div>
        <div>
          <label htmlFor="">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={userDetails.phoneNumber}
            onChange={handleChange}
          />
          <span>{phoneNumberReq}</span>
        </div>
        <div>
          <label htmlFor="">Password:</label>
          <input
            type="text"
            name="passWord"
            value={userDetails.passWord}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Conform-Password:</label>
          <input
            type="text"
            value={conformPassword}
            onChange={(e) => setConformPassword(e.target.value)}
          />
          <span>{passWordReq}</span>
        </div>
        <div>
          <button onClick={handleSubmit}>SignIn</button>
        </div>
      </form>
      <p>{userNameExists}</p>
    </>
  );
}
export default Signin;
