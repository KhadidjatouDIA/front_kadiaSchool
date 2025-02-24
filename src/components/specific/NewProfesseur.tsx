import { postActions, putActions } from "@/actions/actions";
import { endpoints } from "@/constants/endpoints.constants";
import { Professeur } from "@/interfaces/interfaces";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type NewProfesseurProps = {
  record: any;
  onClose: () => void;
  onRefresh?: () => void;
};
function NewProfesseur({ record, onClose, onRefresh }: NewProfesseurProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Professeur>();
  const onSubmit: SubmitHandler<Professeur> = async (data: any) => {
    if (record === null) {
      await postActions(endpoints.professeurs.ADD, data).then(() => {
        toast.success("Professeur ajouté avec succès");
        onClose();
        onRefresh?.();
      });
    } else {
      await putActions(endpoints.professeurs.UPDATE(record?._id), data).then(
        () => {
          toast.success("Professeur mise à jour avec succès");
          onClose();
          onRefresh?.();
        }
      );
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
        <div className="w-full grid grid-cols-2 space-x-4">
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
        </div>

        <div className="w-full grid grid-cols-2 space-x-4">
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
          <div className="flex flex-col">
            <label className="label mb-2" htmlFor="example">
              Téléphone
            </label>
            <input {...register("phone")} className="input" />
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

export default NewProfesseur;
