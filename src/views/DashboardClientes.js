import React from 'react';
import * as services from '../services/clienteServices';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class DashboardClientes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            historicoClientes: [] //array vazio..
        }
    }

    componentDidMount() {
        services.getHistorico()
            .then(
                data => {
                    this.setState({
                        historicoClientes: data
                    });
                }
            )
            .catch(
                e => {
                    console.log(e);
                }
            )
    }

    render() {

        var array = [];
        var names = [];

        var historico = this.state.historicoClientes;

        for (var i = 0; i < historico.length; i++) {
            array.push([historico[i].name, historico[i].data]);
            names.push([historico[i].name]);
        }

        const grafico = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Histórico de cadastro de clientes por data'
            },
            subtitle: {
                text: 'Resumo de clientes cadastrados'
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            xAxis: {
                categories: names,
                title : {
                    text : 'Datas de cadastro de clientes'
                }
            },
            yAxis: {
                title : {
                    text: 'Total de clientes cadastrados'
                }
            },
            tooltip : {
                headerFormat : '<span>{point.key}</span><br/>',
                pointFormat : '<tr><td>Clientes cadastrados: <strong>{point.y}</strong></td></tr>', 
                footerFormat : '</table>',
                shared : true,
                useHTML : true
            },
            series: [
                {
                    data: array,
                    type: undefined
                }
            ]
        }

        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={grafico}
            />
        )
    }
}

export default DashboardClientes;


