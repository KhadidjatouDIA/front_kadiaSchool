import { postActions, putActions } from "@/actions/actions";
import { endpoints } from "@/constants/endpoints.constants";
import { Etudiant, Gender } from "@/interfaces/interfaces";
import { Select } from "@headlessui/react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type NewStudentProps = {
  record: any;
  onClose: () => void;
  onRefresh?: () => void;
};
function NewStudent({ record, onClose, onRefresh }: NewStudentProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Etudiant>();
  const onSubmit: SubmitHandler<Etudiant> = async (data: any) => {
    if (record === null) {
      await postActions(endpoints.etudiants.ADD, data).then(() => {
        toast.success("Nouvel étudiant ajouté avec succès");
        onClose();
        onRefresh?.();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      ;
    } else {
      await putActions(endpoints.etudiants.UPDATE(record?.id), data).then(() => {
        toast.success("Etudiant mise à jour avec succès");
        onClose();
        onRefresh?.();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      ;
    }
    
  };

  useEffect(() => {
    if (record && record !== null) {
      reset(record);
    }
  }, [record]);

  return (
    <div className="bg-transparent px-1">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full grid grid-cols-3 space-x-4">
          <div className="flex flex-col">
            <label className="label mb-2" htmlFor="example">
              Nom
            </label>
            <input
              {...register("lastName", { required: true })}
              className={errors.lastName ? "input-error" : "input"}
            />
            {errors.lastName && (
              <span className="text-red-500">Ce champ est obligatoire</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="label mb-2" htmlFor="example">
              Prénoms
            </label>
            <input
              {...register("firstName", { required: true })}
              className={errors.firstName ? "input-error" : "input"}
            />
            {errors.firstName && (
              <span className="text-red-500">Ce champ est obligatoire</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="label mb-2" htmlFor="exampleRequired">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              className={errors.email ? "input-error" : "input"}
            />
            {errors.email && (
              <span className="text-red-500">Ce champ est obligatoire</span>
            )}
          </div>
        </div>

        <div className="w-full grid grid-cols-3 space-x-4">
          <div className="flex flex-col">
            <label className="label mb-2" htmlFor="example">
              Téléphone
            </label>
            <input {...register("phone")} className="input" />
          </div>
          <div className="flex flex-col">
            <label className="label mb-2" htmlFor="example">
              Genre
            </label>
            <Select
              className="border data-[hover]:shadow data-[focus]:bg-blue-100"
              aria-label="Project status"
              {...register("gender")}
            >
              <option value={Gender.MALE}> {Gender.MALE.toString()} </option>
              <option value={Gender.FEMALE}>
                {" "}
                {Gender.FEMALE.toString()}{" "}
              </option>
            </Select>
          </div>
          <div className="flex flex-col">
            <label className="label mb-2" htmlFor="exampleRequired">
              Date de naissance
            </label>
            <input
              {...register("dateOfBirth", { required: true })}
              type="date"
              className={errors.dateOfBirth ? "input-error" : "input"}
            />
            {errors.dateOfBirth && (
              <span className="text-red-500">Veuillez entrer la date</span>
            )}
          </div>
        </div>

        <div className="flex w-full justify-center items-center space-x-4 mt-4">
          <button className="btn btn-ghost" type="reset">
            Réinitialiser
          </button>
          <button className="btn btn-primary" type="submit">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewStudent;
