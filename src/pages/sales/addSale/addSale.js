import { useState, useEffect } from 'react';
import { Box, Button, Container, Divider, MenuItem, Paper, TextField } from "@mui/material";
import { Grid } from '@mui/joy';

function AddSale() {

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState(
    [
      {
        product_id: '',
        quantity: '',
        // price: '',
      }
    ]
  );
  const [saleData, setSaleData] = useState({
    user_id: '',
    products: saleProducts,
  });
  // const [openAlert, setOpenAlert] = useState(false);
  // const [alertMessage, setAlertMessage] = useState('');
  // const [alertSeverity, setAlertSeverity] = useState('');

  // Function to fetch users and products
  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users-list-all/');
      const data = await response.json();
      setUsers(data);
        
    } catch(error) {
      console.error("Erro ao carregar clientes: ", error);
    }
  };

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      const data = await response.json();
      setProducts(data);

    } catch (error) {
      console.error("Erro ao carregar produtos: ", error);
    }
  };

  // Function to update selected Customer
  const handleUserChange = (e) => {
    setSaleData((prevSaleData) => ({
      ...prevSaleData,
      user_id: e.target.value,
    }));
  };

  // Function to update selected product data
  const handleProductChange = (index, field, value) => {
    const updatedSaleProducts = [...saleProducts];
    updatedSaleProducts[index][field] = value;

    if (field === 'product_id') {
      const selectedProduct = products.find((product) => product.id === value);
      updatedSaleProducts[index].product = selectedProduct ? selectedProduct.name : '';
      // updatedSaleProducts[index].price = selectedProduct ? selectedProduct.price : '';
    }

    setSaleProducts(updatedSaleProducts);
    setSaleData((prevSaleData) => ({
      ...prevSaleData,
      products: updatedSaleProducts,
    }))

  };

  // Function to add a new product to the form
  const addProductField = () => {
    setSaleProducts([...saleProducts, {
      product_id: '', 
      product: '', 
      quantity: '', 
      // price: '' 
    }]);
  };

  // Function to submit form
  const handleSubmit = async (e) =>  {
    e.preventDefault();

    const saleDto = {
      user_id: saleData.user_id,
      products: saleProducts.map((item) => ({
        product_id: item.product_id,
        product: item.product,
        quantity: item.quantity,
        // price: item.price,
      })),
    };

    try {
      const response = await fetch('http://localhost:8080/api/sales/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(saleDto)
      });

      if (response.ok) {
        alert('Venda cadastrada com sucesso!');
        setSaleData({
          user_id: '',
          products: [
            {
              product_id: '', 
              product: '',
              quantity: '',
              // price: '',
            },
          ]
        });

      } else {
        alert('Erro ao cadastrar a venda.');
        console.log('Erro na resposta: ', response);
      }

    } catch (error) {
      console.log("Erro ao cadastrar a venda: ", error);
    }
  };

  return(
    <Box backgroundColor="#e8eaf6" p ={8} display="flex" justifyContent="center" sx={{minHeight: '100vh'}}>
      <Container component={Paper}>
        <form onSubmit={handleSubmit}>
          <h1 align="center">Cadastrar Venda</h1>
          <Divider/>

          <h4>Id do Cliente</h4>
          <TextField
            select
            label="Id do Cliente"
            name="user_id"
            value={saleData.user_id} ////////ou {selectedUser} sem o .id
            onChange={handleUserChange}
            fullWidth
            margin="normal"
            required
          >
            { users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>
          
          {saleProducts.map((product, index) => (
            <Grid container spacing={2} key={index} alignItems="center">

              <Grid item xs={3}>
                <h4>Id do Produto</h4>
                <TextField
                  select
                  label="Produto"
                  value={product.product_id}
                  onChange={(e) => handleProductChange(index, 'product_id', e.target.value)}
                  fullWidth
                  required
                >
                  {products.map((prod) => (
                    <MenuItem key={prod.id} value={prod.id}>
                      {prod.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              {/* <Grid item xs={3}>
                <h4>Id do Cliente</h4>
                <TextField
                  label="Preço Unitário"
                  value={product.price}
                  fullWidth
                  // InputProps={{
                  //   readOnly: true,
                  // }}
                />
              </Grid> */}

              <Grid items xs={3}>
                <h4>Id do Cliente</h4>
                <TextField
                  type="number"
                  label="Quantidade"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                  fullWidth
                  required
                  // inputProps={{ min: 1}}
                />
              </Grid>
            </Grid>
          ))}

          <Button onClick={addProductField} color="primary">
            Adicionar mais produtos
          </Button>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cadastrar Venda
          </Button>

        </form>
      </Container>
    </Box>

  );
}

export default AddSale;