export async function GET(request) {
    return new Response('Hello', {
        headers: { 'Content-Type': 'text/plain' },
    });
}