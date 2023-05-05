import Navbar from "./components/Navbar.tsx"
import {createTheme, ThemeProvider} from "@mui/material";

import Film from "./views/Film.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Series from "./views/Series.tsx";
import {createContext, ReactNode, useState} from "react";
import Home from "./views/Home.tsx";

interface MyContextType {
    genreId: any | null;
    setGenreId: React.Dispatch<React.SetStateAction<any | null>> | null;
}
export const MyContext = createContext<MyContextType | null>(null)
const AppContext = ({children}: {children: ReactNode}) =>{
    const [genreId, setGenreId] = useState(0)
    return (
        <MyContext.Provider value={{genreId, setGenreId}}>
            {children}
        </MyContext.Provider>
    )
}
function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#00352c',
            },
            secondary: {
                main: '#f5f5f5',
                light: '#f5f5f5'
            },
        },
    })
  return (
    <>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
               <AppContext>
                   <AppContext>
                       <Routes>
                           <Route path="/" element={<Navbar />}>
                               <Route path="/" index element={<Home />} />
                               <Route path="/films"  element={<Film />} />
                               <Route path="/series" element={<Series />} />
                           </Route>
                       </Routes>
                   </AppContext>
               </AppContext>
            </BrowserRouter>
        </ThemeProvider>
    </>
  )
}

export default App
