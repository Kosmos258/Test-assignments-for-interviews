## Тестовое задание №1

* Сверстать по макету отчет. В отчете вывести список юзеров.
* На странице есть поиск по юзерам. При вводе в строке поиска список фильтруется. При клике по карточке выводить в pop-up дополнительную информацию по юзеру. При нажатии вне окна с информацией или крестик окно закрывается.
* Список юзеров получаем с бэкенда. Для этого нужно установить и запустить локально сервер. Ссылка будет такой http://127.0.0.1:3000. Для получения всего списка отправляем запрос без параметров, для получения совпадений ФИО со строкой ввода добавляем параметры query (term), например http://127.0.0.1:3000?term=fer
* [Ссылка на макет](https://www.figma.com/file/sVohAvXP1UpHzN3MMLwmkB/%D0%97%D0%B0%D0%B4%D0%B0%D1%87%D0%B0-30080?node-id=0%3A1&t=kenPBeTH1t4zLitJ-0)
* [Ссылка на архив в бэкендом](https://drive.google.com/file/d/1bRxaW02JMJA1Z4CBWLv_-j6UzeHSrzJ_/view?usp=sharing)

## Решение

Для того, чтобы протестировать решение, необходимо папку с архивом [бэкенд](https://disk.yandex.ru/d/ajZyQoJcGstafQ) поместить в папку **test1**, затем выполнить команду в терминале корневой папки (где лежит файл **server.js**) по [этому](./test1/server/server.js) пути:

```
node server.js
```
и полсле этого в другом терминале запустить проект из папки **test1** с помощью команды:
```
npm start
```

## Тестовое задание №2

Написать T-SQL запрос.
Для отладки запроса необходимо скачать [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads), а также [SSMS](https://learn.microsoft.com/ru-ru/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16).
Базу данных с тестовыми таблицами скачать и экспортировать в [SSMS](https://disk.yandex.ru/d/lssevrQ9uwdUhw) (необходима версия не ниже 2022 г. 19.1)

В БД есть две таблицы:
1. collaborators - таблица сотрудников. Поля: id, name (имя сотрудника), subdivision_id (id подразделения сотрудника), age (возраст).
2. subdivisions - таблица подразделений. Поля: id, name, parent_id (id родительского подразделения)

Необходимо получить сотрудников всех нижестоящих подразделений от подразделения сотрудника “Сотрудник 1” с id 710253 у которых возраст менее 40 лет и длина имени более 11 символов. Также в результирующей таблице не должно оказаться подразделений с id 100055 и 100059. Отсортировать по возрастанию уровня вложенности подразделения.

В результирующем наборе должны быть следующие поля:

* id - id сотрудника
* name - Имя сотрудника
* sub_name - Наименование подразделения
* sub_id - id подразделения
* sub_level - Уровень вложенности подразделения относительно самого верхнего
* colls_count - Общее количество сотрудников в подразделении сотрудника (включая самого сотрудника).

Показать сам запрос (приложить файл в формате .sql), результирующую таблицу и время выполнения запроса.

```
WITH SubdivisionHierarchy AS (
    SELECT
        s.id AS sub_id,
        s.name AS sub_name,
        0 AS sub_level
    FROM
        subdivisions s
    JOIN
        collaborators c ON c.subdivision_id = s.id
    WHERE
        c.id = 710253

    UNION ALL

    SELECT
        s.id,
        s.name,
        sh.sub_level + 1
    FROM
        subdivisions s
    JOIN
        SubdivisionHierarchy sh ON s.parent_id = sh.sub_id
    WHERE
        s.id NOT IN (100055, 100059)
)
SELECT
    c.id,
    c.name,
    sh.sub_name,
    sh.sub_id,
    sh.sub_level,
    (SELECT COUNT(*)
     FROM collaborators cc
     WHERE cc.subdivision_id = c.subdivision_id) AS colls_count
INTO
    result_table
FROM
    SubdivisionHierarchy sh
JOIN
    collaborators c ON c.subdivision_id = sh.sub_id
WHERE
    c.age < 40
ORDER BY
    sh.sub_level ASC;

```

### [SQL-запрос](./test2/Запрос.sql)

### [Результирующая таблица](./test2/Результирующая%20таблица.bacpac) лежит в папке **test2**.

### [Время выполнения](./test2/Время.rpt) (можно открыть с помощью блокнота).


## Тестовое задание №3
Скачать и установить дистрибутив ПО WebSoft HCM по [ссылке](https://disk.yandex.ru/d/oDFQQTnPrcqRNQ).

1.	После установки запустите сервер - WebSoft2023.1\WebSoftServer\xHttp_64.exe. Дождитесь надписи Server Started.
2.	Запустите интерфейс администратора - WebSoft2023.1\WebSoftAdmin\SpXml.exe. Логин/пароль - user1/user1.
3.	Во вкладке Персонал -> Сотрудники создайте нового сотрудника, задайте ему логин/пароль и ФИО.
4.	Создайте файл index.html в директории WebSoft2023.1\WebSoftServer\wt\web\
5.	В файле index.html напишите код, который выводит список сотрудников  (ФИО каждого сотрудника с новой строки). Посмотреть результат можно перейдя на localhost/index.html.

	Таблица с сотрудниками называется - collaborators, нужное поле - fullname. Запрос пишется через xquery.
Серверный код вставляется в html код с помощью <% %> тегов. Выводится с помощью <%= %> тегов.
Ссылка на документацию по ПО - [https://developers.websoft.ru](https://developers.websoft.ru)

## Решение

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Тестовое задание 3</title>
</head>
<body>
    <%
        _query_str = "for $elem in collaborators return $elem";
        personArray = XQuery(_query_str);
        _elems = ArrayExtract(personArray, 'fullname');
    %>
    <%
    for(i in _elems) {
    %>
        <p><%=i%></p>
    <%
    }
    %>
</body>
</html>

```
### [index.html](./test3/index.html)