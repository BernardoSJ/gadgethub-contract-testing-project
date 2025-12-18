import { APIRequestContext, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

export async function setExpectation(request: APIRequestContext, filePath: string) {
  const json = JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf-8'));

  const res = await request.post('/_specmatic/expectations', {
    data: json,
    headers: { 'content-type': 'application/json' },
  });

  expect(res.ok(), `Setting expectation failed: ${await res.text()}`).toBeTruthy();
}