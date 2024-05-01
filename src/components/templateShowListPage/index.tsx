import React from "react";
import Header from "../headerShowList";
import Grid from "@mui/material/Grid";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

interface ShowListPageTemplateProps {
  title: string;
  children: React.ReactNode;
}

const ShowListPageTemplate: React.FC<ShowListPageTemplateProps> = (props) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={props.title} />
      </Grid>
      <Grid item container spacing={5}>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default ShowListPageTemplate;
