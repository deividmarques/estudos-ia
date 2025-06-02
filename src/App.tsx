import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FaleConosco from "./pages/FaleConosco";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

function App() {
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
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fale-conosco" element={<FaleConosco />} />
      </Routes>
    </>
  );
}

export default App;