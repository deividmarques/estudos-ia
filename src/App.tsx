import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FaleConosco from "./pages/FaleConosco";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Page from "./components/Page";
import NovoEndereco from "./pages/NovoEndereco";

interface AppProps {
  toggleMode: () => void;
  mode: 'light' | 'dark';
}

function App({ toggleMode, mode }: AppProps) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/fale-conosco">
            Fale Conosco
          </Button>
          <Button color="inherit" component={RouterLink} to="/novo-endereco">
            Novo Endereço
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={
          <Page title="Home | Estudos IA">
            <Home toggleMode={toggleMode} mode={mode} />
          </Page>
        } />
        <Route path="/fale-conosco" element={
          <Page title="Fale Conosco | Estudos IA">
            <FaleConosco />
          </Page>
        } />
        <Route path="/novo-endereco" element={
          <Page title="Novo Endereço | Estudos IA">
            <NovoEndereco />
          </Page>
        } />
      </Routes>
    </>
  );
}

export default App;