import {Button} from "@mui/material";

interface props{
    id: number,
    name: string,
    action: any
}
const Genre = ({ id, name, action} :props)=>{
    return(
        <>
            <Button color="secondary"  data-id={id} onClick={action}>{name}</Button>
        </>
    )
}
export default Genre