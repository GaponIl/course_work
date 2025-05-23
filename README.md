# Course_work 2 review
### Верстка

- [ ] Регистрация / Авторизация. На странице входа и регистрации должна быть кнопка перехода к другому режиму авторизации (если открыта страница регистрация, снизу, либо в хэдаре должны быть кнопка входа и наоборот)
- [ ] Все же между шутками использовать отсутп в px а не в vh, шутки слишком далеко друг от друга
- [ ] Отсутсвует пагинация на сайте, получается монолит страница, если будет 1000 шуток, то страница не прогрузится (либо будет долго грузится, либо будут ошибки из-за большого кол-ва элементов)
- [ ] Добавь обработку нажатия кнопки при нажатии Enter, не сильно критично, но будет удобнее
- [ ] Слишком большие отступы от кнопок удаления и редактирования от шуток
- [ ] В хэдаре не интуитивно понятные кнопки входа и регистрации (чел с щитом и редактирование профиля, либо выбраны не те иконки, либо лучше добавить текст под кнопкой
- [ ] Все еще отсутсвует вывод ошибок на страницу (особенно важно при авторизации и регистрации) 

# Course_work 1 review
### Клиент `/client`

**По клиенту в целом нормально, но надо исправить пару моментов:**

`App.jsx`
- [x] УБрать лишние коментарии (читай коммы вообще)

`StartPage.jsx`
- [x] Реализация функции **fetchJokes** лежит в самой **useEffect**. Каждый раз, при монтровании страницы функция перезаписывается. В **useEffect** надо просто вызывать функцию
      https://github.com/GaponIl/course_work/blob/e6049639c568e5e6638be7b73cd039953051e1e4/client/src/pages/StartPage.jsx#L15-L22
- [x] Адресс должен хранится в переменной. В случае смены адреса или загрузки на сервер, придется везде менять адрес. 
      https://github.com/GaponIl/course_work/blob/e6049639c568e5e6638be7b73cd039953051e1e4/client/src/pages/StartPage.jsx#L33
      Правильнее использовать:
      
      const addr = 'http://localhost:8080'
      
      const response = await axios.post('${addr}/jokes', { content: text });
- [x] В случае, если сервер отдаст ошибку, или не отправит массив, может произойти ошибка (попатка взять элементы и пустого массив). В данных случаях лучше сначала написать проверку на наличие элементов в массиве, а потом уже проходится по нему 
      https://github.com/GaponIl/course_work/blob/e6049639c568e5e6638be7b73cd039953051e1e4/client/src/pages/StartPage.jsx#L106-L112
- [ ] Нет вывода ошибок на страницу, если что-то пойдет не так, пользователь не поймет и будет до последнего жать на кнопку

**Задание со звездочкой** * :
- [x] Сейчас, если я открою страницу информации и потом перейду на страницу с шутками, запрос будет отправлен еще раз. И так каждый раз при переходе на страницу `StartPage`. Слишком частое обращение к серверу. А если шутки понадобятся еще на какой странице?
      Запрос шуток, должен происходить в основной компоненте `App.jsx`, создай массив (state) в `App.jsx` с шутками, туда же перенеси функцию загрузки шуток с сервера. **useEffect** используй в `App.jsx`.
      Передавай state массива с шутками, set'ер и функцию получения шуток в компоненту как параметры (смотри как это делается)
- [x] По хорошему, все **axios** запросы (функции работы с сервером) надо вынести в отдельный файл с классом **API.js** (можешь посмотреть у меня в проекте, там реализовано).
      В компоненте ты должен только вызывать функцию, передавать в нее пораметры и обрабатывать ответ функции (то, что ты ретернишь, либо сразу данные, либо полный ответ).
      В фале **APIjs** также обрабатываем все ошибки и исключения, чтобы не загрязнять код компоненты


`InformationPage.jsx`

Не сильно понимаю, для чего вообще эта страница. Обычно используют **footer** для указания авторства и контактов: 
![image](https://github.com/user-attachments/assets/845af297-d8c8-4896-9fb6-6f2cd7790f93)
![image](https://github.com/user-attachments/assets/67fdf4b3-c6b6-4583-ac4e-5b7eacd33963)

### Сервер `/server`

`controller.js`

**По серверу все хорошо, но:**

- [x] Не забудь на релизе убрать, а то если код будут проверять, будет много вопросов
      https://github.com/GaponIl/course_work/blob/e6049639c568e5e6638be7b73cd039953051e1e4/server/controller.js#L12

### Общее

- [ ] Добавь README.md (после решения всех проблем) с командами для запуска проекта, путями к страницами и путями **API** (запросов к серверу) 
