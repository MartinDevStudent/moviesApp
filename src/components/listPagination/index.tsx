import React from "react";
import { Box, Pagination } from "@mui/material";

interface ListPaginationProps {
  pageCount: number;
  setPage: (pageNumber: number) => void;
}
export const ListPagination: React.FC<ListPaginationProps> = (props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Pagination
        count={props.pageCount}
        onChange={(e, value) => props.setPage(value)}
        size="large"
      />
    </Box>
  );
};
