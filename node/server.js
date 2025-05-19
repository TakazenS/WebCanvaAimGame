const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();

// Initialisation du serveur Node.js et récupération du front-end
const app = express();
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(express.json());

// Middleware pour traiter les données JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de donnée
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Fonction pour maintenir la connexion active
function keepAlive() {
    db.query('SELECT 1', (err) => {
        if (err) {
            console.error('Erreur de keep-alive :', err);
        }
    });
}

// Exécuter keepAlive toutes les 10 minutes
setInterval(keepAlive, 600000);



// Test de la connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données MySQL :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL !');
});

// Logs prévenant le fonctionnement du serveur sur son port
app.listen(3000, () => {
    console.log('Node.js API écoute sur le port 3000');
});