import {
  defineMutation,
  defineQuery,
  useMutation,
  useQuery,
  useQueryCache,
} from '@pinia/colada';
import * as playerAPI from '@src/api/players';
import { useRoute } from 'vue-router';

export const usePlayers = defineQuery(() => {
  const route = useRoute();
  const {
    data,
    isLoading,
    error,
    refresh: updatePlayers,
  } = useQuery({
    key: () => ['players'],
    query: async () => {
      return await playerAPI.listByLadder(route.params.id.toString());
    },
  });
  return {
    data,
    isLoading,
    error,
    updatePlayers,
  };
});

export const useCreatePlayer = defineMutation(() => {
  const route = useRoute();

  const queryCache = useQueryCache();

  const { mutateAsync, error, isLoading, ...mutation } = useMutation({
    mutation: async (name: string) => {
      await playerAPI.create(route.params.id.toString(), name);
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['players'], exact: true });
    },
  });
  return {
    ...mutation,
    createPlayer: mutateAsync,
    error,
    isLoading,
  };
});

export const useDeleteAtPlayer = defineMutation(() => {
  const queryCache = useQueryCache();

  const { mutateAsync, error, isLoading, ...mutation } = useMutation({
    mutation: async (id: string) => {
      await playerAPI.removeAt(id);
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['players'], exact: true });
    },
  });
  return {
    ...mutation,
    deleteAtPlayer: mutateAsync,
    error,
    isLoading,
  };
});

export const useRenamePlayer = defineMutation(() => {
  const queryCache = useQueryCache();

  const { mutateAsync, error, isLoading, ...mutation } = useMutation({
    mutation: async ({ id, name }: { id: string; name: string }) => {
      await playerAPI.rename(id, name);
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['players'], exact: true });
    },
  });
  return {
    ...mutation,
    renamePlayer: mutateAsync,
    error,
    isLoading,
  };
});
