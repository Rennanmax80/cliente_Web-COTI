import React from 'react';
import { Button, Container, Divider, Grid, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import * as services from '../services/clienteServices';

class EdicaoClientes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id : '', nome : '', email : '', dataCadastro : '', dataUltimaAlteracao : '',
            mensagem: '',
            erros: { nome: [], email: [] }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNome = this.handleNome.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }

    //função para capturar os valores dos campos preenchidos
    handleNome = (e) => {
      this.setState({nome: e.target.value});
    }
    handleEmail = (e) => {
      this.setState({email: e.target.value});
    }

    //evento executado quando o componente é carregado..
    componentDidMount() {

        //capturar o id do cliente enviado pela URL..
        const url = window.location.href;
        const idCliente = url.substring(url.lastIndexOf('/') + 1);
        
        //executando uma chamada para a API para resgatar os dados do cliente
        services.getById(idCliente)
            .then(
                data => {
                    this.setState({ ...data }); //spread
                }
            )
            .catch(
                e => {
                    console.log(e);
                }
            )
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
            idCliente: this.state.id,
            nome: this.state.nome,
            email: this.state.email
        }

        //realizar a chamada para a API..
        services.put(cliente)
            .then(
                data => {

                    this.setState({
                        mensagem: data
                    });
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
                <h2>Atualização de Cliente</h2>
                <p>Utilize os campos para editar os dados do cliente.</p>
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
                                value={this.state.nome}
                                onChange={this.handleNome}
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
                                value={this.state.email}
                                onChange={this.handleEmail}
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
                                Atualizar Cliente
                            </Button>
                        </Grid>

                    </Grid>

                </form>

            </Container>
        )
    }
}

export default EdicaoClientes;



