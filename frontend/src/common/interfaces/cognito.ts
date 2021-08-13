export type CognitoErrorCode =
  | 'UsernameExistsException'
  | 'UserNotConfirmedException'
  | 'UserNotFoundException'
  | 'CodeMismatchException';

export interface CognitoAuthError {
  code: CognitoErrorCode;
  message: string;
  name: string;
}

export type I18NextCognitoErrorResult = { [key in CognitoErrorCode]: string };
