import { ActivitiesPanel } from "@/components/ActivitiesPanel";
import { ActivityTypesPanel } from "@/components/ActivityTypesPanel";
import { listActivities, listActivityTypes } from "./moks";

export function HomePage() {
  return (
    <main className="flex flex-col gap-14">
      {/* Recomendations */}
      <div>
        <ActivitiesPanel
          title="Recomendado para você"
          listActivities={listActivities}
        />
      </div>
      {/* Activity Types */}
      <div>
        <ActivityTypesPanel
          title="Tipos de Atividade"
          listTypes={listActivityTypes}
        />
      </div>
      {/* Activities */}
    </main>
  );
}
