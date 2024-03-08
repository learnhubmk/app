import Button from "@mui/material/Button";

interface ButtonProps {
  variantType?: "text" | "outlined"; // Add the variantType as one of these options
  btnText: string;
  btnColor?: string;
  textColor?: string;
}

const ButtonComponent = (props: ButtonProps) => {
  const { btnText, btnColor, textColor, variantType } = props;
  return (
    <Button
      variant={variantType || "contained"} // Set default to outlined (default variant) if variantType is not provided
      sx={{
        backgroundColor: btnColor || "blue", // Use color or blue (default color) if color is not provided
        color: textColor || "black", // Use textColor or black (default color) if textColor is not provided
      }}>
      {btnText}
    </Button>
  );
};

export default ButtonComponent;
