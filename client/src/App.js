import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage'; // Импорт без {}
import InformationPage from './pages/InformationPage'; // Создайте этот компонент

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/information" element={<InformationPage />} />
        <Route path="/" element={<StartPage />} /> // Главная страница
        <Route path="*" element={<div>404 Not Found</div>} /> // Обработка несуществующих путей
      </Routes>
    </BrowserRouter>
  );
}

export default App;