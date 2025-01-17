import { createThirdwebClient } from 'thirdweb';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID as string;
console.log("Client ID:", CLIENT_ID);

export const client = createThirdwebClient({
    clientId: CLIENT_ID,
});