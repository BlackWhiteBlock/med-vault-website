import { RouterProvider } from 'react-router';
import { LaunchNoticeProvider } from './components/LaunchNoticeProvider';
import { router } from './routes';

export default function App() {
  return (
    <LaunchNoticeProvider>
      <RouterProvider router={router} />
    </LaunchNoticeProvider>
  );
}
