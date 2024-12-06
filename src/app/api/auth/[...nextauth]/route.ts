import { googleAuthCallback } from '@/app/lib/api/userApi';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    providers: [
        
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async jwt({ token, account, user }:any) {
            if (account && user) {
                // Send data to your backend to save user info
                const res = await googleAuthCallback(user.email, user.name, user.image);
                console.log("jjjjjj" , res)
                // Optionally, add additional fields to the token
                token.email = user.email;
                token.name = user.name;
                token.role = "User"
                console.log("tokeeee" , token);
                
                    
            }
            return token; 
            
        },
        
}
}

const handler =  NextAuth(authOptions);

export { handler as GET , handler as POST}