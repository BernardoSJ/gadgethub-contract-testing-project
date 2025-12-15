import { test, expect } from '@playwright/test';

test.describe('Contract: GET /gadgets and /gadgets/{id}', () => {
    test('Returns 200 and matches contract schema', async ({ request }) => {
        const response = await request.get('/gadgets');
        expect(response.status()).toBe(200); //Validate response status code is 200

        const bodyResponse = await response.json();
        expect(Array.isArray(bodyResponse)).toBe(true);//Validate JSON Response is an Array

        //In case there are elements, validate they follow the defined schema
        if(bodyResponse.length > 0){
            const gadget = bodyResponse[0];
            expect(typeof gadget.id).toBe('number');
            expect(typeof gadget.name).toBe('string');
            if (gadget.description !== undefined) {
                expect(typeof gadget.description).toBe('string');
            }
        }
    });

    test('Returns 200 for valid gadget id and matches contact schema', async ({ request }) => {
        const listResponse = await request.get('/gadgets');
        const list = await listResponse.json();
        const randomId = list[0].id;

        const response = await request.get(`/gadgets/${randomId}`);
        expect(response.status()).toBe(200); //Validate response status code is 200

        const bodyResponse = await response.json();
        
        
        expect(typeof bodyResponse.id).toBe('number');
        expect(typeof bodyResponse.name).toBe('string');
        if (bodyResponse.description !== undefined) {
            expect(typeof bodyResponse.description).toBe('string');
        }
        
    });

    test('Returns 404 when gadget is not found', async ({ request }) => {
        const response = await request.get('/gadgets/999999');
        expect(response.status()).toBe(404);
    });

});