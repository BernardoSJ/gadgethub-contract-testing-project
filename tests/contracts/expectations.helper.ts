import { APIRequestContext, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

type ExpectationJson = {
  'http-stub-id'?: string;
  'http-request': { method: string; path: string };
  'http-response': { status: number; body?: unknown };
};

export async function setExpectation(request: APIRequestContext, filePath: string) {
  const json = JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf-8')) as ExpectationJson;

  const stubId = json['http-stub-id'];
  expect(stubId, `Missing "http-stub-id" in ${filePath}`).toBeTruthy();

  const res = await request.post('/_specmatic/expectations', {
    data: json,
    headers: { 'content-type': 'application/json' },
  });

  const text = await res.text();
  expect(res.ok(), `Setting expectation failed (${res.status()}): ${text}`).toBeTruthy();

  return stubId!;
}

export async function clearExpectation(request: APIRequestContext, stubId: string) {
  const res = await request.delete(`/_specmatic/http-stub/${encodeURIComponent(stubId)}`);
  const text = await res.text();
  expect(res.ok(), `Clearing expectation failed (${res.status()}): ${text}`).toBeTruthy();
}