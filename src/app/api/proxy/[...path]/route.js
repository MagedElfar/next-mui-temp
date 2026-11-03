/* eslint-disable no-undef */
import { NextResponse } from 'next/server';

const TARGET_API = 'https://api.rawalifeapp.com/api/v1';

async function handleRequest(request, { params }) {
    const { path } = await params;
    const subPath = path ? path.join('/') : '';

    const urlObj = new URL(request.url);
    const queryString = urlObj.search;
    const targetUrl = `${TARGET_API}/${subPath}${queryString}`;

    try {
        const headers = new Headers();

        // 1. نقل الـ Authorization Header لو موجود
        const authHeader = request.headers.get('Authorization');
        if (authHeader) {
            headers.set('Authorization', authHeader);
        }

        // 2. التعامل مع Content-Type (عدم إجبار application/json في حالة رفع الملفات)
        const contentType = request.headers.get('content-type');
        if (contentType) {
            headers.set('Content-Type', contentType);
        }

        const options = {
            method: request.method,
            headers: headers,
        };

        // 3. قراءة الـ Body بحجمه ورسوماته الحقيقية (سواء JSON أو FormData / Files)
        if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
            // استخدام request.arrayBuffer() للحفاظ على سلامة الملفات والصور
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
    } catch (error) {
        return NextResponse.json({ error: 'Proxy Error', details: error.message }, { status: 500 });
    }
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const DELETE = handleRequest;
export const PATCH = handleRequest;