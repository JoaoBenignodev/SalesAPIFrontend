import { Box, Button, TextField } from "@mui/material";
import React from "react";
import TextFieldNumber from "../../../components/TextFieldNumber";

function UpdateProductForm({ product, onSubmit }) {
    return (
        <Box padding={5}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    onSubmit(product.user_id, product.id, formData);
                }}
            >
                <h2 align="center">Editar Produto</h2>
                <TextField
                    label="Produto"
                    name="product"
                    defaultValue={product.name}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Quantidade"
                    name="quantity"
                    defaultValue={product.quantity}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Preço"
                    name="price"
                    defaultValue={product.price}
                    fullWidth
                    slotProps={{
                        input: {
                            inputComponent: TextFieldNumber,
                        },
                    }}
                    margin="normal"
                />

                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        onClick={() => {}}
                        sx={{ backgroundColor: "#3949ab" }}
                    >
                        Atualizar Produto
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default UpdateProductForm;
