import * as React from "react";
import Pagination from "@mui/material/Pagination";

import "./table.css";

import { styled } from "@mui/material";
import InputMui from "../inputMui/InputMui";
import IconButtonMui from "../IconButtonMui/Button";

import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { FaTrash, FaPen, FaFileExcel, FaFilePdf } from "react-icons/fa";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const StyledButton = styled(Button)({
  background: "#fff",
  color: "#00c9d2",
  border: "1px solid #00c9d2",
});

const SectionSearch = () => {
  return (
    <section className="sectionMercaderia-container">
      <div className="inputSearchTableMercaderia">
        <div className="searchCodProducto">
          <InputMui title="Buscar Cod Producto" />
          <StyledButton variant="text">Buscar</StyledButton>
        </div>
        <div className="searchCodProducto">
          <IconButtonMui
            title={"export excel"}
            callback={() => {}}
            classf="excel"
          >
            <FaFileExcel />
          </IconButtonMui>
          <IconButtonMui title={"export pdf"} callback={() => {}} classf="pdf">
            <FaFilePdf />
          </IconButtonMui>
        </div>
      </div>
    </section>
  );
};

const InformacionItem = ({ api, index }) => {
  return (
    <div>
      {api
        .filter((elem) => elem.id == index)
        .map((elem) => {
          return (
            <Card sx={{ marginLeft: 1 }}>
              <CardContent>
                <div key={elem.id}>
                  <h2>{elem.nombre}</h2>
                  <p>{elem.descripcion}</p>
                </div>
              </CardContent>
              <CardActions>
                <IconButtonMui
                  title={"eliminar"}
                  callback={() => {}}
                  classf={"pdf"}
                  size="small"
                >
                  <FaTrash />
                </IconButtonMui>
                <IconButtonMui
                  title={"actualizar"}
                  callback={() => {}}
                  classf={"update"}
                  size="small"
                >
                  <FaPen />
                </IconButtonMui>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
};

const InformacionItemMercaderia = ({ api, index }) => {
  return (
    <div>
      {api
        .filter((elem) => elem.id == index)
        .map((elem) => {
          return (
            <Card sx={{ marginLeft: 1 }}>
              <CardContent>
                <div key={elem.id}>
                  <h2>{elem.nombre}</h2>
                  <p><b>Descripcion</b>: {elem.descripcion}</p>
                  <p><b>Fecha</b>: {elem.fecha}</p>
                  <p><b>Cantidad</b>: {elem.stock}</p>
                  <p><b>Proveedor</b>: {elem.proveedor}</p>
                  
                </div>
              </CardContent>
              <CardActions>
                <IconButtonMui
                  title={"eliminar"}
                  callback={() => {}}
                  classf={"pdf"}
                  size="small"
                >
                  <FaTrash />
                </IconButtonMui>
                <IconButtonMui
                  title={"actualizar"}
                  callback={() => {}}
                  classf={"update"}
                  size="small"
                >
                  <FaPen />
                </IconButtonMui>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
};

export function TableInventario({ apiUrl }) {
  const LIMIT = 5;
  const [api, setApi] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(LIMIT);

  const [index, setIndex] = React.useState(0);

  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    fetch(apiUrl)
      .then((result) => result.json())
      .then((result) => setApi(result))
      .catch((error) => console.error(error));
  }, []);

  React.useEffect(() => {
    setStart(end - LIMIT);
  });

  return (
    <div className="divTable">
      <div>
        <table className="tableMercaderia">
          <thead>
            <tr>
              <th>id</th>
              <th>nombre</th>
              <th>descripcion</th>
              <th>Stock Actual</th>
            </tr>
          </thead>
          <tbody className="bodyTableMercaderia">
            {api.slice(start, end).map((elem) => {
              return (
                <tr key={elem.id} onClick={() => setIndex(elem.id)}>
                  <td>{elem.id}</td>
                  <td>{elem.nombre}</td>
                  <td>{elem.descripcion}</td>
                  <td>0</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          count={Math.ceil(api.length / LIMIT)}
          onChange={(evt) => {
            setPage(parseInt(evt.target.innerText));

            if (parseInt(evt.target.innerText) > page) {
              setEnd(LIMIT * parseInt(evt.target.innerText));
            } else if (parseInt(evt.target.innerText) < page) {
              setEnd(LIMIT * parseInt(evt.target.innerText));
            }
          }}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <InformacionItem api={api} index={index} />
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}


export function TableMercaderia({ apiUrl }) {
  const LIMIT = 10;
  const [api, setApi] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(LIMIT);

  const [index, setIndex] = React.useState(0);

  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    fetch(apiUrl)
      .then((result) => result.json())
      .then((result) => setApi(result))
      .catch((error) => console.error(error));
  }, []);

  React.useEffect(() => {
    setStart(end - LIMIT);
  });

  return (
    <div className="divTable">
      <div>
        <table className="tableMercaderia">
          <thead>
            <tr>
              <th>nombre</th>
              <th>descripcion</th>
              <th>cantidad</th>
              <th>fecha</th>
              <th>proveedor</th>
            </tr>
          </thead>
          <tbody className="bodyTableMercaderia">
            {api.slice(start, end).map((elem) => {
              return (
                <tr key={elem.id} onClick={() => setIndex(elem.id)}>
                  <td>{elem.nombre}</td>
                  <td>{elem.descripcion}</td>
                  <td>{elem.stock}</td>
                  <td>{elem.fecha}</td>
                  <td>{elem.proveedor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          count={Math.ceil(api.length / LIMIT)}
          onChange={(evt) => {
            setPage(parseInt(evt.target.innerText));

            if (parseInt(evt.target.innerText) > page) {
              setEnd(LIMIT * parseInt(evt.target.innerText));
            } else if (parseInt(evt.target.innerText) < page) {
              setEnd(LIMIT * parseInt(evt.target.innerText));
            }
          }}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <InformacionItemMercaderia api={api} index={index} />
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
