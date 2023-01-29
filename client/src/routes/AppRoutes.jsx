import { Routes, Route, Navigate } from 'react-router-dom';

import { MainLayout } from '@/layouts/main';

import HomePage from '@/pages/HomePage';
import CreateRoomPage from '@/pages/CreateRoomPage';
import JoinRoomPage from '@/pages/JoinRoomPage';
import RoomPage from '@/pages/RoomPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="create-room" replace />} />

        <Route element={<HomePage />}>
          <Route path="create-room" element={<CreateRoomPage />} />
          <Route path="join-room" element={<JoinRoomPage />} />
        </Route>

        <Route path="rooms">
          <Route path=":roomId" element={<RoomPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
