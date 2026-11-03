import { describe, expect, it } from 'vitest';
import type { Game } from '../types/game';
import { sortGames } from './game-sorting';

const games: Pick<Game, 'title' | 'starRating'>[] = [
    { title: 'Moon Base', starRating: 3.5 },
    { title: 'Astro Quest', starRating: 4.8 },
    { title: 'Pixel Pioneers', starRating: null },
    { title: 'Byte Knights', starRating: 4.8 },
];

describe('sortGames', () => {
    it('sorts titles from A to Z', () => {
        expect(sortGames(games, 'title-asc').map((game) => game.title)).toEqual([
            'Astro Quest',
            'Byte Knights',
            'Moon Base',
            'Pixel Pioneers',
        ]);
    });

    it('sorts titles from Z to A', () => {
        expect(sortGames(games, 'title-desc').map((game) => game.title)).toEqual([
            'Pixel Pioneers',
            'Moon Base',
            'Byte Knights',
            'Astro Quest',
        ]);
    });

    it('sorts ratings highest first, breaks ties by title, and puts unrated games last', () => {
        expect(sortGames(games, 'rating-desc').map((game) => game.title)).toEqual([
            'Astro Quest',
            'Byte Knights',
            'Moon Base',
            'Pixel Pioneers',
        ]);
    });

    it('returns an empty list for an empty collection', () => {
        expect(sortGames([], 'title-asc')).toEqual([]);
    });

    it('does not mutate the input list', () => {
        sortGames(games, 'title-desc');
        expect(games[0].title).toBe('Moon Base');
    });
});
