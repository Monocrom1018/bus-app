import Auth, { CognitoUser } from '@aws-amplify/auth';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { CurrentUser } from '@interfaces';
import { useCallback } from 'react';
import { currentUserState } from '@atoms';
import { authSelector } from '@selectors';
import { userMeApi } from '@api';

type AuthenticateUser = (user: CognitoUser) => Promise<void>;
type UnAuthenticateUser = () => Promise<void>;
type SignOutUser = () => Promise<void>;

type UseAuthHooks = () => {
  authenticateUser: AuthenticateUser;
  unAuthenticateUser: UnAuthenticateUser;
  currentUser: CurrentUser;
  signOutUser: SignOutUser;
};

const useAuth: UseAuthHooks = () => {
  const [currentUser, setCurrentUser] = useRecoilState<CurrentUser>(authSelector);
  const resetCurrentUser = useResetRecoilState(currentUserState);

  const authenticateUser = useCallback(
    async (cognitoUser: CognitoUser & { attributes: any }) => {
      const isCognitoUser = cognitoUser instanceof CognitoUser;
      const userEmail = cognitoUser.attributes.email;
      if (!isCognitoUser) return;
      const { data: user } = await userMeApi(userEmail);
      setCurrentUser({ ...user, ...cognitoUser.attributes, isAuthenticated: true });
    },
    [setCurrentUser],
  );

  const unAuthenticateUser = useCallback(async () => {
    resetCurrentUser();
  }, [resetCurrentUser]);

  const signOutUser = useCallback(async () => {
    try {
      await Auth.signOut();
    } finally {
      unAuthenticateUser();
    }
  }, [unAuthenticateUser]);

  return {
    currentUser,
    signOutUser,
    authenticateUser,
    unAuthenticateUser,
  };
};

export default useAuth;
