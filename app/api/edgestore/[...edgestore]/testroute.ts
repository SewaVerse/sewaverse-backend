// import { initEdgeStore } from "@edgestore/server";
// import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
// import { initEdgeStoreClient } from "@edgestore/server/core";


// // Initialize the Edge Store without user context
// const es = initEdgeStore.create();

// /**
//  * This is the main router for the Edge Store buckets.
//  */
// const edgeStoreRouter = es.router({
//   publicFiles: es.fileBucket({
//     maxSize: 1024 * 1024 * 1, // max size 1mb
//   }),
// });

// // Create the handler
// const handler = createEdgeStoreNextHandler({
//   router: edgeStoreRouter,
// });

// export const backendClient = initEdgeStoreClient({
//   router: edgeStoreRouter,
// }) as EdgeStoreClientType;

// // Export the handler for GET and POST requests
// export { handler as GET, handler as POST };

// /**
//  * This type is used to create the type-safe client for the frontend.
//  */
// export type EdgeStoreRouter = typeof edgeStoreRouter;