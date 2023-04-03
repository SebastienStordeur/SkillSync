import { Box, Container, Typography } from "@mui/material";
import React from "react";

const JobCard = (props: any) => {
  console.log(props);
  const { title, salary, company } = props;
  return (
    <Container>
      <Box></Box>
      <Box flex={1} flexDirection={"row"} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2" fontSize="22px">
          {title}
        </Typography>
        <Typography variant="h3" fontSize="22px">
          {salary}€
        </Typography>
      </Box>
      <p>{company}</p>
    </Container>
  );
};

export default JobCard;
