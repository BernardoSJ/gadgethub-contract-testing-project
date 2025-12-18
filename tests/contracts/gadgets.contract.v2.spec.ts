import { test, expect } from '@playwright/test';
import { setExpectation } from './expectations.helper';

test.describe('Contract scenarios with expectations', () => {

    test('Empty list: GET /gadgets returns []', async ({request}) => {
        await setExpectation(request, 'tests/expectations/gadgets.empty-list.json');

        const res = await request.get('/gadgets');
        expect(res.status()).toBe(200);

        const body = await res.json();
        expect(body).toEqual([]);
    });

    test('500 error: GET /gadgets returns error payload', async ({ request }) => {
        await setExpectation(request, 'tests/expectations/gadgets.500.json');

        const res = await request.get('/gadgets');
        expect(res.status()).toBe(500);

        const body = await res.json();
        expect(body.message).toBeTruthy();
    });

    test('404 not found: GET /gadgets/{id} returns 404', async ({ request }) => {
        await setExpectation(request, 'tests/expectations/gadgetsById.404.json');

        const res = await request.get('/gadgets/999999');
        expect(res.status()).toBe(404);

        const body = await res.json();
        expect(body.message).toContain('not found');
    });

});