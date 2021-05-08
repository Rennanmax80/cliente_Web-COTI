import React from 'react'
import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'

 class Login extends React.Component {
  render() {
    return (
      
      <Container maxWidth="sm">
        <Grid item xs="12" style={{marginTop: '100px'}}>
          <Paper style={{padding: '20px'}}>
            <Grid style={{margin: '20px'}}>
              <Typography align="center" variant="h5">
                Autenticação de usuário
              </Typography>
              <form className={{margin: '20px'}}>
                <Grid style={{margin: '20px'}}>
                  <TextField
                    id="email"
                    label="Email de acesso:"
                    type="email"
                    fullWidth
                    autoFocus
                    required
                  />
                </Grid>
                <Grid style={{margin: '20px'}}>
                  <TextField
                    id="senha"
                    label="Senha de acesso:"
                    type="password"
                    fullWidth
                    autoFocus
                    required
                  />
                </Grid>
                <Grid style={{margin: '20px'}}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="outlined"
                  >
                    Acessar Sistema
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Container>
      
    )
  }
}

export default Login
