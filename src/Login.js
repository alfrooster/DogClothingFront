import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ClothingList from './ClothingList';
import ProducerList from './ProducerList';
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";

function Login() {

const [tabs, setTabs] = useState("one");

//states for authentication
const [user, setUser] = useState({
    username: '',
    password: ''
});
const [isAuthenticated, setAuth] = useState(false);

//save user input to state
const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value});
    console.log("handleChange: " + user) 
}

const handleTabChange = (event, tabs) => {
    setTabs(tabs);
};

const login = () => {
    console.log('login function -> fetch');
    fetch('http://localhost:8080/login', { //call the login endpoint
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(user)
    })
    .then(res => {
      console.log('then');
      const jwtToken = res.headers.get('Authorization'); //get the token if succeeds
      if (jwtToken !== null) {
        sessionStorage.setItem("jwt", jwtToken);
        setAuth(true);
        console.log('jwtToken is not null');
      }
    })
    .catch(err => console.error(err))
}

if (isAuthenticated) {
    return (
      <>
        <Tabs value={tabs} onChange={handleTabChange}>
          <Tab value="one" label="CLOTHES" />
          <Tab value="two" label="PRODUCERS" />
        </Tabs>
        {tabs === "one" && (
            <div>
            <ClothingList />
            </div>
        )}
        {tabs === "two" && (
            <div>
            <ProducerList />
            </div>
        )}
      </>
    );  
}
else {
return(
    <div>
        <Stack spacing={2} alignItems='center' mt={2}>
            <TextField
            name="username"
            label="Username"
            onChange={handleChange} />
            <TextField
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}/>
            <Button
            variant="outlined"
            color="primary"
            onClick={login}>
                Login
            </Button>
        </Stack>
    </div>
);
}

}

export default Login;