import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "./marginer";
import { AccountContext } from "./accountContext";

export function LoginForm({ Login, error }) {
  console.log("PORPS:", Login, error);
  const { switchToSignup } = useContext(AccountContext);

  const [details, setDetails] = useState({name: "", email: "", password: ""})

  const submitHandler = e => {
    e.preventDefault(); //dont reload the page

    Login(details);
  }
  
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      {/* <MutedLink href="#">Forget your password?</MutedLink> */}
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={submitHandler}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
