import { useMutation } from 'react-query';

import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

const SignOutButton = () => {
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: () => {
      showToast({ message: 'Logout successful', type: 'SUCCESS' })
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR'})
    }
  });

  const handleClick = () => mutation.mutate();

  return (
    <button
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 rounded shadow-md"
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
