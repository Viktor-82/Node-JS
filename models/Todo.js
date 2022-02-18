const { Schema, model } = require('mongoose') // Подключаем объект Scheme и переменную model

const schema = new Schema({ // новый объект класса Schema
    title: { // пишем схему содержимого объекта
        type: String, // тип берем из глобального объекта js - String
        required: true // флаг true говорит от том что если тайтл не передан (т.е. false) то модель не создается
    },
    completed: { // по умолчанию начатое действие не завершено. 
        type: Boolean, 
        default: false
    }
})
// экспортируем модуль первый параметр модель Todo, второй схема по которой делается эта модель
module.exports = model('Todo', schema) 