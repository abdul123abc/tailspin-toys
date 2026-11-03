import type { Game } from '../types/game';

export type GameSort = 'title-asc' | 'title-desc' | 'rating-desc';

export function sortGames<T extends Pick<Game, 'title' | 'starRating'>>(
    games: readonly T[],
    sort: GameSort,
): T[] {
    return [...games].sort((a, b) => {
        if (sort === 'rating-desc') {
            if (a.starRating === null && b.starRating !== null) return 1;
            if (a.starRating !== null && b.starRating === null) return -1;
            if (a.starRating !== null && b.starRating !== null && a.starRating !== b.starRating) {
                return b.starRating - a.starRating;
            }
            return a.title.localeCompare(b.title);
        }

        return sort === 'title-asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    });
}
