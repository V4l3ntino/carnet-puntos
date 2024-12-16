import { get0neUser } from "@/api/userCrud";
import { Box, FormControl, Input, InputLabel } from "@mui/material";

interface Params {
  params: {
    id: string;
  };
}

const UserDetail: React.FC<Params> = async({params}) => {
    const { id } = params;

    const USER = await get0neUser(id)
    return ( 
        <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1 } }}
        noValidate
        autoComplete="off"
        >
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple">Username</InputLabel>
                <Input id="component-simple" defaultValue={USER?.username} readOnly/>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple">FullName</InputLabel>
                <Input id="component-simple" defaultValue={USER?.profile?.fullName} readOnly/>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple">Email</InputLabel>
                <Input id="component-simple" defaultValue={USER?.profile?.email} readOnly/>
            </FormControl>
        </Box>
     );
}
 
export default UserDetail;