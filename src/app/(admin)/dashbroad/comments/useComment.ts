import { atom, useAtom } from 'jotai';

import { IListComment } from '@/service/_comment.service';

type Config = {
  selected: IListComment['id'] | null;
};

const configAtom = atom<Config>({
  selected: null,
});

export function useComment() {
  return useAtom(configAtom);
}
