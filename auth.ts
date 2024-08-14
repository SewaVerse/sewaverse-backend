// import type {
//   GetServerSidePropsContext,
//   NextApiRequest,
//   NextApiResponse,
// } from "next";
// import type { NextAuthOptions } from "next-auth";
// import { getServerSession } from "next-auth";

// // Centralized auth configuration
// export const config = {
//   providers: [], // Add your providers here
// } satisfies NextAuthOptions;

// // Reusable auth function
// export function auth(
//   ...args:
//     | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
//     | [NextApiRequest, NextApiResponse]
//     | []
// ) {
//   return getServerSession(...args, config);
// }
