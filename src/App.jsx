import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/homePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/Profile/Profile";
import CreatePost from "./pages/Dashboard/CreatePost";
import Messages from "./pages/Dashboard/Messages";
import Connections from "./pages/Dashboard/connections/Connections";
import Discover from "./pages/Dashboard/Discover";
import EditProfile from "./pages/Dashboard/Profile/EditProfile";
import Feed from "./pages/Dashboard/feed/Feed";
import PostsTab from "./pages/Dashboard/Profile/PostsTab";
import MediaTab from "./pages/Dashboard/Profile/MediaTab";
import LikesTab from "./pages/Dashboard/Profile/LikesTab";
import ProtectedRoute from "./components/ProtectedRoute";
import ConnectionsTab from "./pages/Dashboard/connections/ConnectionsTab";
import FollowersTab from "./pages/Dashboard/connections/FollowersTab";
import FollowingTab from "./pages/Dashboard/connections/FollowingTab";
import PendingConnections from "./pages/Dashboard/connections/PendingConnections";
import CreateStory from "./pages/Dashboard/feed/components/CreateStory";
import Notifications from "./pages/Dashboard/Notifications";
import PostDetails from "./pages/Dashboard/PostDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/pingup"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Feed />} />
          <Route path="profile/:userId?" element={<Profile />}>
            <Route index element={<PostsTab />} />
            <Route path="posts" element={<PostsTab />} />
            <Route path="media" element={<MediaTab />} />
            <Route path="likes" element={<LikesTab />} />
          </Route>
          <Route path="connections" element={<Connections />}>
            <Route index element={<ConnectionsTab />} />
            <Route path="following" element={<FollowingTab />} />
            <Route path="followers" element={<FollowersTab />} />
            <Route path="pending" element={<PendingConnections />} />
          </Route>
          <Route path="create-post" element={<CreatePost />} />
          <Route path="create-story" element={<CreateStory />} />{" "}
          <Route path="messages" element={<Messages />} />
          <Route path="discover" element={<Discover />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="post/:postId" element={<PostDetails />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
