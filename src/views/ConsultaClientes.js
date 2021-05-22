import React from 'react';
import * as services from '../services/clienteServices';
import { Container, Divider, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';

class ConsultaClientes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            clientes: [] //JSON array..
        }
    }

    //função executada antes do componente ser renderizado..
    componentDidMount() {
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
                                                <TableCell>{item.dataCadastro}</TableCell>
                                                <TableCell>{item.dataUltimaAlteracao}</TableCell>
                                                <TableCell width="200">
                                                    <Button size="small"
                                                        variant="contained"
                                                        color="primary"
                                                        style={{ marginRight: 4 }}
                                                    >
                                                        Alterar
                                                    </Button>
                                                    <Button size="small"
                                                        variant="contained"
                                                        color="secondary"
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


