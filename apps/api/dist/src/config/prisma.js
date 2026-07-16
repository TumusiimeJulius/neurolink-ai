"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_better_sqlite3_1 = require("@prisma/adapter-better-sqlite3");
const node_path_1 = __importDefault(require("node:path"));
const globalForPrisma = globalThis;
const databaseUrl = process.env.DATABASE_URL ?? "file:./neurolink.db";
const dbPath = databaseUrl.replace(/^file:/, "").replace(/^\.\//, "");
const fullDbPath = node_path_1.default.resolve(process.cwd(), dbPath);
const adapter = new adapter_better_sqlite3_1.PrismaBetterSqlite3({
    url: fullDbPath,
});
const prisma = globalForPrisma.prisma ?? new client_1.PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
exports.default = prisma;
