import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setproducts] = useState([
    {
      id: 1,
      name: "Product 1",
      quantity: 10,
      price: 99.99,
      is_active: true,
      user_id: 101,
    },
  ]);

  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:8080/api/products/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setproducts(response.json());
        return;
      }

      setproducts([]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const productstest = [
    {
      id: 1,
      name: "Product 1",
      quantity: 10,
      price: 99.99,
      is_active: true,
      user_id: 101,
    },
    {
      id: 2,
      name: "Product 2",
      quantity: 5,
      price: 49.99,
      is_active: false,
      user_id: 102,
    },
    {
      id: 3,
      name: "Product 3",
      quantity: 20,
      price: 19.99,
      is_active: true,
      user_id: 103,
    },
  ];

  return (
    <Box
      bgcolor="#e8eaf6"
      p={8}
      display="flex"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <TableContainer component={Paper}>
        <h1 align="center">Produtos</h1>
        <Divider />
        <Table arial-label="user table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Produto
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} font align="right">
                Quantidade
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} font align="right">
                Preço
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} font align="center">
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} font align="center" />
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length > 0 ? (
              products.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  // style={{backgroundColor: index % 2 == 0 ? 'white' : 'whitesmoke'}} -> users.map((user, index)
                  //onClick={() => alert(`cliente escolhido: ${user.name}`)}
                >
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="right">{user.quantity}</TableCell>
                  <TableCell align="right">{user.price}</TableCell>
                  <TableCell align="center" style={{ alignContent: "left" }}>
                    <Box display="flex" justifyContent="center" width="full">
                      {user.is_active ? (
                        <Box
                          sx={{ minWidth: 60 }}
                          px={2}
                          bgcolor="#7986cb"
                          borderRadius="16px"
                          color="#FFF"
                        >
                          Ativo
                        </Box>
                      ) : (
                        <Box
                          sx={{ minWidth: 60 }}
                          px={2}
                          bgcolor="#c5cae9"
                          borderRadius="16px"
                          color="#FFF"
                        >
                          Não ativo
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {/* <TableCell align="center" type='button' value='Atualizar'></TableCell> */}
                    <IconButton aria-label="edit" onClick={() => {}}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <>
                <TableCell size="small">Nenhum produto encontrado</TableCell>
                <TableCell size="small" />
                <TableCell size="small" />
                <TableCell size="small" />
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Products;
