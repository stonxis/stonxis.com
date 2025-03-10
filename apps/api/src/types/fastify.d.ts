import "@fastify/jwt";

declare module "fastify" {
  interface FastifyInstance {
    authenticateUser: any;
  }
  interface FastifyInstance {
    authenticateAdmin: any;
  }
}
