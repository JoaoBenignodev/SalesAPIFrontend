import { useState, useEffect } from 'react'; 
import { Alert, Box, Divider, Paper, Snackbar, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";


function SaleListAll() {

  //useState hook to store the list of Sales
  const [sales, setSales] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  //useEffect hook to fetch sales when the component loads
  useEffect(() => {
    fetchSales();
  }, []);

  // Function to fetch all sales from the frontend
  async function fetchSales() {
    try {
      //const response = await fetch();
      const response = await fetch('htttp://localhost:8080/api/sales/', 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

      const data = await response.json();
      if (response.ok) {
        setSales(data); //Setting the fetched sales data
      } else {
        console.error('Failed to fetch sales', data);
        setSnackbarMessage('Erro ao buscar as vendas');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }

    } catch (error) {
      console.log('Error fetching sales:', error);
      setSnackbarMessage('Erro ao buscar as vendas');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }

  // Close snackbar function
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  return (
    <Box bgColor="#e8eaf6" p={8} display="flex" justifyContent="center" sx={{minHeigth: '100vh'}}>
      <TableContainer component={Paper}>
        <h1 align="center">Vendas</h1>
        <Divider/>
        <Table arial-label="sale table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Quantidade</TableCell>
              <TableCell align="left">Preço</TableCell>
              <TableCell align="left">ID do Cliente</TableCell>
              <TableCell align="left">ID do Produto</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            { sales.map((sale) => (
              <TableRow key={sale.id} hover sx={{'&:hover': {cursos: 'pointer',}, 
              }}>
                <TableCell component="th" scope="row">{sale.id}</TableCell>
                <TableCell align="left">{sale.quantity}</TableCell>
                <TableCell align="left">{sale.price}</TableCell>
                <TableCell align="left">{sale.user.user_id}</TableCell>
                <TableCell align="left">{sale.product.product_id}</TableCell>
              </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Box>
  )

}

export default SaleListAll; 