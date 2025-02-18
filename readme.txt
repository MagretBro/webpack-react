команды по порядку для
https://www.youtube.com/watch?v=acAH2_YT6bs

Установка webpack
npm i -D webpack webpack-cli@5.1.4 --webpack-dev-server@4.15.1

команда старта проект а
 npm run build


 для отображения выполнения кода, можно подключить Code Runner:
1 - Перейдите в Extensions (нажмите Ctrl + Shift + X).
2 - Найдите "Code Runner" и установите его.
3 - После установки вы сможете запустить код, нажав Ctrl + Alt + N (или через правый клик в файле и выбрать Run Code).
4 - Результат выполнения появится в окне терминала внизу редактора.



//
создаем в корне проекта webpack.config.js

стандартный код https://webpack.js.org/concepts/#entry

module.exports = {
  entry: './path/to/my/entry/file.js',
};

видоизменяем
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js')
  };

если несоклько файлов сборки, можно указать их как ключ - значение
const path = require('path')

module.exports = {
    entry:
    { 
        helloWorld: path.resolve(__dirname, 'src', 'index.js')
    }  
};

//
 npm run build

//

добписывает output
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: 
    {path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'}
};
//
 npm run build

 // после каждого билда появляются объекты!!!

 https://webpack.js.org/configuration/output/#template-strings
 тут описаны варианты актуализации данных для сборки - например 
 [contenthash] - для актуализации варианта при изменении файла, т е обновились данных - тогда при билде обновление. а нет - не будет


 ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ (env vars)


чтобы передавать актуальные данные в динамике

в package.json
  "scripts": {
    "build:dev": "webpack --env mode=development",
    "build:prod": "webpack --env mode=production"
  }

в webpack.config.js:
const path = require('path')

module.exports = (env) => {
    return {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        }
    }
};



//

теперь команды
npm run build:dev - выдает полную сборку
npm run build:prod - не полную - сжатый варик


// Плагины и работа с HTML
https://webpack.js.org/concepts/#plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

устанавливаем плагин npm i -D html-webpack-plugin

вставляем в webpack.config.js:         
plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],

//
результат настройки плагинов - мы создаем шаблон в папке
public/index.html

 в webpack.config.js прописываем настройки для проброски при сборке
 и при запуске билда в build/index.html будет реализована та же логика, что в шаблоне

// Лоадеры. TypeScript

для тестирования Ts нужно файлы js => ts

        entry: path.resolve(__dirname, 'src', 'index.ts'),
src/index.ts, test.ts

также в файлах добавляем типы данных
export function calc(a, b) {
    return a + b;
}

export function calc(a: number, b: number) {
    return a + b;
}

!!! указываем webpack что работаем с ts
с помощью лоудеров - 
это цепочка обработчиков, когда происходит перекодировка из нужного нам в понятный машине видоизменяем

в обработчике лежит то, что нужно обработать, например файлы с расширением
.ts, css. , .png, .svg, etc

//
less - css
sass - scsss
//

порядок в лоудерах очень важен

для обработки идем в https://webpack.js.org/guides/typescript/

Установка тс
npm install -D ts-loader@9.5.0 typescript@5.2.2

tsconfig.json

add to webpack.configmodule: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },


  //конфиг вебпак на тс

  https://webpack.js.org/configuration/configuration-languages/#typescript

  npm install -D typescript ts-node@10.9.1 @types/node@20.8.3 @types/webpack@5.28.3
# and, if using webpack-dev-server < v4.7.0
npm install -D @types/webpack-dev-server@4.7.

вносим еще ряд изменений и запускаем сборку
потом еще ряд изменений

////
Dev Server \ watch \ Source Map

Dev Server - автоматический ребилд кода при изменениях без доп сборки

npm install -D webpack-dev-server@4.15.1

после добавление дев сервера можно свои порты настраивать
npm run start 
npm run start -- --env port=5000

контроль ошибок и порядок функций - сорс мап - помогают исходный видоизменяем

webpack:
entry.path - точка входа в приложение
output - задает, куда происходит сборка

плагины - скрипты для подстановки в шаблон

            isDev ? new webpack.ProgressPlugin(): undefined // показывает прогресс, но тормозит
это можно упростить
isDev && new webpack.ProgressPlugin() // показывает прогресс, но тормозит
        ].filter(Boolean),


                  devtool:  isDev ? 'inline-source-map': false,
 => 
           devtool:  isDev && 'inline-source-map',



// REACT

npm i react react-dom
установка продакшн зависимости
npm i react@18.2.0 react-dom@18.2.0
установка дев зависимости
npm i -D @types/react@18.2.25 @types/react-dom@18.2.11

смотрим лекцию. внедряем перепрописываем реаакт

// CSS + scsss

npm install -D css-loader

npm install --save-dev style-loader

npm install sass-loader sass webpack --save-dev


npm install -D css-loader@6.8.1
npm install -D style-loader@3.3.3
npm i -D sass-loader@13.3.2 sass@1.69.0 webpack 

вносим изменения для регулярки scss
 rules: [
              {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },

              и собственно все 
              потом тест запуска и сборки
                npm run start
                npm run build:prod


вынесем css в отдельный блок сборки - подключаем 
npm install --save-dev mini-css-extract-plugin

npm install -D mini-css-extract-plugin@2.7.6


правим вебпак
[new MiniCssExtractPlugin()],

добавляем что надо
и теперь при сборке формируется файл стилей

/// Декомпозиция сборки
Переиспользуемый конфиг

сейчас конфиг может 
обрабатывать js, ts, исползует source map, dev toolz, конфигурируется под настройки

становится сложнее, требуется Декомпозиция

создаем папку config и наполняем



// Изоляция стилей
css modulel 
пишем классы в разных файлах - прогоняем через вебпак
это позволяет передавать в элементы читаемый нэйминг 



// Роутинг


как формируются чанки, ленивые подгрузки чанков, как формируется итоговый бандл, особенности дев разработки
установка реакт-роутинг-дом
npm i react-router-dom@6.16.0





Что такое ленивый чанк?
Ленивый чанк (Lazy Load Chunk) — это часть JavaScript-кода, которая загружается только тогда, когда пользователь действительно заходит на определённый маршрут или использует определённый функционал. Это позволяет не загружать весь код приложения сразу, а только ту часть, которая нужна в данный момент.
Этот подход уменьшает размер главного бандла приложения, улучшая производительность и скорость загрузки.

ленивый чанк - реализован в функции React.lazy() в связке с компонентом Suspense

 здесь реализуется для загрузки компонента About, Shop

 для чего - облегчает приложение, 
 нужно если есть части, которые нужно подгружать по запросу
 помогает следить за чангами - Webpack Bundle Analyzer

 npm i webpack-bundle-analyzer@4.9.1

добавляем его в список плагинов

///

