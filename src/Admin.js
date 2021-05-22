import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, Container, Grid, IconButton, Paper, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu, ChevronLeft, PermContactCalendar, Dashboard, People, ExitToApp } from '@material-ui/icons';
import { Route, HashRouter, NavLink, Redirect } from 'react-router-dom';

import * as helpers from './helpers/authHelpers';

import DashboardClientes from './views/DashboardClientes';
import CadastroClientes from './views/CadastroClientes';
import ConsultaClientes from './views/ConsultaClientes';
import EdicaoClientes from './views/EdicaoClientes';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Admin() {

    const classes = useStyles();

    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    //função para realizar o logout do usuário..
    const logout = () => {
        if (window.confirm('Deseja realmente sair do sistema?')) {
            helpers.signOut(); //destruir o token do usuário
            helpers.redirectToLoginPage(); //redirecionamento
        }
    }

    return helpers.isAuthenticated() ? (
        <HashRouter>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <Menu />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Controle de Clientes
                        </Typography>
                        <IconButton color="inherit" onClick={logout}>
                            <ExitToApp />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeft />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button component={NavLink} to="/">
                            <ListItemIcon>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard Principal" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/cadastro-clientes">
                            <ListItemIcon>
                                <People />
                            </ListItemIcon>
                            <ListItemText primary="Cadastrar Clientes" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/consulta-clientes">
                            <ListItemIcon>
                                <PermContactCalendar />
                            </ListItemIcon>
                            <ListItemText primary="Consultar Clientes" />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper style={{ padding: 20 }}>
                                    <Route path="/" exact={true} component={DashboardClientes} />
                                    <Route path="/cadastro-clientes" component={CadastroClientes} />
                                    <Route path="/consulta-clientes" component={ConsultaClientes} />
                                    <Route path="/edicao-cliente" component={EdicaoClientes} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        </HashRouter>
    ) : (
        <Redirect to={{
            pathname: helpers.redirectToLoginPage()
        }} />
    );
}


