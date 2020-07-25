import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";
import LogInApp from '../SignIn/signin';
import PopUp from '../PopUp/popup';

class SignIn extends Component {
  state = {
    usuario: "",
    senha: "",
    error: "",
    mensagem: {
      open: false,
      texto: '',
      tipo: 'sucess'
    }
  };

  onChange(event) {

    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSignIn = async e => {
    e.preventDefault();
    console.log('adriano');
    console.log(this.state);
    const { usuario, senha } = this.state;
    if (!usuario || !senha) {
      this.setState({
        mensagem: {
          open: true,
          texto: "Preencha e-mail e senha para continuar!",
          tipo: 'error'
        }
      })
    } else {
      try {
        const response = await api.post("/auth", { usuario, senha });
        login(response.data.token);
        this.props.history.push("/app");
      } catch (err) {
        this.setState({
          mensagem: {
            open: true,
            texto: "Houve um problema com o login, verifique suas credenciais.",
            tipo: 'error'
          }
        })
      }
    }
  };



  render() {
    return (
      <Fragment>
        <PopUp
          open={this.state.mensagem.open}
          handleClose={() =>
            this.setState({
              mensagem: {
                open: false
              }
            })
          }
          severity={this.state.mensagem.tipo}
        >
          {this.state.mensagem.texto}
        </PopUp>
        <LogInApp
          onChange={(e) => this.onChange(e)}
          onLogin={this.handleSignIn}
        />
      </Fragment>

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