import { useSelector } from 'react-redux';

import { Routes, Route, Navigate } from 'react-router-dom';

import { MainLayout } from '@/layouts/main';

import HomePage from '@/pages/HomePage';
import CreateRoomPage from '@/pages/CreateRoomPage';
import JoinRoomPage from '@/pages/JoinRoomPage';
import RoomPage from '@/pages/RoomPage';
import RoomInvitePage from '@/pages/RoomInvitePage';

const AppRoutes = () => {
  const roomId = useSelector((store) => store.room.id);

  const isRoomMember = Boolean(roomId);

  return (
    <Routes>
      {/* Common routes */}
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="create-room" replace />} />

        <Route element={<HomePage />}>
          <Route path="create-room" element={<CreateRoomPage />} />
          <Route path="join-room" element={<JoinRoomPage />} />
        </Route>

        {/* Protected routes */}
        {isRoomMember && (
          <Route path="rooms">
            <Route path=":roomId" element={<RoomPage />} />
          </Route>
        )}

        {/* Fallback routes */}
        {!isRoomMember && (
          <Route path="rooms">
            <Route path=":roomId">
              <Route index element={<Navigate to="join-room" replace />} />
              <Route path="join-room" element={<RoomInvitePage />} />
            </Route>
          </Route>
        )}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
