import { test, expect } from '@playwright/test';
import { setExpectation, clearExpectation } from './expectations.helper';

test.describe('Contract scenarios with expectations', () => {
    let stubId: string | undefined;

    test.describe.configure({ mode: 'serial' });


    test('Empty list: GET /gadgets returns []', async ({request}) => {
        stubId = await setExpectation(request, 'tests/expectations/gadgets.empty-list.json');

        try{
            const res = await request.get('/gadgets');
            expect(res.status()).toBe(200);
            const body = await res.json();
            expect(body).toEqual([]);
        }finally{
            await clearExpectation(request, stubId);
        }
        
    });

    test('500 error: GET /gadgets returns error payload', async ({ request }) => {
        stubId = await setExpectation(request, 'tests/expectations/gadgets.500.json');

        try{
            const res = await request.get('/gadgets');
            expect(res.status()).toBe(500);

            const body = await res.json();
            expect(body.message).toBeTruthy();
        }finally{
            await clearExpectation(request, stubId);
        }
        
    });

    test('404 not found: GET /gadgets/{id} returns 404', async ({ request }) => {
        stubId = await setExpectation(request, 'tests/expectations/gadgetsById.404.json');

        try{
            const res = await request.get('/gadgets/1');
            expect(res.status()).toBe(404);

            const body = await res.json();
            expect(body.message).toContain('not found');
        }finally{
            await clearExpectation(request, stubId);
        }
        
    });

});