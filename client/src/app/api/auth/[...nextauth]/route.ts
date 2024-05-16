import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const URL =  process.env.BACKEND

export const api = axios.create({
  baseURL: URL
});

export type NextAuthSession = {
    user: {
      access: string;
      refresh: string;
    },
    token:typeTokenProps
    trigger: string;
    session: {
      newImage: string;
      newName: string;
    }
  };

interface typeTokenProps {
  access?: string;
  refresh?: string;
  accountId: number;
  name: string;
  username: string;
  cover: string;
  expiration?: number;
}

type JwtDecodedProps = {
    accountId: number;
    name: string;
    username: string;
    cover: string;
}

type credentialsProps = {
  username: string;
  password: string;
}

export interface SessionProps{
  session:SessionNew,
  token:typeTokenProps
  user: any,
  update:any,
  status: any
}

export type SessionNew = {
  accessToken: string;
  expiration: number;
  user: {
    accountId: number;
    name: string;
    username: string;
    cover: string;
  };
};


export const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy:'jwt',
        maxAge: Math.floor(60 * 60 * 24) // One day
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
          },
          // @ts-ignore
          async authorize(credentials:credentialsProps) {
            try{
                const response = await api.post('/signin', {
                  username: credentials.username,
                  password: credentials.password,
              }, {
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
                const { access } = response.data

                console.log('DEU CERTO')

                if (!access){
                    return null
                }
                return response.data
                // @ts-ignore
            }catch(e: { response: {data: {detail?: string[], non_field_errors: string[]}}}){

                if (e?.response?.data.detail){
                  throw new Error(e?.response?.data.detail)
                }
                
                if (e?.response?.data.non_field_errors){
                  throw new Error(e?.response?.data.non_field_errors)
                }

                return null
            }
          }
        })
      ],
      callbacks: {
        // @ts-ignore
        async jwt({token, user}:NextAuthSession): Promise<any> {

            const isSignIn = !!user
            const actualDateInSeconds = Math.floor(Date.now() / 1000);
            const tokenExpirationInSeconds = Math.floor(60 * 60 * 24); // 24hrs
            
            if(isSignIn){
                if(!user.access) return Promise.resolve({})

                const {
                  accountId, 
                } = jwtDecode<JwtDecodedProps>(user.access)

                token.access = user.access
                token.accountId = accountId
                token.expiration = Math.floor(
                    actualDateInSeconds + tokenExpirationInSeconds,
                  );
            }else{
                if(!token.expiration) return  Promise.resolve({})

                if(actualDateInSeconds > token.expiration) return Promise.resolve({})
                    
                    
            }

            return Promise.resolve(token)
        },
        // @ts-ignore
        async session({session, token, user}:SessionProps): Promise<any> {

            if (
                !token?.access ||
                !token?.accountId ||
                !token?.expiration

              ) {
                return null;
              }

              session.accessToken = token.access;
              session.user = {
                accountId: token.accountId
              };
        
            return { ...session };

        }
      }
})


export { handler as GET, handler as POST};