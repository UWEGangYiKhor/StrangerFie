import { PrismaClient } from "@prisma/client";

export const prismaClientSingleton = () => {
	return new PrismaClient({
		datasources: {
			db: {
				url: process.env.POSTGRES_PRISMA_URL,
			},
		},
	});
};

declare global {
	var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = prismaClientSingleton();

export default prisma;
