import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import KanbanBoardPage from 'pages/KanbanBoardPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<KanbanBoardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
