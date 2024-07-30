import { connection, authenticate } from "./config/database.js";
authenticate(connection);

import { aluno } from "./models/aluno.js";
import { curso } from "./models/curso.js";
import { endereco } from "./models/endereco.js";

authenticate(connection).then(() => {

    connection.sync();
  });