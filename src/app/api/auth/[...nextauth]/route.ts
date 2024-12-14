


import { googleAuthCallback } from '@/app/lib/api/userApi';
import { JWT } from 'next-auth/jwt';
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'


export const authOptions:AuthOptions = {
    providers: [
        
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    session: {
        strategy: 'jwt', 
      },
      callbacks: {
        async jwt({ token, account, user }:any) {
                    
                        if (account && user) {
                            try{
                          
                           let  res =  await googleAuthCallback(user.email, user.name, user.image);
                           console.log("ress" , res.data.response.authToken);

                            if (res && res.data.response.authToken) {
                               
                                token.authToken = res.data.response.authToken;
                                console.log("kkkkk" , token)
                                
                            }
                        }catch (error) {
                                console.error("Error during googleAuthCallback:", error);
                              }
                                
                        }
                        return token; 
                        
                    },
                    async session({ session, token }: any) {
                       
                        if (token.authToken) {
                          session.authToken = token.authToken;
                        }
                        console.log("session" , session.authToken)
                        return session;
                      },
                    },
                    jwt: {
                      encode: async ({ token, secret }: any) => {
                        
                        return token.authToken || "";
                      },
                      decode: async ({ token, secret }: any) => {
                       
                        return { authToken: token };
                      },
                    },
                    cookies: {
                      sessionToken: {
                        name: "authToken", 
                        options: {
                          httpOnly: true,
                          sameSite: "strict",
                          secure: process.env.NODE_ENV === "production",
                          path: "/",
                        },
                      },
                    },
}

const handler =  NextAuth(authOptions);

export { handler as GET , handler as POST}