import { createContext, useState } from "react";
import { ThemeContextType,Props} from "../types";

const ThemeContext=createContext<ThemeContextType>({
    count:0,
    setCount: () => {},
});

const ThemeProvider:React.FC<Props> = ({children}) => {
    const [count,setCount]=useState<number>(1);
  return (
    <ThemeContext.Provider value={{count,setCount}}>
        {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider,ThemeContext};
