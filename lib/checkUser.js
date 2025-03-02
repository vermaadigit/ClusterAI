import { currentUser } from "@clerk/nextjs/server"

export const checkUser = async () => {
    const user = await currentUser();

    if (!user)
    {
        return null;
    }

    try {
        await db.user.findUnique({
            where: {
                clerkUserId: user.id,
            },
        });
    } catch (error) {
        
    }
}