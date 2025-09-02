import { Class } from "../types/Class";
import { toaster, Toaster, AppToaster } from "../components/ui/toaster";

interface ValidateClassTimeParams {
  date: string;
  timeStart: string;
  duration: string;
  classes?: Class[];
  toaster: AppToaster;
}

export function validateClassTime({
  date,
  timeStart,
  duration,
  classes,
  toaster,
}: ValidateClassTimeParams) {
  const now = new Date();
  const selectedDateTime = new Date(`${date}T${timeStart}`);

  if (selectedDateTime < now) {
    toaster.create({
      title: `Izabrano vreme i datum su u prošlosti.`,
      type: "error",
      closable: true,
    });
    return false;
  }

  const durationMinutes = duration === "1h" ? 60 : 90;
  const selectedEndTime = new Date(
    selectedDateTime.getTime() + durationMinutes * 60 * 1000
  );

  const conflict = classes?.some((cls) => {
    if (cls.date !== date || cls.classStatus !== "APPROVED") return false;

    const existingStart = new Date(`${cls.date}T${cls.timeStart}`);
    const existingEnd = new Date(
      existingStart.getTime() + (cls.duration === "1h" ? 60 : 90) * 60 * 1000
    );

    return selectedDateTime < existingEnd && selectedEndTime > existingStart;
  });

  if (conflict) {
    toaster.create({
      title: `Izabran termin nije slobodan.`,
      type: "error",
      closable: true,
    });
    return false;
  }

  return true;
}
