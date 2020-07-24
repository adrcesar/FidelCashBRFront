import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/logo.jpeg";
import api from "../../services/api";
import { login } from "../../services/auth";

//import useStyles from "../SignIn/styles";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';



class SignIn extends Component {
  state = {
    usuario: "",
    senha: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { usuario, senha } = this.state;
    if (!usuario || !senha) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/auth", { usuario, senha });
        login(response.data.token);
        this.props.history.push("/app");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  

  render() {

    function useStyles(){
      const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
      return useStyles;
    }
    
    //var classes = useStyles();

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div >
          <Avatar >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form  noValidate>
            {this.state.error && <p>{this.state.error}</p>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Usuário"
              name="usuario"
              autoFocus
              onChange={e => this.setState({ usuario: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="current-password"
              onChange={e => this.setState({ senha: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              
              onClick={this.handleSignIn}
            >
              Sign In
            </Button>
          </form>
        </div>
        
      </Container>
    );
  }
}


/*return (
  <Container>
    <Form onSubmit={this.handleSignIn}>
      <img src={Logo} alt="Airbnb logo" />
      {this.state.error && <p>{this.state.error}</p>}
      <input
        type="text"
        placeholder="Endereço de e-mail"
        onChange={e => this.setState({ usuario: e.target.value })}
      />
      <input
        type="password"
        placeholder="Senha"
        onChange={e => this.setState({ senha: e.target.value })}
      />
      <button type="submit">Entrar</button>
      <hr />
      <Link to="/signup">Criar conta grátis</Link>
    </Form>
  </Container>
);*/


export default withRouter(SignIn);