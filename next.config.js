/** @type {import('next').NextConfig} */


module.exports = {
    reactStrictMode: true,
    env: {
        PORT: process.env.PORT,
        API_URL: process.env.NEXT_PUBLIC_API_URL,
        SPACES_URL: process.env.NEXT_PUBLIC_SPACES_URL,
        SIGNIN_URL: process.env.NEXT_PUBLIC_SIGNIN_URL,
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: [
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    }
                ],
            },


        ]
    },
};
