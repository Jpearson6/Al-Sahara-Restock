import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import AspectRatio from "@mui/joy/AspectRatio";
import { markItemAsDelivered, markItemAsOrdered } from "../firebase/utils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ItemList = ({ rows, setRows, role, setSelectedImage, listType }) => {
  const handleCheckboxOrdered = (index) => {
    if (role === "employee") return;
    markItemAsOrdered(rows[index].id);
    const newRows = [...rows.slice(0, index), ...rows.slice(index + 1)];
    setRows(newRows);
  };

  const handleCheckboxDelivered = (index) => {
    markItemAsDelivered(rows[index].id);
    const newRows = [...rows.slice(0, index), ...rows.slice(index + 1)];
    setRows(newRows);
  };

  return (
    <>
      <Box maxHeight={"80vh"} overflow={"scroll"} width={'100vw'} sx={{pr: 0}}>
        <TableContainer>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography fontFamily={"Roboto"} textAlign={"center"}>
                    Items
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontFamily={"Roboto"}>{listType}</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row, index) => (
                  <TableRow key={row.id} sx={{ height: "10%" }}>
                    <TableCell>
                      {row.imageRef.length > 0 && (
                        <>
                          <Card
                            onClick={() => setSelectedImage(row.imageRef)}
                            orientation="horizontal"
                            size="sm"
                            key={row.item}
                            variant="outlined"
                          >
                            <AspectRatio
                              key={row.item}
                              ratio="1"
                              sx={{ minWidth: 60 }}
                            >
                              <img
                                key={row.item}
                                src={row.imageRef[0]}
                                alt="Image"
                                style={{ maxWidth: "100%" }}
                              />
                            </AspectRatio>
                          </Card>
                          {row.imageRef.length > 1 && (
                            <Typography textAlign={"center"}>
                              <Link
                                onClick={() => setSelectedImage(row.imageRef)}
                              >
                                more
                              </Link>
                            </Typography>
                          )}
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography fontFamily={"Roboto"}>{row.item}</Typography>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={listType === 'Ordered' ? row.ordered : row.delivered}
                        onChange={listType === 'Ordered' ? () => handleCheckboxOrdered(index) : () => handleCheckboxDelivered(index)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

ItemList.propTypes = {
    rows: PropTypes.array,
    setRows: PropTypes.func,
    role: PropTypes.string,
    setSelectedImage: PropTypes.func,
    listType: PropTypes.string
  };

export default ItemList;

