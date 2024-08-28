import mysql from "mysql2";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { getAllPokoje, updatePokoj } from "./routes/getPokoje.js";
import { login } from "./routes/login.js";
import { logout } from "./routes/logout.js";
import { addPracownik, getAllPracownicy } from "./routes/getAllPracownicy.js";
import {
   addRezerwacje,
   editRezerwacja,
   getRezerwacje,
   usunRezerwacje,
} from "./routes/getRezerwacje.js";
import { getPlatnosci, updatePlatnosci } from "./routes/platnosci.js";

export const BASE_URL = "/api/v1";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
   cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
   })
);
app.use(
   session({
      secret: "B4B9AF6D3A474E2EFC7A7E4D6E8C4",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
   })
);

app.listen(port, () => {
   console.log(`Server running at http://127.0.0.1:${port}/`);
});

app.get(`${BASE_URL}/pokoje`, getAllPokoje);
app.get(`${BASE_URL}/pracownicy`, getAllPracownicy);
app.put(`${BASE_URL}/pokoje/:id`, updatePokoj);
app.post(`${BASE_URL}/login`, login);
app.post(`${BASE_URL}/logout`, logout);
app.post(`${BASE_URL}/pracownicy`, addPracownik);
app.get(`${BASE_URL}/rezerwacje`, getRezerwacje);
app.delete(`${BASE_URL}/rezerwacje/usun`, usunRezerwacje);
app.post(`${BASE_URL}/nowa-rezerwacja`, addRezerwacje);
app.put(`${BASE_URL}/edytuj-rezerwacje/:id`, editRezerwacja);
app.get(`${BASE_URL}/platnosci`, getPlatnosci);
app.put(`${BASE_URL}/edytuj-platnosc/:id`, updatePlatnosci);
export default app;
