import React, { useContext, useState } from "react"; // replace existing react import
import { LoginRequest } from "../types/interfaces";
import ShowHeader from "../components/showHeader";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "../api/aws-api";
import { UserContext } from "../contexts/userContext";

const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: 2,
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (request: LoginRequest) => {
      return getToken(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });

  const defaultValues = {
    defaultValues: {
      username: "",
      password: "",
    },
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginRequest>(defaultValues);

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/movies");
  };

  const onSubmit: SubmitHandler<LoginRequest> = (data) => {
    mutation.mutate(data);
    console.log(data.username);
    context.addUsername(data.username);
    setOpen(true);
  };

  return (
    <>
      <ShowHeader title={"Login"} homepage={"/"} id={1} />
      <Box component="div" sx={styles.root}>
        <Snackbar
          sx={styles.snack}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={handleSnackClose}
        >
          <Alert severity="success" variant="filled" onClose={handleSnackClose}>
            <Typography variant="h4">You're now logged in!</Typography>
          </Alert>
        </Snackbar>
        <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box component="div" sx={styles.root}>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is required" }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{ width: "40ch" }}
                  variant="outlined"
                  margin="normal"
                  required
                  onChange={onChange}
                  value={value}
                  id="username"
                  label="Username"
                  autoFocus
                />
              )}
            />
            {errors.username && (
              <Typography variant="h6" component="p">
                {errors.username.message}
              </Typography>
            )}
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{ width: "40ch" }}
                  variant="outlined"
                  margin="normal"
                  required
                  value={value}
                  onChange={onChange}
                  label="Password"
                  id="password"
                  type="password"
                />
              )}
            />
            {errors.password && (
              <Typography variant="h6" component="p">
                {errors.password.message}
              </Typography>
            )}
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={styles.submit}
              >
                Submit
              </Button>
              <Button
                type="reset"
                variant="contained"
                color="secondary"
                sx={styles.submit}
                onClick={() => {
                  reset({
                    username: "",
                    password: "",
                  });
                }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
      <p>username: "userA"</p>
      <p>password: "passwA!1"</p>
    </>
  );
};

export default LoginPage;
