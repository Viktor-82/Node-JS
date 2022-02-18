// подключаем в файл роутер из библиотеки express 
const { Router } = require('express')
// подключаем модель Todo в роутер чтобы ей можно было пользоваться
const Todo = require('../models/Todo')
// создаем переменную router с функцией Router()
const router = Router()

// в роутере вызываем метод get для получения запросов
router.get('/', async (req, res) => { // делаем роутер асинхронным для работы с моделью Todo и запросов к базе данных
    const todos = await Todo.find({}) // получаем все Todo которые есть

    res.render('index', {
        title: 'Todos list', // это для отображения надписи вкладки браузера
        isIndex: true, // флаг для подсветки активной вкладки
        todos // передаем массив Todos как параметр на главную страницу
    }) // возвращаем пользователю отрендеренную страницу index
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true // такой же флаг для вкладки create
    })
})

// добавляем в роутер форму из create.hbs и метод Post чтобы можно было обрабатывать запросы
router.post('/create', async (req, res) => {
    const todo = new Todo({ // создаем новый объект класса Todo
        title: req.body.title // в конструктор добавляем значение поля input title файла create.hbs
    }) 
    
    await todo.save()
    res.redirect('/') // из ответа делаем перенаправление полученных данных на главную страницу
})

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id) 

    todo.completed = !!req.body.completed // !! преобразование строки в булево значение
    await todo.save() 

    res.redirect('/') // обновляем главную страницу
})
// экспортируем модуль роутер наружу из файла 
module.exports = router