import { NumericFormat } from "react-number-format";
import { forwardRef } from "react";

const TextFieldNumber = forwardRef(function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            valueIsNumericString
            thousandSeparator="."
            decimalSeparator=","
        />
    );
});

export default TextFieldNumber;
