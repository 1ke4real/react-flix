import {AppBar, Box, IconButton, Toolbar, Button} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import {Outlet, Link, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Genre from "./Genre.tsx";
import {MyContext} from "../App.tsx";

type genre = {
    id: number,
    name: string
}
const Navbar = () =>{
    const location = useLocation()
    const [genres, setGenres] = useState([])
    const {genreId, setGenreId} = useContext(MyContext)
    let response
    useEffect(()=>{
        const fetchGenre = async ()=>  {
           if (location.pathname === '/films'){
                response =  await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=d598beac85ec8a6c9fa830227429ff7f&language=en-FR`)
           }else{
                response =  await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=d598beac85ec8a6c9fa830227429ff7f&language=en-FR`)
           }
           const data = response.data.genres
            setGenres(data)
        }
        fetchGenre()
    }, [location.pathname])
    const handleMenu = ()=>{
        document.querySelector('.menu-tel').classList.toggle('hidden')
    }
    const handleStorage = (e: any)=>{
        setGenreId(e.target.getAttribute('data-id'))
    }
    const handleClean = ()=>{
        setGenreId(0)
    }
    return (
        <Box sx={{flexGrow:1}}>
            <AppBar position="sticky" >
                <Toolbar>
                    <IconButton size="large" edge="start" color="secondary" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenu}>
                        <MenuIcon/>
                    </IconButton>
                    <img src="" alt=""/>
                    <div className="mx-auto">
                        <Button color="secondary" onClick={handleClean}><Link to={"/"}>Home</Link></Button>
                        <Button color="secondary" onClick={handleClean}><Link to={"/films"}>Film</Link></Button>
                        <Button color="secondary" onClick={handleClean}><Link to={"/series"}>Séries</Link></Button>
                    </div>
                </Toolbar>
                    <div className="hidden menu-tel w-full">
                        <ul className="flex justify-center">
                            {genres.map((genre:genre)=>(
                               <li key={genre.id}> <Genre {...genre} action={handleStorage}/></li>
                            ))}
                        </ul>
                    </div>
            </AppBar>
            <Outlet/>
        </Box>

    )
}

export default Navbar