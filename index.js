// подключаем модуль express
const express = require('express')
// подключаем пакет mongoose для работы с базой данных mongoDb
const mongoose = require('mongoose')
// чтобы прописывать пути вызываем объект path из стандартной библиотеки path
const path = require('path')
// подключаем handlebars в переменную
const exphbs = require('express-handlebars')
// подключаем в переменную роутер из файла todos.js
const todoRoutes = require('./routes/todos')

// Создаем переменную порт, причем если порт существует то берем его из процесса, если нет то используем прописанный в поле "или"
const PORT = process.env.PORT || 3000

// создаем объект приложения с помощью вызова функции express
const app = express()
// настраиваем handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
// меняем название расширения по умолчанию чтобы не писать handlebars
    extname: 'hbs' 
})

// регистрируем движок приложения и даем ему любое произвольное название и как значение передаем движок hbs.engine
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
// после чего создаем папку views и в ней файл index.hbs
app.set('views', 'views') 
// код который позволяет express парсить body и вытаскивать из него значение прописанное пользователем в input при отправке формы
app.use(express.urlencoded({ extended: true }))
// для подключения файла css указываем путь до его расположения
app.use(express.static(path.join(__dirname, 'public'))) // теперь express знает что из статической папки public можно брать файлы стилей
// регистрируем подключенный в переменную роутер
app.use(todoRoutes)

// пишем асинхронную функцию для обращения к базе данных mongoDb
// 1 подключается база
async function start() { 
    try {
        await mongoose.connect("mongodb+srv://Alfa:tu90EsVYiYSFCVai@cluster0.l343y.mongodb.net/myTodos", 
        {
            useNewUrlParser: true,
            useFindAndModify: false
        })
// 2 запускаем сервер с помощью вызова функции listen()
    app.listen(PORT, () => {
    console.log('Server has been started...')
})
    } catch (e) {
        console.log(e)
    }
}

// вызываем функцию start()
start()
