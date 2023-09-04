import prisma from "@/lib/prisma";

export default function Home() {
  const allUser = prisma.user.findMany();
  
  return (
    <>
      <div className="text-2xl">Todo Project</div>
      {JSON.stringify(allUser)}
    </>
  );
}
