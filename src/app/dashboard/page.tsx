import WidgetItem from "@/components/WidgetItem";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const session = await auth();
  if( !session?.user ) redirect('/api/auth/signin');

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-96 text-center">
      <WidgetItem title="Usuario conectado">
        <h2>{ session.user.name }</h2>
      </WidgetItem>
    </div>
  );
}