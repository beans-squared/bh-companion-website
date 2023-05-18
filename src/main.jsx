import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './ErrorPage';
import EquipmentReporter from './routes/EquipmentReporter';
import PlaylistGenerator from './routes/PlaylistGenerator';
import RoomManager from './routes/RoomManager';
import SessionManager from './routes/SessionManager';
import SpectatorView from './routes/SpectatorView';
import CurrentDeals from './routes/CurrentDeals';
import DeepCleanList from './routes/DeepCleanList';
import './root.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: 'reporter',
		element: <EquipmentReporter />,
	},
	{
		path: 'generator',
		element: <PlaylistGenerator />,
	},
	{
		path: 'room-manager',
		element: <RoomManager />,
	},
	{
		path: 'session-manager',
		element: <SessionManager />,
	},
	{
		path: 'spectator-view',
		element: <SpectatorView />,
	},
	{
		path: 'current-deals',
		element: <CurrentDeals />,
	},
	{
		path: 'deep-clean-list',
		element: <DeepCleanList />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
