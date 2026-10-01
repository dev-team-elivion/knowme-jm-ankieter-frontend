import { useSearchParams } from 'react-router-dom';

import {
  isFocusReturnPath,
  isSafeReturnPath,
  RETURN_TO_PARAM,
} from '@/views/questionForm/util/questionRoutes.util.ts';

type Return = {
  isFromFocus: boolean;
  returnTo: string | undefined;
};

export const useQuestionReturnTo = (): Return => {
  const [searchParams] = useSearchParams();
  const raw = searchParams.get(RETURN_TO_PARAM);
  const returnTo = raw !== null && isSafeReturnPath(raw) ? raw : undefined;

  return {
    isFromFocus: returnTo !== undefined && isFocusReturnPath(returnTo),
    returnTo,
  };
};
