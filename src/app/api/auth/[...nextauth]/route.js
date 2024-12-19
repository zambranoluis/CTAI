import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt from "jsonwebtoken";
import md5 from "md5";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Clave pública obtenida de las variables de entorno
const PUBLIC_KEY = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, "\n");

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials;
        const hashedPassword = md5(password);

        try {
          // Solicitud al backend para autenticación
          const response = await axios.post(`${BACKEND_URL}/users/login`, {
            email,
            password: hashedPassword,
          });

          if (response.data && response.data.status === "success") {
            const user = response.data.data;

            // Verificar el token devuelto por el backend
            jwt.verify(user.token, PUBLIC_KEY, { algorithms: ["RS256"] });

            return user; // Asegúrate de que `user` contenga `userId`
          }

          throw new Error("Invalid credentials");
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error(
            error.response?.data?.message || "Login failed due to an unexpected error.",
          );
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/", // Página para iniciar sesión
    error: "/auth/error", // Página de errores
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Incluir detalles del usuario y el token de backend
        token.accessToken = user.token; // Token del backend
        token.userId = user.userId;
        token.givenName = user.givenName;
        token.familyName = user.familyName;
        token.userName = user.userName;
      }
      return token;
    },
    async session({ session, token }) {
      // Agregar detalles del usuario y token a la sesión
      session.accessToken = token.accessToken;
      session.user = {
        ...session.user,
        id: token.userId,
        givenName: token.givenName,
        familyName: token.familyName,
        userName: token.userName,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
