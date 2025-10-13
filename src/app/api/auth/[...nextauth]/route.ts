


import { googleAuthCallback } from '@/app/lib/api/userApi';
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

const isProduction:boolean = process.env.NODE_ENV === "production"

 const authOptions:AuthOptions = {
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
        async jwt({ token, account, user }:{token:any , account:any , user:any}) {
                    
                        if (account && user) {
                            try{
                           const res =  await googleAuthCallback(user.email, user.name, user.image);

                            if (res && res.data.response.authToken) {
                               
                                token.authToken = res.data.response.authToken;
                                
                            }
                        }catch (error) {
                                console.error("Error during googleAuthCallback:", error);
                              }
                                
                        }
                        return token; 
                        
                    },
                    async session({ session, token }: {session:any , token:any}) {
                       
                        if (token.authToken) {
                          session.authToken = token.authToken;
                        }
                        return session;
                      },
                    },
                    jwt: {
                      encode: async ({ token } :any) => {
                        
                        return token?.authToken || "";
                      },
                      decode: async ({ token }:any) => {
                       
                        return { authToken: token };
                      },
                    },
                    cookies: {
                      sessionToken: {
                        name: "authToken", 
                        options: {
                          domain:'.levelup.icu',
                          sameSite: isProduction ?'none' : 'lax',
                          secure: true,
                          path: "/",
                        },
                      },
                    },
}

const handler =  NextAuth(authOptions);

export { handler as GET , handler as POST}