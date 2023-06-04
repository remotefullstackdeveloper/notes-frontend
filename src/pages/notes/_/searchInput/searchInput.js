import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../../../store/reducers/notes";

export function SearchInput() {
    const [searchText, setSearchText] = React.useState("");
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const handleClickSearch = () => {
        if (searchText.trim()) {
            dispatch(getNotes({ token, filters: `?title=${searchText}` }))
        } else {
            dispatch(getNotes({ token }))
        }
    }
    return (
        <Paper
            sx={{
                mr: 2,
                p: "0px 2px",
                border: "1px solid #000",
                display: "flex",
                alignItems: "center",
                width: 400,
                height: '40px'
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1, height: '40px' }}
                placeholder="Search notes by title"
                inputProps={{ "aria-label": "search google maps" }}
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={() => handleClickSearch()}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
