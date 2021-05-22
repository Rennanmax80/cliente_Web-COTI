import React from 'react';
import { Button, Container, Divider, Grid, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import * as services from '../services/clienteServices';

class CadastroClientes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mensagem: '',
            erros: { nome: [], email: [] }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        //limpar o conteudo do state..
        this.setState({
            mensagem: '',
            erros: { nome: [], email: [] }
        });

        //dados que serão enviados para a API..
        const cliente = {
            nome: this.handleNome.value,
            email: this.handleEmail.value
        }

        //realizar a chamada para a API..
        services.post(cliente)
            .then(
                data => {

                    this.setState({
                        mensagem: data
                    });

                    this.handleNome.value = "";
                    this.handleEmail.value = "";

                    this.handleNome.focus();
                }
            )
            .catch(
                e => {
                    switch (e.response.status) {
                        case 400: //erros de validação
                            this.setState({
                                erros: {
                                    nome: e.response.data.errors.Nome || [],
                                    email: e.response.data.errors.Email || []
                                }
                            });
                            break;

                        default:
                            console.log(e.response);
                            break;
                    }
                }
            )
    }

    render() {
        return (
            <Container>
                <h2>Cadastro de Clientes</h2>
                <p>Preencha os campos para inserir um cliente.</p>
                <Divider />

                <Grid style={{ marginTop: 20 }}>
                    {
                        this.state.mensagem.length > 0 ? (
                            <Alert severity="success">{this.state.mensagem}</Alert>
                        ) : (<div></div>)
                    }
                </Grid>

                <form onSubmit={this.handleSubmit}>

                    <Grid container style={{ marginTop: 20 }}>

                        <Grid xs={6} md={6} lg={6} style={{ padding: 10 }}>
                            <TextField
                                id="nome"
                                label="Nome do Cliente:"
                                type="text"
                                fullWidth
                                autoFocus
                                variant="outlined"
                                inputRef={(input) => this.handleNome = input}
                            />
                            <ul style={{ color: '#dc3545' }}>
                                {
                                    this.state.erros.nome.map(
                                        function (item, i) {
                                            return (
                                                <li key={i}>{item}</li>
                                            )
                                        }
                                    )
                                }
                            </ul>
                        </Grid>

                        <Grid xs={6} md={6} lg={6} style={{ padding: 10 }}>
                            <TextField
                                id="email"
                                label="Endereço de Email:"
                                type="text"
                                fullWidth
                                variant="outlined"
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

                        <Grid xs={6} md={6} lg={6} style={{ padding: 10 }}>
                            <Button type="submit" variant="contained" color="primary">
                                Cadastrar Cliente
                            </Button>
                        </Grid>

                    </Grid>

                </form>

            </Container>
        )
    }
}

export default CadastroClientes;



