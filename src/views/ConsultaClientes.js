import React from 'react';
import * as services from '../services/clienteServices';
import { Container, Divider, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { formatDate } from '../helpers/formatHelpers';
// import { seriesType } from 'highcharts';

class ConsultaClientes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            clientes: [] //JSON array..
        }
    }

    //função executada antes do componente ser renderizado..
    componentDidMount() {
        this.consultarClientes();
    }

    //função para realizar a consulta de clientes
    consultarClientes() {
        services.getAll()
            .then(
                data => {
                    this.setState({
                        clientes: data
                    })
                }
            )
            .catch(
                e => {
                    console.log(e);
                }
            )
    }

    //função para excluir um cliente
    excluirCliente(cliente) {
        if (window.confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`)) {
            services.remove(cliente.id).then(
                data => {
                    alert(`Cliente ${cliente.nome} excluido com sucesso`);
                    this.consultarClientes();
                }
            ).catch(
                e => {
                    alert('Erro ao excluir o cliente')
                }
            )
        }
    }

    render() {

        var self = this;

        return (
            <Container>
                <h2>Consulta de Clientes</h2>
                <p>Listagem de clientes cadastrados.</p>
                <Divider />
                <TableContainer style={{ marginTop: 20 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome do Cliente</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Cadastrado em</TableCell>
                                <TableCell>Última Alteração</TableCell>
                                <TableCell>Operações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                self.state.clientes.map(
                                    function (item, i) {
                                        return (
                                            <TableRow>
                                                <TableCell>{item.nome}</TableCell>
                                                <TableCell>{item.email}</TableCell>
                                                <TableCell>{formatDate(item.dataCadastro)}</TableCell>
                                                <TableCell>{formatDate(item.dataUltimaAlteracao)}</TableCell>
                                                <TableCell width="200">
                                                    <Button size="small"
                                                        variant="contained"
                                                        color="primary"
                                                        style={{ marginRight: 4 }}
                                                        onClick={() => window.location.href = "/admin#/edicao-cliente/" + item.id}
                                                    >
                                                        Alterar
                                                    </Button>
                                                    <Button size="small"
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={
                                                            () => self.excluirCliente(item)
                                                        }
                                                    >
                                                        Excluir
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid style={{ marginTop: 20 }}>
                    <Typography>
                        Quantidade de clientes obtidos: {self.state.clientes.length}
                    </Typography>
                </Grid>

            </Container>
        )
    }
}

export default ConsultaClientes;