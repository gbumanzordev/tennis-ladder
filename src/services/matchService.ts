import {
  defineMutation,
  defineQuery,
  useMutation,
  useQuery,
  useQueryCache,
} from '@pinia/colada';
import * as matchesAPI from '@src/api/matches';
import type { NewMatch } from '@src/types/domain';
import { useRoute } from 'vue-router';

export const useMatches = defineQuery(() => {
  const route = useRoute();
  const { data, isLoading, error, refresh } = useQuery({
    key: () => ['matches'],
    query: async () => {
      return await matchesAPI.listByLadder(route.params.id.toString());
    },
  });
  return {
    data,
    isLoading,
    error,
    refresh,
  };
});

export const useCreateMatch = defineMutation(() => {
  const route = useRoute();
  const queryCache = useQueryCache();

  const { mutateAsync, error, isLoading, ...mutation } = useMutation({
    mutation: async (match: Omit<NewMatch, 'ladderId'>) => {
      await matchesAPI.create({
        ...match,
        ladderId: route.params.id.toString(),
      });
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['matches'], exact: true });
    },
  });
  return {
    createMatch: mutateAsync,
    error,
    isLoading,
    ...mutation,
  };
});

export const useDeleteMatch = defineMutation(() => {
  const queryCache = useQueryCache();

  const { mutateAsync, error, isLoading, ...mutation } = useMutation({
    mutation: async (id: string) => {
      await matchesAPI.remove(id);
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['matches'], exact: true });
    },
  });
  return {
    deleleMatch: mutateAsync,
    error,
    isLoading,
    ...mutation,
  };
});

export const useUpdateMatch = defineMutation(() => {
  const queryCache = useQueryCache();

  const { mutateAsync, isLoading, error, ...mutation } = useMutation({
    mutation: async ({
      id,
      match,
    }: {
      id: string;
      match: Omit<NewMatch, 'ladderId'>;
    }) => {
      await matchesAPI.update(id, match);
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['matches'], exact: true });
    },
  });
  return {
    updateMatch: mutateAsync,
    error,
    isLoading,
    ...mutation,
  };
});
