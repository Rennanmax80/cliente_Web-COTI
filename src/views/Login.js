import React from 'react';
import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import * as services from '../services/authServices';
import * as helpers from '../helpers/authHelpers';

class Login extends React.Component {

    constructor(props) {
        super(props);

        //declarando o state do componente (dados / atributos)
        this.state = {
            mensagem: '',
            erros: { email: [], senha: [] }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault(); //anular o refresh da página

        //limpar o conteudo do state..
        this.setState({
            mensagem: '',
            erros: { email: [], senha: [] }
        });

        //capturando os dados que serão enviados para a API..
        const user = {
            email: this.handleEmail.value,
            senha: this.handleSenha.value
        }

        //executando a chamada para a API..
        services.post(user)
            .then(
                data => {
                    //gravando os dados do usuario autenticado na localstorage..
                    helpers.signIn(user.email, data.accessToken, data.dataExpiracao);
                    //redirecionar para a página admin..
                    helpers.redirectToAdminPage();
                }
            )
            .catch(
                e => {
                    switch (e.response.status) {
                        case 400: //erros de validação..
                            this.setState({
                                erros: {
                                    email: e.response.data.errors.Email || [],
                                    senha: e.response.data.errors.Senha || []
                                }
                            })
                            break;

                        case 401: //acesso não autorizado..
                            this.setState({
                                mensagem: e.response.data
                            });
                            break;

                        default:
                            console.log(e.response);
                    }
                }
            );
    }

    render() {
        return (
            <Container maxWidth="sm">
                <Grid item xs="12" style={{ marginTop: '100px' }}>
                    <Paper style={{ padding: '20px' }}>
                        <Grid style={{ margin: '20px' }}>
                            <Typography align="center" variant="h5">
                                Autenticação de Usuário
                            </Typography>
                        </Grid>
                        <form onSubmit={this.handleSubmit} className={{ margin: '20px' }} autoComplete="off">
                            <Grid style={{ margin: '20px' }}>
                                <TextField
                                    id="email"
                                    label="Email de Acesso:"
                                    type="text"
                                    fullWidth
                                    autoFocus
                                    inputRef={(input) => this.handleEmail = input}
                                />
                                <ul style={{ color: '#dc3545' }}>
                                    {
                                        this.state.erros.email.map(
                                            function (item, i) {
                                                return (
                                                    <li key={i}>{item}</li>
                                                )
                                            }
                                        )
                                    }
                                </ul>
                            </Grid>
                            <Grid style={{ margin: '20px' }}>
                                <TextField
                                    id="senha"
                                    label="Senha de Acesso:"
                                    type="password"
                                    fullWidth
                                    autoFocus
                                    inputRef={(input) => this.handleSenha = input}
                                />
                                <ul style={{ color: '#dc3545' }}>
                                    {
                                        this.state.erros.senha.map(
                                            function (item, i) {
                                                return (
                                                    <li key={i}>{item}</li>
                                                )
                                            }
                                        )
                                    }
                                </ul>
                            </Grid>
                            <Grid style={{ margin: '20px' }}>
                                <Button type="submit" variant="contained" fullWidth color="primary">
                                    Acessar Sistema
                                </Button>
                            </Grid>
                            <Grid style={{ margin: '20px' }}>
                                <Typography align="center" variant="h6" style={{ color: '#dc3545' }}>
                                    {this.state.mensagem}
                                </Typography>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Container>
        )
    }
}

export default Login;


