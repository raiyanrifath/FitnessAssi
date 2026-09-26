import WorkoutDetail from "@/components/workout-detail";

export default function WorkoutDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <WorkoutDetail id={params.id} />;
}
