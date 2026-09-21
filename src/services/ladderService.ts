import {
  defineMutation,
  defineQuery,
  useMutation,
  useQuery,
  useQueryCache,
} from '@pinia/colada';
import * as ladderAPI from '@src/api/ladders';
import { useAuthStore } from '@src/stores/auth';
import { storeToRefs } from 'pinia';

export const useLadders = defineQuery(() => {
  const {
    data,
    isLoading,
    error,
    refresh: updateLadders,
  } = useQuery({
    key: () => ['ladders'],
    query: async () => {
      return await ladderAPI.list();
    },
  });
  return {
    data,
    isLoading,
    error,
    updateLadders,
  };
});

export const useCreateLadder = defineMutation(() => {
  const authStore = useAuthStore();
  const queryCache = useQueryCache();
  const { userId } = storeToRefs(authStore);

  const { mutateAsync, error, isLoading, ...mutation } = useMutation({
    mutation: async (name: string) => {
      await ladderAPI.create(name, userId.value as string);
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['ladders'], exact: true });
    },
  });
  return {
    ...mutation,
    createLadder: mutateAsync,
    error,
    isLoading,
  };
});

export const useDeleteLadder = defineMutation(() => {
  const queryCache = useQueryCache();

  const { mutateAsync, error, isLoading, ...mutation } = useMutation({
    mutation: async (id: string) => {
      await ladderAPI.remove(id);
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['ladders'], exact: true });
    },
  });
  return {
    ...mutation,
    deleteLadder: mutateAsync,
    error,
    isLoading,
  };
});

export const useRenameLadder = defineMutation(() => {
  const queryCache = useQueryCache();

  const { mutateAsync, error, isLoading, ...mutation } = useMutation({
    mutation: async ({ id, name }: { id: string; name: string }) => {
      await ladderAPI.rename(id, name);
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['ladders'], exact: true });
    },
  });
  return {
    ...mutation,
    renameLadder: mutateAsync,
    error,
    isLoading,
  };
});
