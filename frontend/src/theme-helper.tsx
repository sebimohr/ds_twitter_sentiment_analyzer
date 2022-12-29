import { ChildrenProps } from "./Infrastructure/children-props";
import { createTheme, ThemeProvider } from "@mui/material";

const lightTheme = createTheme({
    palette: {
        mode: "light"
    }
})

/*const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
})*/

export default function ThemeHelper(props: ChildrenProps) {
    return (
        <ThemeProvider theme={lightTheme}>
            {props.children}
        </ThemeProvider>
    )
}