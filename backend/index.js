const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = 4000;

// Путь к файлу базы данных
const dbPath = path.resolve(__dirname, 'database.db');

// Создание подключения к базе данных
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to open database', err.message);
    } else {
        console.log('Connected to the database.');
    }
});

// Создание таблицы пользователей
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");

// Создание таблицы игр
db.run("CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, author TEXT, votes INTEGER, imageUrl TEXT)");

// Middleware для обработки JSON-запросов
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Разрешить доступ с любого домена
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const popularGames = [
    {
        id: 0,
        title: "Crystal Kepper",
        description: "Управляй боевым дроном, чтобы любой ценой защитить кристалл от враждебных космо-слизней.",
        author: "Lonely Baobab",
        votes: 20,
        imageUrl: "https://code.s3.yandex.net/teens/pindie-games/cristal-keeper/cover.png",
    },
    {
        id: 1,
        title: "Dangeons'n'Caves. Prologue",
        description: "Безымянный герой исследует пещеры и подземелья, чтобы найти больше информации о себе.",
        author: "F-Style",
        votes: 10,
        imageUrl: "https://code.s3.yandex.net/teens/pindie-games/dangeons-n-caves-prologue/cover.png",
    },
    {
        id: 2,
        title: "Defence of Crystal",
        description: "Защищай магический кристалл от монстров и уничтожай кладбища, чтобы спасти Землю, которую поглотил мрак.",
        author: "MastWe",
        votes: 20,
        imageUrl: "https://code.s3.yandex.net/teens/pindie-games/defence-of-crystal/cover.png",
    },
];

const newGames = [
    {
        id: 3,
        title: "Go Away",
        description: "Управляй автомобилем, избегая аварий и перепрыгивая препятствия на пути к следующему уровню.",
        author: "Mahisto",
        votes: 20,
        imageUrl: "https://code.s3.yandex.net/teens/pindie-games/go-away/cover.jpg",
    },
    {
        id: 4,
        title: "G.U.N.N.E.R.",
        description: "Продержись как можно дольше, отбиваясь от врагов, которых будет становиться всё больше.",
        author: "IDKWIAm",
        votes: 10,
        imageUrl: "https://code.s3.yandex.net/teens/pindie-games/gunner/cover.png",
    },
    {
        id: 5,
        title: "Space Terror",
        description: "Лети как можно дальше в космическом пространстве, уничтожая всё на своём пути.",
        author: "IDKWIAm",
        votes: 20,
        imageUrl: "https://code.s3.yandex.net/teens/pindie-games/space-terror/cover.png",
    },
    {
        id: 6,
        title: "Square Slayer",
        description: "Уворачивайся и отстреливайся от озлобленных квадратов и собирай жизни для перехода на следующий уровень.",
        author: "niclan",
        votes: 10,
        imageUrl: "https://code.s3.yandex.net/teens/pindie-games/square-slayer/cover.png",
    },
];

// Регистрация нового пользователя
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to register user' });
        }
        res.json({ message: 'User registered successfully' });
    });
});

// Аутентификация пользователя
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to login' });
        }
        if (!row) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.json({ message: 'Page successful' });
    });
});

// Получение списка новых игр
app.get('/api/getNewGames', (req, res) => {
    res.json(newGames);
});

// Получение списка популярных игр
app.get('/api/getPopularGames', (req, res) => {
    res.json(popularGames);
});

// Добавление новой игры в базу данных
app.post('/api/addGame', (req, res) => {
    const { title, description, author, votes, imageUrl } = req.body;
    db.run("INSERT INTO games (title, description, author, votes, imageUrl) VALUES (?, ?, ?, ?, ?)", [title, description, author, votes, imageUrl], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to add game' });
        }
        res.json({ message: 'Game added successfully' });
    });
});

// Удаление игры из базы данных по ID
app.delete('/api/deleteGame/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM games WHERE id = ?", [id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to delete game' });
        }
        res.json({ message: 'Game deleted successfully' });
    });
});

// Обновление количества голосов для игры в базе данных по ID
app.put('/api/updateVotes/:id', (req, res) => {
    const id = req.params.id;
    const { votes } = req.body;
    db.run("UPDATE games SET votes = ? WHERE id = ?", [votes, id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to update votes' });
        }
        res.json({ message: 'Votes updated successfully' });
    });
});

// Получение ID игры по названию
app.get('/api/getGameId/:title', (req, res) => {
    const title = req.params.title;
    db.get("SELECT id FROM games WHERE title = ?", [title], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to get game ID' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Game not found' });
        }
        // @ts-ignore
        res.json({ id: row.id });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
