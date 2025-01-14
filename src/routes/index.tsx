import { BrowserRouter, Route, Routes } from "react-router-dom";

import LayoutAdmin from "../layouts/admin";
import LayoutAuth from "../layouts/auth";

import Dashboard from "../pages/dashboard";
import Topic from "../pages/topics";

import Song from "../pages/songs";
import SongList from "../pages/songs/list";
import SongCreate from "../pages/songs/create";
import SongUpdate from "../pages/songs/update";

import Login from "../pages/auth/login";

import configs from "../configs";
import TopicList from "../pages/topics/list";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={configs.PATH_ADMIN} element={<LayoutAdmin />}>
          <Route path="" element={<Dashboard />} />

          <Route path="topics" element={<Topic />}>
            <Route path="" element={<TopicList />} />
          </Route>

          <Route path="songs" element={<Song />}>
            <Route path="" element={<SongList />} />
            <Route path="create" element={<SongCreate />} />
            <Route path="update/:id" element={<SongUpdate />} />
          </Route>
        </Route>

        <Route path={`${configs.PATH_ADMIN}/auth`} element={<LayoutAuth />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;