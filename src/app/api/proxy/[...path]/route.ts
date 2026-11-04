import { NextRequest, NextResponse } from 'next/server';

import { appConfig } from '@/config/app';

const TARGET_API = appConfig.url.api;

interface RouteContext {
    params: Promise<{
        path?: string[];
    }>;
}

async function handleRequest(request: NextRequest, context: RouteContext): Promise<NextResponse> {
    try {
        const params = await context.params;
        const path = params.path;
        const subPath = path ? path.join('/') : '';

        const urlObj = new URL(request.url);
        const queryString = urlObj.search;
        const targetUrl = `${TARGET_API}/${subPath}${queryString}`;

        const headers = new Headers();

        // 1. Forward Authorization Header if exists
        const authHeader = request.headers.get('Authorization');
        if (authHeader) {
            headers.set('Authorization', authHeader);
        }

        // 2. Handle Content-Type (preserving multipart/form-data for file uploads)
        const contentType = request.headers.get('content-type');
        if (contentType) {
            headers.set('Content-Type', contentType);
        }

        const options: RequestInit = {
            method: request.method,
            headers: headers,
        };

        // 3. Read body using arrayBuffer to safely handle JSON, Files, and FormData
        if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
            const bodyBuffer = await request.arrayBuffer();
            if (bodyBuffer.byteLength > 0) {
                options.body = bodyBuffer;
            }
        }

        const response = await fetch(targetUrl, options);
        const data = await response.arrayBuffer();

        return new NextResponse(data, {
            status: response.status,
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'application/json',
            },
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json(
            { error: 'Proxy Error', details: errorMessage },
            { status: 500 }
        );
    }
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const DELETE = handleRequest;
export const PATCH = handleRequest;