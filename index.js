import { connection, authenticate } from "./config/database.js";

import {aluno} from "./models/aluno.js";
import {endereco} from "./models/endereco.js";
import {curso} from "./models/curso.js";

authenticate(connection).then (() =>{
connection.sync();
});